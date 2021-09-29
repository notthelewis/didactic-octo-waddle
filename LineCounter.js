/* 
    LineCounter is a Facade implementation.
    It provides a unified interface to a set of subsystems (lineReader, PatternMatcher, Tallier, Tally)
*/

const
    { createReadStream } = require('fs'),
    { createInterface } = require('readline'),
    { PatternMatcher } = require('./PatternMatcher'),
    { Tallier } = require('./Tallier')
;

exports.LineCounter = class LineCounter {
    constructor(fileName) {
        this.fileName = fileName;
        this.lineReaderObject = createInterface({
            input: createReadStream(this.fileName),
            console: false
        });
        
        this.PatternMatcher = new PatternMatcher();
        this.tallier = new Tallier()
    };

    async startTally () {
        /* For ... of .. to iterate over each line independently. */
        for await (const line of this.lineReaderObject) {
            /* Get an array of regexes which match this current line*/
            this.matches = this.PatternMatcher.checkMatch(line);
            /* Pass this array to the Tallier, so that it can count based on each condition. (single-line comment, multi-line comment, blank-line or none) */
            this.tallier.tallyLine(this.matches);
        }

        /* Outside the loop, add together all of the matched values */
        this.tallier.tally.getTotalLines();
        this.lineReaderObject.close();
        /* Return the counter object */
        return this.tallier.tally.counter;
    };
};