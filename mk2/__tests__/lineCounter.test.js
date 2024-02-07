"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lineCounter_1 = __importDefault(require("../lineCounter"));
describe("findCommentOnLine", () => {
    test("should not find comments on line with no comments", () => {
        const commentFound = lineCounter_1.default.prototype.findCommentOnLine("no_comment");
        expect(commentFound).toStrictEqual({
            found: false,
            mlStarted: false,
            mlEnded: false
        });
    });
    test("singe line comment edge cases", () => {
        const testCases = [
            {
                contents: "// comment with no space at the start of line",
                expected: { found: true, mlStarted: false, mlEnded: false },
            },
            {
                contents: " // comment with space at the start of line",
                expected: { found: true, mlStarted: false, mlEnded: false }
            },
            {
                contents: "let a = 1; // end of line comment",
                expected: { found: true, mlStarted: false, mlEnded: false }
            },
            {
                contents: "/* multi line comment */",
                expected: { found: true, mlStarted: true, mlEnded: true, }
            },
            {
                contents: "/* start of multi line",
                expected: { found: true, mlStarted: true, mlEnded: false }
            },
            {
                contents: "end of multi line */",
                expected: { found: true, mlStarted: false, mlEnded: true }
            },
            {
                contents: "// /* */",
                expected: { found: true, mlStarted: false, mlEnded: false }
            },
            {
                contents: "*/ //",
                expected: { found: true, mlStarted: false, mlEnded: true }
            },
            {
                contents: "// */",
                expected: { found: true, mlStarted: false, mlEnded: false }
            },
            {
                contents: "// /*",
                expected: { found: true, mlStarted: false, mlEnded: false }
            },
            {
                contents: "/* //",
                expected: { found: true, mlStarted: true, mlEnded: false }
            },
            {
                contents: "/* // */",
                expected: { found: true, mlStarted: true, mlEnded: true }
            },
            {
                contents: "/* // /* */ // */",
                expected: { found: true, mlStarted: true, mlEnded: true }
            }
        ];
        testCases.forEach(testCase => {
            expect(lineCounter_1.default.prototype.findCommentOnLine(testCase.contents)).toStrictEqual(testCase.expected);
        });
    });
});
