const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const { PatternMatcher } = require('./PatternMatcher');
const { Tallier } = require('./Tallier');

exports.LineCounter = class LineCounter {
    constructor(fileName) {
        this.fileName = fileName;
        this.PatternMatcher = new PatternMatcher();

        this.lineReaderObject = createInterface({
            input: createReadStream(this.fileName),
            console: false
        });

        this.tallier = new Tallier()
    };

    async startTally () {
        for await (const line of this.lineReaderObject) {
            this.matches = this.PatternMatcher.checkMatch(line);
            this.tallier.tallyLine(this.matches);
        }

        this.tallier.tally.getTotalLines();
        console.log(this.tallier.tally.counter);
    };
};