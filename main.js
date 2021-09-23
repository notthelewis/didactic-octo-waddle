// const { readFileLineByLine } = require('./CountFile');
const { LineTally } = require('./LineTally');

const
    fs = require('fs'),
    args = process.argv.slice(2)
;

function* countAllFiles() {
    for (let i = 0; i < args.length; i++){
        fs.access(args[i], async e => {
            if (!e) {
                let lineTally = new LineTally(args[i]);
                await lineTally.startTally();
            } else {
                console.log(e.message);
            }
        });
        yield;
    }
    return;
}

[...countAllFiles()];