require('./utils/string');
_ = require('lodash'),
    existsSync = require('fs').existsSync || require('path').existsSync,
    fontDriver = {};
var ftpm = {
    platform: process.platform,
    file: require('./utils/file'),
    path: require('./utils/path'),
    outputPath: false,
    showContent: false,
    successCallback: function (cb, result) {
        cb(null, result);
    },

    writeFile: function (path, css, cb) {
        var self = this;

        this.file.writeFile(path, css, 'utf-8', function (err) {
            this.validateFile(err, cb, path);
        });
    },

    writeRemoteFile: function (url, path, cb) {
        var self = this;
        if (url) {
            this.file.getRemoteFile(url, path, function (err) {
                this.validateFile(err, cb, path);
            });
        }
    },

    validateFile: function (err, cb, result) {
        if (err)
            ftpm.callbackFunction('error', msg);
        else
            this.successCallback(cb, result);
    },

    osfont: function (action, fontName, cb) {
        fontDriver[action](fontName, function (err) {
            cb(err);
        });
    },

    webfont: function (action, fontName,cb) {
        fontDriver.download(fontName, ftpm.outputPath, function (err) {
            cb(err);
        });
    },

    cssfont: function (action, fontName,cb) {
        var methods = {
            css: [ 'downloadCSS' , 'show' ],
            datauri: [ 'downloadDataUrl' , 'showDataUrl' ]
        };
        if (!ftpm.showContent) {
            fontDriver[methods[action][0]](fontName, ftpm.outputPath, function (err) {
                cb(err);
            });
        } else {
            fontDriver[methods[action][1]](fontName, function (err) {
                cb(err);
            });
        }

    },

    runDriver: function (driverName, action, fontName, cb) {
        fontDriver = require('./driver/' + driverName);
        this[driverName](action, fontName, cb);
    }
};
module.exports = ftpm;