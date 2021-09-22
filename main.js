const { countLinesInFile } = require('./CountFile');

const
    fs = require('fs'),
    args = process.argv.slice(2)
;

function* countAllFiles() {
    for (let i = 0; i < args.length; i++){
        fs.access(args[i], e => {
            !e ? countLinesInFile(args[i]) : console.log(`${args[i]} does not exist or is inaccesible:\n${e}.`);
        });
        yield;
    }
    return;
}

[...countAllFiles()];