var ftpm = require('./lib/ftpm');
var fs = require('fs');
var ftpmModuleCb = {
	installOsFont: function(fontName, cb) {
        ftpm.runDriver('osfont', 'install', fontName, cb);
	},
	uninstallOsFont: function(fontName, cb) {
		fontName = fontName.toTitleCase();
		if (fs.existsSync(ftpm.path.getFontPath(ftpm.platform) + fontName.removeSpaces() + '.ftpm.ttf')) {
			ftpm.runDriver('osfont', 'uninstall', fontName,cb);
		}
	},
	listIntalledFonts: function(cb) {
		ftpm.runDriver('osfont', 'local', '',cb);
	},
	downloadWebFont: function(fontName, fontPath, cb) {
		ftpm.outputPath = fontPath;
		ftpm.runDriver('webfont', 'web', fontName,cb);
	},
	getCssFont: function(fontName, fontPath,showContent, cb) {
		ftpm.outputPath = fontPath;
		ftpm.showContent = (!fontPath) ? true : false;
		ftpm.runDriver('cssfont', 'css', fontName,cb);
	},
	getDataURI: function(fontName, fontPath, cb) {
		ftpm.outputPath = fontPath;
		ftpm.showContent = (!fontPath) ? true : false;
		ftpm.runDriver('cssfont', 'datauri', fontName,cb);
	}
};

module.exports = ftpmModuleCb;