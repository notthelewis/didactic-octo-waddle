class PatternMatcher {
    constructor() {
        this.regexList = new Map();
        this.regexList.set(/\/\*[\s\S]*?/, 'comment_ML_StartComment');
        this.regexList.set(/[\s\S]*?\*\//, 'comment_ML_EndComment');
        this.regexList.set(/^(\/\/.*)|^(\s.*\/\/.*)/, 'comment_SL_StartOfLine');
        this.regexList.set(/[^\s][^\/]\/\/.*/, 'comment_SL_EndOfLine');
        this.regexList.set(/(^(\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm, 'blankLine');
    }
}

PatternMatcher.prototype.checkMatchGenerator = function* (line) {
    if (this.checkWhetherLineContainsRegex) {
        
    }
    for (regex of this.regexList) {
        if (regex[0].test(line)) {
            yield regex[1];
        }
    }
    return;
}

PatternMatcher.prototype.checkMatch = function (line) {
    return [...this.checkMatchGenerator(line)];
}

exports.PatternMatcher = PatternMatcher;