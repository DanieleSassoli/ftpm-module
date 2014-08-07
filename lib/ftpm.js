require('./utils/string');

var fs           	= require('fs'),
    EventEmitter 	= require('events').EventEmitter,
    _            	= require('lodash'),
	existsSync  	= require('fs').existsSync || require('path').existsSync,
    ftpm         	= new EventEmitter(),
    fontDriver		= {};
	
ftpm = _.extend(ftpm, {
    platform: 	process.platform,
    file: 		require('./utils/file'),
    path: 		require('./utils/path'),
	callbackFunction: function(type, msg) {},
	outputPath: false,
	showContent:false
});

ftpm.on('successCallback', function(cb, result) {
    cb(null, result);
});

ftpm.on('writeFile', function(path, css, cb) {
    var self = this;

    this.file.writeFile(path, css, 'utf-8', function(err) {
        self.emit('validateFile', err, cb, path);
    });
});

ftpm.on('writeRemoteFile', function(url, path, cb) {
    var self = this;
	if (url) {
		this.file.getRemoteFile(url, path, function(err, data) {
			self.emit('validateFile', err, cb, path);
		});
	}
});

ftpm.on('validateFile', function(err, cb, result) {
    if (err)
        ftpm.callbackFunction('error', msg);
    else
		this.emit('successCallback', cb, result);
});

ftpm.on('exitMessage', function(type, msg) {
    ftpm.callbackFunction(type, msg);
});

ftpm.on('osfont', function(action, fontName,cb) {
    fontDriver[action](fontName, function(err) {
        cb(err);
    });
});

ftpm.on('webfont', function(action, fontName) {
    fontDriver.download(fontName, ftpm.outputPath, function(err, output){
        ftpm.emit('exitMessage', 'finished', err);
	});
});

ftpm.on('cssfont', function(action, fontName) {
    var methods = {
            css: [ 'downloadCSS' , 'show' ],
            datauri: [ 'downloadDataUrl' , 'showDataUrl' ]
        };
    if ( !ftpm.showContent ) {
        fontDriver[methods[action][0]](fontName, ftpm.outputPath, function(err, result) {
            ftpm.emit('exitMessage', 'finished', err);
        });
    } else {
        fontDriver[methods[action][1]](fontName, function(err, result) {
            ftpm.emit('exitMessage', 'finished', err);
        });
    }

});

ftpm.on('runDriver', function(driverName, action, fontName,cb) {
    fontDriver = require('./driver/' + driverName);
    this.emit(driverName,action, fontName,cb);
});

module.exports = ftpm;