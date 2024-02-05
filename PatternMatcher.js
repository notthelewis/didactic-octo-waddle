class PatternMatcher {
    constructor() {
        /* Create a map object using the regexes as the keys, and a friendly name for the values. */
        this.regexList = new Map();
        this.regexList.set(/\/\*[\s\S]*?/, 'comment_ML_StartComment');
        this.regexList.set(/[\s\S]*?\*\//, 'comment_ML_EndComment');
        this.regexList.set(/^(\/\/.*)|^(\s.*\/\/.*)/, 'comment_SL_StartOfLine');
        this.regexList.set(/[^\s][^\/]\/\/.*/, 'comment_SL_EndOfLine');
        this.regexList.set(/(^(\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm, 'blankLine');
    }
}

/* Generator function to yield the friendly names of any matched objects */
PatternMatcher.prototype.checkMatchGenerator = function* (line) {
    for (regex of this.regexList) {
        if (regex[0].test(line)) {
            yield regex[1];
        }
    }
}

/* Run the generator function and return the full array once complete */
PatternMatcher.prototype.checkMatch = function (line) {
    return [...this.checkMatchGenerator(line)];
}

exports.PatternMatcher = PatternMatcher;
