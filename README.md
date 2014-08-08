ftpm-node
===========

Rewriteing of [ftpm-module]:https://github.com/alanmastro/ftpm-module library wich is a porting of [ftpm]:https://github.com/heldr/ftpm that enables you to use it as a nodejs module. I'm rewriting it because I don't like the eventfull style of coding,
I reported some problems using the library ( such as callbacks emitted multiple times and with non standard messages ).

### Example:

```
var ftpmModule = require('ftpm-node');  

ftpmModule.installOsFont('Magra', function(type, msg) {console.log(type + ': ' + msg);});
ftpmModule.uninstallOsFont('Magra', function(type, msg) {console.log(type + ': ' + msg);});
ftpmModule.listIntalledFonts(function(type, msg) {console.log(type + ': ' + msg);});

ftpmModule.downloadWebFont('Magra', '/fonts', function(type, msg) {console.log(type + ': ' + msg);});

ftpmModule.getCssFont('Magra', false, function(type, msg) {console.log(type + ': ' + msg);});
ftpmModule.getDataURI('Magra', false, function(type, msg) {console.log(type + ': ' + msg);});
```

### Available methods:

``` 
installOsFont(fontName, cb)
```
Download and install the fonts in ttf format inside the font folder of your system. **Not available on windows.**

* fontName   => The name of the font that you want to install.
* cb    	 => The callback function that will be executed at the end of the process.

``` 
uninstallOsFont(fontName, cb)
``` 
Uninstalls the fonts installed on the computer. **Not available on windows.**

* fontName => The name of the font that you want to uninstall.  
* cb       => The callback function that will be executed at the end of the process.

``` 
listIntalledFonts()
``` 
Uninstalls the fonts installed on the computer.
Within the msg parameter of the callback function will be reported to all fonts installed separated by \n.

``` 
downloadWebFont(fontName, fontPath, cb)
``` 
Download fonts in woff format within a specific folder.

* fontName => The name of the font that you want to download.  
* fontPath => The path to the folder where you saved the font.  
* cb       => The callback function that will be executed at the end of the process.

```  
getCssFont(fontName, fontPath, cb)
``` 
Create a css file containing the Google font that you installed.

* fontName => The name of the font that you want to get the css structure.  
* fontPath => The path to the folder where you saved the css file.  
* cb       => The callback function that will be executed at the end of the process. Set to false if you want the value to be returned within the msg parameter of the callback function.

``` 
getDataURI(fontName, fontPath, cb)
``` 
Create a css file containing the Google font that you installed. The font is expressed as uri data.

* fontName => The name of the font that you want to get the css structure.  
* fontPath => The path to the folder where you saved the css file.  
* cb       => The callback function that will be executed at the end of the process.   Set to false if you want the value to be returned within the msg parameter of the callback function.


All functions return nothing if was succesfull or an error message in case of error;
known bugs:
    * list of fonts dosn't returns always indefined,
    * uninstallOsFont dosn't delete the file.
