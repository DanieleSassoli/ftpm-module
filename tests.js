var ftpm_module = require('ftpm-node');
var async = require('async');
async.series([function (callback) {
    ftpm_module.installOsFont('Magra', function (err) {
        if (err)console.log("installOsFont: error: " + err);
        else console.log("installOsFont: passed");
        callback();
    });
},
    function (callback) {
        ftpm_module.installOsFont('verdana', function (err) {
            if (err)console.log("installOsFont: passed");
            else console.log("installOsFont: error: " + err);
            callback();
        });
    },
    function (callback) {
        ftpm_module.uninstallOsFont('Magra', function (err) {
            if (err)console.log("uninstallOsFont: error: " + err);
            else console.log("uninstallOsFont: passed");
            callback();
        });
    },
    function (callback) {
        ftpm_module.listIntalledFonts(function (err, files) {
            if (err)console.log("listIntalledFonts:error: " + err);
            else console.log("listIntalledFonts: passed");
            callback();
        });
    },
    function (callback) {
        ftpm_module.downloadWebFont('Magra', '/root/.fonts', function (err) {
            if (err)console.log("downloadWebFont: error: " + err);
            else console.log("downloadWebFont: passed");
            callback();
        });
    },
    function (callback) {
        ftpm_module.getCssFont('Magra', '/root/.fonts', function (err) {
            if (err)console.log("getCssFont: error: " + err);
            else console.log("getCssFont: passed");
            callback();
        });
    }
],function(){
    console.log("tests finished executing");
});






