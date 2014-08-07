'use strict';

var ftpm        = require('../ftpm'),
    Provider    = require('../provider/google'),
    async    = require('async'),
    cssTemplate = require('../template/cssDataUrl');

function getFontConfig( name ) {
    name = name.toTitleCase();
    return {
        name : name,
        file : name.removeSpaces() + '.css'
    };
}

function getCSS( name , base64, cb) {
    var font = getFontConfig( name ),
        fontFullPath;
    var output = ftpm.path.getFontPath( ftpm.platform );
    fontFullPath = output + font.file;
    var fontData = {};
    var css = "",tmpFile="";
    async.series([
        function(callback){
            console.log("callback");
            fontData = new Provider( font.name , callback,true);
        },
        function(callback){
            console.log("callback: " + output);
            css = fontData.getFontStyle();
            ftpm.path.checkFontPath( output , callback);
        },
        function(callback) {
            console.log("callback");
            if ( !base64 ) {
                ftpm.writeFile(fontFullPath , css , callback);
            } else {
                var url = fontData.getFontFileUrl();
                tmpFile = '__tmpFont' + Math.floor(Math.random()*1000);
                if (url) {
                    ftpm.file.getRemoteFile( url , tmpFile , callback);
                }
            }
        },
        function(callback){
            console.log("callback");
            ftpm.file.readFile( tmpFile , 'base64', function( err, content ) {
                if (err) callback(err);
                content = cssTemplate({
                    name: font.name,
                    base64Code: content
                });
                ftpm.file.unlink( tmpFile , function(err) {
                    if (err) callback(err);
                    ftpm.writeFile(fontFullPath , content , callback);
                });
            });
        }
    ], cb);
}

var CssFont = {

    showDataUrl : function( name , cb ) {
        getCSS( name , true , cb );
    },

    show : function( name , cb ) {
        getCSS( name , false , cb);
    },

    downloadCSS : function( name , output , cb ) {
        getCSS( name , false , cb );
    },

    downloadDataUrl : function( name , output , cb ) {
        getCSS( name , true , cb );
    }

};

module.exports = CssFont;