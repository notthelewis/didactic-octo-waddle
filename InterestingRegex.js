class InterestingRegex {
    constructor() {
        this.regexList = new Map();
        this.regexList.set(/\/\*[\s\S]*?/, 'comment_ML_StartComment');
        this.regexList.set(/[\s\S]*?\*\//, 'comment_ML_EndComment');
        this.regexList.set(/\/\/.*/, 'comment_SL_StartOfLine');
        this.regexList.set(/[^\s][^\/]\/\/.*/, 'comment_SL_EndOfLine');
        this.regexList.set(/(^(\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm, 'blankLine');
    }
}

InterestingRegex.prototype.checkMatchGenerator = function* (line) {
    let foundRegex;

    for (regex of this.regexList) {
        if (regex[0].test(line)) {
            foundRegex = true;
            yield regex[1];
        }
    }

    return;
}

InterestingRegex.prototype.checkMatch = function (line) {
    return [...this.checkMatchGenerator(line)];
}

exports.InterestingRegex = InterestingRegex;