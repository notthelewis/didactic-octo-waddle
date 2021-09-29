const { TallyObject } = require("./Tally");

class Tallier {
    constructor() {
        this.tally = new TallyObject();
        this.multiLine = false; // Indicates whether we're currently in a multi-line comment
    }

    /* Takes the array of friendly regex names obtained from PatternMatcher, then works out how to tally them using conditional logic. */
    tallyLine (matches) {
        if (!matches || !Array.isArray(matches)) throw new Error("Cannot call Tallier without first passing lines through PatternMatcher");

        /* If the length is zero, this means that the line contains text which does not match any of the comment / blankline regexes */
        if (matches.length != 0) {
            /* lastMatch contains the previous element in the matched array at each incrementation */
            let lastMatch = matches[0];
            for (let i in matches) {
                switch (matches[i]) {
                    case "blankLine":
                        /* Multi-Line comments are counted separately from the rest of the file. */
                        this.multiLine ? this.tally.incrementMLCommentLines() : this.tally.incrementBlankLines();
                    break;
    
                    case "comment_ML_StartComment":
                        this.multiLine = true;
                        this.tally.incrementMLCommentLines();
                    break;
    
                    case "comment_ML_EndComment":
                        /*  This accounts for single-line comment syntax [ Potential Logic Bug (SLComment inside MLComment) ]*/
                        if (lastMatch != 'comment_ML_StartComment') {
                            this.tally.incrementMLCommentLines();
                        }
                        this.tally.incrementMLCommentBlocks();
                        this.multiLine = false;
                    break;
    
                    case "comment_SL_StartOfLine":
                        this.multiLine ? this.tally.incrementMLCommentLines() : this.tally.incrementSLComments();
                    break;

                    case "comment_SL_EndOfLine": 
                        /* If outside a MLComment, a comment at the end of a code line is still a valid code-line */
                        this.multiLine ? this.tally.incrementMLCommentLines() : this.tally.incrementCodeLines();
                    break;

                    /* Accounts for programmer stupidity */
                    default: 
                        throw new Error(`Bad match value, unable to find: ${matches[i]}`);
                }
                lastMatch = matches[i]; // [ Potential Logic Bug Fix (Use Array of last matches?)]
            }
        } else {
            /* No regex found, increment either codeLines or MLCommentLines */
            this.multiLine ? this.tally.incrementMLCommentLines() : this.tally.incrementCodeLines();
        }
    }
}

exports.Tallier = Tallier;