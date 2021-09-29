const { LineCounter } = require('./LineCounter');

const
    fs = require('fs'),
    args = process.argv.slice(2)
;

/* Use a generator function to iterate over the process.args array */
function* countAllFiles() {
    for (let i = 0; i < args.length; i++){
        fs.access(args[i], async e => {
            if (!e) {
                let lineCounter = new LineCounter(args[i]);

                let results = await lineCounter.startTally();
                let toReturn = {};
                toReturn.name = args[i];
                toReturn.count = results;
                // console.log(args[i], results);
                console.log(toReturn);
            } else {
                console.log(e.message);
            }
        });
        yield;
    }
    return;
}

/* Call the generator function */
[...countAllFiles()];