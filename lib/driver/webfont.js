'use strict';

var ftpm     = require('../ftpm'),
    Provider = require('../provider/google');
function getFontConfig( name ) {
    name = name.toTitleCase();
    return {
        name : name,
        file : name.removeSpaces() + '.woff'
    };
}

function getWebFont( name , output, cb ) {
    var font = getFontConfig( name ), fontFullPath;
    if (output != false) {
        fontFullPath = output + '/' + font.file;
    } else {
        fontFullPath = font.file;
    }
    var fontData = new Provider( font.name , function(err) {
        if (err) cb(err);
		else {
		    ftpm.path.checkFontPath( output , function () {
                console.log(fontFullPath);
			    ftpm.writeRemoteFile( fontData.getFontFileUrl() , fontFullPath , cb );
		    });
		}
    }, true);
}

module.exports = {
    download : getWebFont
};