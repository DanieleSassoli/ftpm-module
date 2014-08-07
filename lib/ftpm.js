require('./utils/string');
var fontDriver = {};
var ftpm = {
    platform: process.platform,
    file: require('./utils/file'),
    path: require('./utils/path'),
    outputPath: false,
    showContent: false,

    writeFile: function (path, css, cb) {
        this.file.writeFile(path, css, 'utf-8', function (err) {
            cb(err);
        });
    },

    writeRemoteFile: function (url, path, cb) {
        if (url) {
            this.file.getRemoteFile(url, path, function (err) {
                cb(err);
            });
        }
    },

    osfont: function (action, fontName, cb) {
        fontDriver[action](fontName, function (err) {
            cb(err);
        });
    },

    webfont: function (action, fontName, cb) {
        fontDriver.download(fontName, ftpm.outputPath, function (err) {
            cb(err);
        });
    },

    cssfont: function (action, fontName,cb) {
        var methods = {
            css: [ 'downloadCSS' , 'show' ],
            datauri: [ 'downloadDataUrl' , 'showDataUrl' ]
        };
        fontDriver[methods[action][0]](fontName, cb);
    },

    runDriver: function (driverName, action, fontName, cb) {
        fontDriver = require('./driver/' + driverName);
        this[driverName](action, fontName, cb);
    }
};
module.exports = ftpm;