const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const { InterestingRegex } = require('./InterestingRegex');
const { TallyObject } = require('./Tally');

exports.LineCounter = class LineCounter {
    constructor(fileName) {
        this.fileName = fileName;
        this.interestingRegex = new InterestingRegex();
        this.tally = new TallyObject();

        this.lineReaderObject = createInterface({
            input: createReadStream(this.fileName),
            console: false
        });
    };

    async startTally () {
        for await (const line of this.lineReaderObject) {
            this.matches = this.interestingRegex.checkMatch(line);
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