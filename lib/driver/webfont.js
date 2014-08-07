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

function getWebFont( name , cb ) {
    var font = getFontConfig( name ), fontFullPath;
    fontFullPath = ftpm.path.getFontPath( ftpm.platform ) + font.file;
    var fontData = new Provider( font.name , function(err) {
        if (err) cb(err);
		else {
            if (fontData.getFontFileUrl()) {
                ftpm.file.getRemoteFile(fontData.getFontFileUrl(), fontFullPath, cb);
            }
		}
    }, true);
}

module.exports = {
    download : getWebFont
};