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

function getCSS( name , output, base64, cb) {
    var font = getFontConfig( name ),
        fontFullPath;
    if ( output ) {
        fontFullPath = output + '/' + font.file;
    } else {
        output = '';
        fontFullPath = font.file;
    }
    var fontData = {};
    var css = "",tmpFile;
    async.series([
        function(callback){
            fontData = new Provider( font.name , callback,true);
        },
        function(callback){
            css = fontData.getFontStyle();
            ftpm.path.checkFontPath( output , function(){callback();});
        },
        function(callback) {
            if ( !base64 ) {
                    ftpm.writeFile(fontFullPath , css , callback)
            } else {
                var url = fontData.getFontFileUrl();
                tmpFile = '__tmpFont' + Math.floor(Math.random()*1000);
                async.series([
                    function(seriesCallback){
                        if (url) ftpm.file.getRemoteFile( url , tmpFile , seriesCallback);
                        else seriesCallback("fon url not found");
                    },
                    function(seriesCallback){
                        ftpm.file.readFile( tmpFile , 'base64', function( err, content ) {
                            if (err) callback(err);
                            content = cssTemplate({
                                name: font.name,
                                base64Code: content
                            });
                            ftpm.file.unlink( tmpFile , function(err) {
                                if (err) seriesCallback(err);
                                ftpm.writeFile(fontFullPath , content , seriesCallback)
                            });
                        });
                    }
                ],callback)
            }
        },
        function(callback){

        }
    ], cb);
}

var CssFont = {

    showDataUrl : function( name , cb ) {
        getCSS( name , false , true , cb);
    },

    downloadCSS : function( name , output , cb ) {
        getCSS( name , output , false , cb );
    },

    downloadDataUrl : function( name , output , cb ) {
        getCSS( name , output , true , cb );
    }

};

module.exports = CssFont;