const { TallyObject } = require("./Tally");

class Tallier {
    constructor() {
        this.tally = new TallyObject();
        this.multiLine = false;
    }

    tallyLine (matches) {
        if (!matches) throw new Error("Cannot call Tallier without first passing lines through PatternMatcher");

        if (matches.length != 0) {
            let lastState = matches[0];
            for (let i in matches) {
                switch (matches[i]) {
                    case "blankLine":
                        this.multiLine ? this.tally.incrementMLCommentLines() : this.tally.incrementBlankLines();
                    break;
    
                    case "comment_ML_StartComment":
                        this.multiLine = true;
                        this.tally.incrementMLCommentLines();
                    break;
    
                    case "comment_ML_EndComment":
                        if (lastState != 'comment_ML_StartComment') {
                            this.tally.incrementMLCommentLines();
                        }
                        this.tally.incrementMLCommentBlocks();
                        this.multiLine = false;
                    break;
    
                    case "comment_SL_StartOfLine":
                        this.tally.incrementSLComments();
                    break;
    
                    case "comment_SL_EndOfLine": 
                        this.tally.incrementCodeLines();
                    break;
    
                    default: 
                        throw new Error(`Bad match value, unable to find: ${matches[i]}`);
                }
                lastState = matches[i];
            }
        } else {
            this.multiLine ? this.tally.incrementMLCommentLines() : this.tally.incrementCodeLines();
        }
    }
}

exports.Tallier = Tallier;