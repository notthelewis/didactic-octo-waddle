const { LineCounter } = require('./LineCounter');

const
    fs = require('fs'),
    args = process.argv.slice(2)
;

function* countAllFiles() {
    for (let i = 0; i < args.length; i++){
        fs.access(args[i], async e => {
            if (!e) {
                let lineCounter = new LineCounter(args[i]);

                let results = await lineCounter.startTally();
                console.log(args[i], results);
            } else {
                console.log(e.message);
            }
        });
        yield;
    }
    return;
}

[...countAllFiles()];