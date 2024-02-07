"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var LineCounter = /** @class */ (function (_super) {
    __extends(LineCounter, _super);
    function LineCounter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = {
            totalLines: 0,
            codeLines: 0,
            slComments: 0,
            mlCommentLines: 0,
        };
        _this.isInMultiLine = false;
        return _this;
    }
    LineCounter.prototype._write = function (line, _, next) {
        this.count.totalLines++;
        var comment = this.findCommentOnLine(line);
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
    };
    return LineCounter;
}(stream_1.Writable));
exports.default = LineCounter;
// findComment decides whether the line contains a singleLine, multiLineStart or multiLineEnd
LineCounter.prototype.findCommentOnLine = function (line) {
    var slStart = line.indexOf("//");
    var mlStart = line.indexOf("/*");
    var mlEnd = line.indexOf("*/");
    var slFound = slStart !== -1;
    var mlStartFound = mlStart !== -1;
    var mlEndFound = mlEnd !== -1;
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
