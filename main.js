const { countLinesInFile } = require('./CountFile');

const
    fs = require('fs'),
    args = process.argv.slice(2)
;

function* countAllFiles() {
    for (let i = 0; i < args.length; i++){
        fs.access(args[i], e => {
            console.log(`${args[i]} ${e ? 'does not exist' : 'exists'}`);
            countLinesInFile(args[i]);
        });
        yield;
    }
    return;
}

[...countAllFiles()];