'use strict';

var _        = require('lodash'),
    ftpm     = require('../ftpm'),
    async    = require('async'),
    Provider = require('../provider/google');

function getFontConfig( name ) {
    name = name.toTitleCase();
    return {
        name : name,
        file : name.removeSpaces() + '.ftpm.ttf',
        path : ftpm.path.getFontPath( ftpm.platform )
    };
}

function searchInstalledFont( name , cb ) {
    var font = ( _.isObject(name) ) ? name : getFontConfig( name );
    ftpm.file.readdir( font.path , function( err , files ) {
        if (err) {
            cb('error',err);
        } else {
            var matchedFonts = _.filter( files , function( file ) {
                if( file.match( font.name.removeSpaces() ) ) {
                    return file;
                }
            });
            cb('success', matchedFonts);
        }
    });
}

var OsFont = {
    install: function( name , cb ) {
        var font = getFontConfig( name ),
            fontFullPath = font.path + font.file;
        var fontData = {};
        async.series([function(callback){
            ftpm.path.checkFontPath(font.path, function(){});
            callback();
        },function(callback){
            searchInstalledFont(font, function(type, results){
                if(type == 'error')callback(results);
                else callback();
            });
        }, function(callback){
            fontData = new Provider( font.name , callback);
        }, function(callback){
            if (fontData.getFontFileUrl()) {
                ftpm.file.getRemoteFile(fontData.getFontFileUrl(), fontFullPath, callback);
            }
        }],function(err){
            cb(err);
        });
    },
    local: function( name, cb ) {
        name = name || '';
        searchInstalledFont( name , function( status , files ) {
            if (status == 'error') {
                cb('error', status);
			} else {
                files = files.join('').split('.ftpm.ttf').join('\n');
                cb(null, files);
			}
        });

    },
    uninstall : function( name , cb ) {
        var font = getFontConfig( name ),
            fontFullPath = font.path + font.file;
        searchInstalledFont( font , function( err , results ) {
            if (err == 'error') cb(err);
            else {
				if( !_.isEmpty( results ) && _.isEqual( results[0] , font.file ))
                console.log(fontFullPath);
                    require('fs').unlinkSync( fontFullPath);
                cb();
			}
        });
    }
};

module.exports = OsFont;