"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
class LineCounter extends stream_1.Writable {
    count = {
        totalLines: 0,
        codeLines: 0,
        slComments: 0,
        mlCommentLines: 0,
    };
    isInMultiLine = false;
    findCommentOnLine;
    _write(line, _, next) {
        this.count.totalLines++;
        const comment = this.findCommentOnLine(line);
        if (!comment.found) {
            this.isInMultiLine ? this.count.mlCommentLines++ : this.count.codeLines++;
            return next();
        }
        if (!comment.mlStarted && !comment.mlEnded) {
            this.count.slComments++;
            return next();
        }
        this.count.mlCommentLines++;
        this.isInMultiLine = comment.mlStarted && !comment.mlEnded;
        next();
    }
}
exports.default = LineCounter;
// findComment decides whether the line contains a singleLine, multiLineStart or multiLineEnd
LineCounter.prototype.findCommentOnLine = function (line) {
    const slStart = line.indexOf("//");
    const mlStart = line.indexOf("/*");
    const mlEnd = line.indexOf("*/");
    let slFound = slStart !== -1;
    let mlStartFound = mlStart !== -1;
    let mlEndFound = mlEnd !== -1;
    if (slFound && mlStartFound) {
        slFound = slStart < mlStart;
        mlStartFound = !slFound;
    }
    if (slFound && mlEndFound) {
        slFound = slStart < mlEnd;
        mlEndFound = !slFound;
    }
    return {
        found: slFound || mlStartFound || mlEndFound,
        mlStarted: mlStartFound,
        mlEnded: mlEndFound,
    };
};
