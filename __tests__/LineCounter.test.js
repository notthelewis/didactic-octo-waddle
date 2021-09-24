const { LineCounter } = require("../LineCounter");

integrationTest = () => {
    test("Check that passing the example source code file (source.c) into LineCounter returns the expected results", async () => {
        let source_c_counter = new LineCounter('source.c');
        expect(await source_c_counter.startTally()).toStrictEqual({
            codeLines: 5,
            blankLines: 1,
            MLCommentBlocks: 3,
            MLCommentLines: 6,
            SLComments: 3,
            totalLines: 15
        });
    });
}

integrationTest();