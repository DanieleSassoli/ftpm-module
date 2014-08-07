var ftpm_module = require('ftpm-module-cb');
ftpm_module.installOsFont('Magra', function(err){
        if(err)console.log("installOsFont: error: " + err);
        else console.log("installOsFont: passed");
    }
);
ftpm_module.installOsFont('verdana', function(err){
        if(err)console.log("installOsFont: passed");
        else console.log("installOsFont: error: " + err);
    }
);
ftpm_module.uninstallOsFont('Magra', function(err){
        if(err)console.log("uninstallOsFont: error: " + err);
        else console.log("uninstallOsFont: passed");
    }
);
ftpm_module.listIntalledFonts(function(err, files){
        console.log("list fonts, err:" + err + " list: " + files);
        if(err)console.log("listIntalledFonts:error: " + err);
        else console.log("listIntalledFonts: passed");
    }
);
ftpm_module.downloadWebFont('Magra','/root/.fonts',function(err){
        if(err)console.log("downloadWebFont: error: " + err);
        else console.log("downloadWebFont: passed");
    }
);
ftpm_module.getCssFont('Magra','/root/.fonts',function(err){
        if(err)console.log("getCssFont: error: " + err);
        else console.log("getCssFont: passed");
    }
);
