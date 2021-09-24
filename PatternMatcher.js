/* https://stackoverflow.com/a/481695/10965061 <- This extremely complicated regex might be the answer to checking if a line contains a regex pattern in it ...*/

// let ir = /\/(\\[^\x00-\x1f]|\[(\\[^\x00-\x1f]|[^\x00-\x1f\\\/])*\]|[^\x00-\x1f\\\/\[])+\/[gim]*/

/*
    for (re of pm.regexList) {
        console.log(re, ir.test(re[0]), ir.test(re[1]));
    }    
*/

// [ /\/\*[\s\S]*?/, 'comment_ML_StartComment' ] true false
// [ /[\s\S]*?\*\//, 'comment_ML_EndComment' ] true false
// [ /^(\/\/.*)|^(\s.*\/\/.*)/, 'comment_SL_StartOfLine' ] true false
// [ /[^\s][^\/]\/\/.*/, 'comment_SL_EndOfLine' ] true false
// [ /(^(\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm, 'blankLine' ] true false

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

PatternMatcher.prototype.checkWhetherLineContainsRegex = function (line) {
    let regexToEndAllRegexes = /\/(\\[^\x00-\x1f]|\[(\\[^\x00-\x1f]|[^\x00-\x1f\\\/])*\]|[^\x00-\x1f\\\/\[])+\/[gim]*/
    for (re of this.regexList) {
        if (regexToEndAllRegexes.test(re)) {
            return true;
        }
    }

    return false;
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