import LineCounter, { CommentFound } from "../lineCounter";

describe("findCommentOnLine", ()=> {
    test("should not find comments on line with no comments", () => {
        const commentFound = LineCounter.prototype.findCommentOnLine("no_comment")
        expect(commentFound).toStrictEqual({
            found: false,
            mlStarted: false,
            mlEnded: false
        })
    })

    test("singe line comment edge cases", ()=> {
        type testCase = {
            contents: string
            expected: CommentFound
        }

        const testCases: testCase[] = [
            {
                contents: "// comment with no space at the start of line",
                expected: {found: true, mlStarted: false, mlEnded: false},
            },
            {
                contents: " // comment with space at the start of line",
                expected: {found: true, mlStarted: false, mlEnded: false}
            },
            {
                contents: "let a = 1; // end of line comment",
                expected: {found: true, mlStarted: false, mlEnded: false}
            },
            {
                contents: "/* multi line comment */",
                expected: {found: true, mlStarted: true, mlEnded: true,}
            },
            {
                contents: "/* start of multi line",
                expected: {found: true, mlStarted: true, mlEnded: false}
            },
            {
                contents: "end of multi line */",
                expected: {found: true, mlStarted: false, mlEnded: true}
            },
            {
                contents: "// /* */",
                expected: {found: true, mlStarted: false, mlEnded: false}
            },
            {
                contents: "*/ //",
                expected: {found: true, mlStarted: false, mlEnded: true}
            },
            {
                contents: "// */",
                expected: {found: true, mlStarted: false, mlEnded: false}
            },
            {
                contents: "// /*",
                expected: {found: true, mlStarted: false, mlEnded: false}
            },
            {
                contents: "/* //",
                expected: {found: true, mlStarted: true, mlEnded: false}
            },
            {
                contents: "/* // */",
                expected: {found: true, mlStarted: true, mlEnded: true}
            },
            {
                contents: "/* // /* */ // */",
                expected: {found: true, mlStarted: true, mlEnded: true}
            }
        ]

        testCases.forEach(testCase => {
            expect(LineCounter.prototype.findCommentOnLine(testCase.contents)).toStrictEqual(testCase.expected)
        })
    })
})

