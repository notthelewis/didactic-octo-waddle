const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const { InterestingRegex } = require('./InterestingRegex');

exports.LineTally = class LineTally {
    constructor(fileName) {
        this.fileName = fileName;
        this.interestingRegex = new InterestingRegex();

        this.lineReaderObject = createInterface({
            input: createReadStream(this.fileName),
            console: false
        });
    }

    async startTally () {
        for await (const line of this.lineReaderObject) {
            let matches = this.interestingRegex.checkMatch(line);
            console.log(line, matches);
        }

    }

    /* Read File Line By Line */

    /* Check individual line against list of interesting regexes */

    /*  */

}