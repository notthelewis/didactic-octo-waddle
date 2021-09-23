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
            this.matches = this.interestingRegex.checkMatch(line);
            console.log(line, this.matches);
        }
    }
}