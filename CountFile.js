const
    fs = require('fs'),
    readline = require('readline'),
    { CountObject } = require('./CountObject'),
    { PlaceHolder } = require('./PlaceHolder');
;

exports.countLinesInFile = (filename) => {
    let
        counter = new CountObject(),
        placeHolder = new PlaceHolder()
    ;

    placeHolder.on('codeLine',  ()=> counter.switchState('codeLine'));
    placeHolder.on('MLComment', ()=> counter.switchState('MLComment'));
    placeHolder.on('SLComment', ()=> counter.switchState('SLComment'));
    placeHolder.on('blankLine', ()=> counter.switchState('blankLine'));

    const readInterface = readline.createInterface({
        input: fs.createReadStream(filename),
        console: false
    });


    readInterface.on('line', (thisLine) => {
        placeHolder.getNewStateName(thisLine);
    });

    readInterface.on('close', ()=> {
        counter.emit('fileClosed');
    });
}
