const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const { PatternMatcher } = require('./PatternMatcher');

exports.LineCounter = class LineCounter {
    constructor(fileName) {
        this.fileName = fileName;
        this.PatternMatcher = new PatternMatcher();

        this.lineReaderObject = createInterface({
            input: createReadStream(this.fileName),
            console: false
        });
    };

    async startTally () {
        for await (const line of this.lineReaderObject) {
            this.matches = this.PatternMatcher.checkMatch(line);
            console.log(this.matches);

        //     if (this.matches.length == 0) {
        //         this.tally.incrementCodeLine();
        //     } else {
        //         switch (this.matches) {
        //             case ['']: 

        //         }
        //     }
        }
        // console.log(this.tally.counter);
    };
};