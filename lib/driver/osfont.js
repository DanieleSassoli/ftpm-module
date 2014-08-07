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
            cb(err);
        } else {
            var matchedFonts = _.filter( files , function( file ) {
                if( file.match( font.name.removeSpaces() ) ) {
                    return file;
                }
            });
            cb();
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
            searchInstalledFont(font, callback);
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

        searchInstalledFont( name , function( err , files ) {

            if (err) {
				ftpm.emit( 'exitMessage' , 'error' , err );
			} else {
				files = files.join('').split('.ftpm.ttf').join('\n');
				ftpm.emit( 'successCallback' , cb , files );
			}
        });

    },

    uninstall : function( name , cb ) {

        var font = getFontConfig( name ),
            fontFullPath = font.path + font.file;

        searchInstalledFont( font , function( err , results ) {
            if (err) {
				ftpm.emit( 'exitMessage' , 'error' , err );
			} else {
				if( !_.isEmpty( results ) && _.isEqual( results[0] , font.file ) ) {
					ftpm.file.unlink( fontFullPath , cb );
				} else {
					ftpm.emit('exitMessage', 'error', font.name + ' Font is not installed');
				}
			}
        });
    }

};

module.exports = OsFont;