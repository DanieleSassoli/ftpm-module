ftpm-node
===========

Rewriteing of [ftpm-module] library wich is a porting of [ftpm] that enables you to use it as a nodejs module. I'm rewriting it because I don't like the eventfull style of coding,
I reported some problems using the library ( such as callbacks emitted multiple times and with non standard messages ). For now I rewrited only osfont, webfont and cssfont should work 
like if using ftpm-module. 

### Example:

```
var ftpmModule = require('ftpm-module');  

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
Download and install the fonts in ttf format inside the computer. Not available on windows.

* fontName => The name of the font that you want to install.  
* cb		 => The callback function that will be executed at the end of the process.

``` 
uninstallOsFont(fontName, cb)
``` 
Uninstalls the fonts installed on the computer. Not available on windows.  

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
Create your css code necessary to use the font on a web page. The font is expressed as google's font path.

* fontName => The name of the font that you want to get the css structure.  
* fontPath => The path to the folder where you saved the css file.  
* cb       => The callback function that will be executed at the end of the process. Set to false if you want the value to be returned within the msg parameter of the callback function.

``` 
getDataURI(fontName, fontPath, cb)
``` 
Create your css code necessary to use the font on a web page. The font is expressed as uri data.

* fontName => The name of the font that you want to get the css structure.  
* fontPath => The path to the folder where you saved the css file.  
* cb       => The callback function that will be executed at the end of the process.   Set to false if you want the value to be returned within the msg parameter of the callback function.


### Possible values for the type variable within the callback function(this values apply only to cssfont and webfont):

warn	=> There was a slight error in the execution of the method.  
success	=> The method was successfully.  
error	=> There was a serious error in the execution of the method.  
info	=> The method was successful and were returned of information which must be processed.

in case you use osfont you will receive an error message if something goes wrong, no notification if everything is successful. 

[ftpm]:https://github.com/heldr/ftpm