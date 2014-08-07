/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var ftpm        = require('../ftpm'),
    Provider    = require('../provider/google'),
    async    = require('async'),
    cssTemplate = require('../template/cssDataUrl');

ftpm.on('showCss', function( fontFullPath , css , cb ) {
    ftpm.emit( 'successCallback' , cb , css );
});

function getFontConfig( name ) {

    name = name.toTitleCase();

    return {
        name : name,
        file : name.removeSpaces() + '.css'
    };
}

function getCSS( name , output, base64, cb , showContent ) {
    var font = getFontConfig( name ),
        fontFullPath;

    if ( output ) {
        fontFullPath = output + '/' + font.file;
    } else {
        output = '';
        fontFullPath = font.file;
    }
    var fontData = {};
    var css = "",tmpFile="";
    async.series([
        function(callback){
            fontData = new Provider( font.name , callback,true);
        },
        function(callback){
            css = fontData.getFontStyle();
            ftpm.path.checkFontPath( output , function () {
                callback();
            });
        },
        function(callback) {
            if ( !base64 ) {
                ftpm.emit( ( (!showContent) ? 'writeFile' : 'showCss' ) , fontFullPath , css , callback );
            } else {
                var url = fontData.getFontFileUrl();
                tmpFile = '__tmpFont' + Math.floor(Math.random()*1000);
                if (url) {
                    ftpm.file.getRemoteFile( url , tmpFile , function( err ) {
                        if (err) callback(err);
                         else callback();
                    });
                }
            }
        },
        function(callback){
            ftpm.file.readFile( tmpFile , 'base64', function( err, content ) {
                if (err) callback(err);
                content = cssTemplate({
                    name: font.name,
                    base64Code: content
                });
                ftpm.file.unlink( tmpFile , function(err) {
                    if (err) callback(err);
                    ftpm.emit( ( (!showContent) ? 'writeFile' : 'showCss' ) , fontFullPath , content , callback );
                });
            });
        }
    ], function(err){
        cb(err);
    });
}

var CssFont = {

    showDataUrl : function( name , cb ) {
        getCSS( name , false , true , cb , true );
    },

    show : function( name , cb ) {
        getCSS( name , false , false , cb , true );
    },

    downloadCSS : function( name , output , cb ) {
        getCSS( name , output , false , cb );
    },

    downloadDataUrl : function( name , output , cb ) {
        getCSS( name , output , true , cb );
    }

};

module.exports = CssFont;