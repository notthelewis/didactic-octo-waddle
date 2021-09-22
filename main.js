const { countLinesInFile } = require('./CountFile');

const 
    fs = require('fs'),
    args = process.argv.slice(2)
;

if (args[0] != undefined) {
    for (i in args) {
        fs.access(args[i], e => {
            console.log(`${args[i]} ${e ? 'does not exist' : 'exists'}`);
        });
    }
} else {
    throw new Error("Please provide source code files to count.");
}

/* 

*/

//

countLinesInFile(args[0]);