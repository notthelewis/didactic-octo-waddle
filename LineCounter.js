/* 
    LineCounter is a Facade implementation.
    It provides a unified interface to a set of subsystems (lineReader, PatternMatcher, Tallier, Tally)
*/

const { createReadStream } = require("fs");
const { createInterface } = require("readline");
const { PatternMatcher } = require("./PatternMatcher");
const { Tallier } = require("./Tallier");

exports.LineCounter = class LineCounter {
  constructor(fileName) {
    this.PatternMatcher = new PatternMatcher();
    this.tallier = new Tallier();
    this.fileName = fileName;
    this.lineReaderObject = createInterface({
      input: createReadStream(this.fileName),
      console: false,
    });
  }

  async startTally() {
    for await (const line of this.lineReaderObject) {
      this.matches = this.PatternMatcher.checkMatch(line);
      this.tallier.tallyLine(this.matches);
    }

    // Outside the loop, add together all of the matched values
    this.tallier.tally.getTotalLines();
    this.lineReaderObject.close();

    return this.tallier.tally.counter;
  }
};
