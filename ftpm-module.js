var ftpm = require('./lib/ftpm');

var ftpmModuleCb = {
	installOsFont: function(fontName, cb) {
        ftpm.runDriver('osfont', 'install', fontName, cb);
	},
	uninstallOsFont: function(fontName, cb) {
		fontName = fontName.toTitleCase();
		ftpm.callbackFunction = cb;
		if (existsSync(ftpm.path.getFontPath(ftpm.platform) + fontName.removeSpaces() + '.ftpm.ttf')) {
			ftpm.runDriver('osfont', 'uninstall', fontName,cb);
		}
	},
	listIntalledFonts: function(cb) {
		ftpm.callbackFunction = cb;
		ftpm.runDriver('osfont', 'local', '',cb);
	},
	downloadWebFont: function(fontName, fontPath, cb) {
		ftpm.callbackFunction = cb;
		ftpm.outputPath = fontPath;
		ftpm.runDriver('webfont', 'web', fontName,cb);
	},
	getCssFont: function(fontName, fontPath, cb) {
		ftpm.callbackFunction = cb;
		ftpm.outputPath = fontPath;
		ftpm.showContent = (!fontPath) ? true : false;
		ftpm.runDriver('cssfont', 'css', fontName,cb);
	},
	getDataURI: function(fontName, fontPath, cb) {
		ftpm.callbackFunction = cb;
		ftpm.outputPath = fontPath;
		ftpm.showContent = (!fontPath) ? true : false;
		ftpm.runDriver('cssfont', 'datauri', fontName,cb);
	}
};

module.exports = ftpmModuleCb;