const { Tallier } = require("../Tallier");

runTests = async () => {
    parameterTests = () => {
        test("Check that calling Tallier.tallyLine() without an arguent will cause it to throw an error", ()=> {
            expect(()=> new Tallier().tallyLine()).toThrow('Cannot call Tallier without first passing lines through PatternMatcher');
        });
        test("Check that calling Tallier.tallLine() with an invalid arguement type will cause it to throw an error", ()=> {
            expect(()=> new Tallier().tallyLine('string')).toThrow('Cannot call Tallier without first passing lines through PatternMatcher');
        });
        test("Check that calling Tallier.tallyLine() with a non-existent argument will cause it to throw an error", ()=> {
            expect(()=> new Tallier().tallyLine(['non-existent'])).toThrow('Bad match value, unable to find: non-existent');
        });
    }

    blankLineTests = () => {
        let tallier = new Tallier();
        test("Check that the 'blankLine' property, when MultiLine = false, will increment the blankLine field", ()=> {
            tallier.tallyLine(['blankLine']);
            expect(tallier.tally.counter.blankLines).toStrictEqual(1);
        });
        test("Check that the 'blankLine' property, when MultiLine = true, will increment the MutltiLine field", ()=> {
            tallier.multiLine = true;
            tallier.tallyLine(['blankLine']);
            expect(tallier.tally.counter.MLCommentLines).toStrictEqual(1);
            tallier.multiLine = false;
        });
    }

    multiLineTests = () => {
        test("Check that in a single line comment with multi-line syntax, both MLCommentLines and MLCommentBlocks are incremented- and that multiLine is set to false after", ()=> {
            let tallier = new Tallier();
            let testMatchesArray = ['comment_ML_StartComment', 'comment_ML_EndComment'];
            tallier.tallyLine(testMatchesArray);
            expect(tallier.tally.counter.MLCommentLines == 1 && tallier.tally.counter.MLCommentBlocks == 1).toStrictEqual(true);
            expect(tallier.multiLine).toStrictEqual(false);
        });
        test("Check that opening a multiLine comment, dropping down a line, writing 2 lines of comment, dropping down another line and closing the comment will result in in 4 MLCommentLines and 1 MLCommentBlock", ()=> {
            let tallier = new Tallier();

            tallier.tallyLine(['comment_ML_StartComment']);
            tallier.tallyLine([]);
            tallier.tallyLine([]);
            tallier.tallyLine(['comment_ML_EndComment']);

            expect(tallier.tally.counter.MLCommentLines == 4 && tallier.tally.counter.MLCommentBlocks == 1).toStrictEqual(true);
            expect(tallier.multiLine).toStrictEqual(false);
        });
        test("Ensure that an SLComment inside of an MLCommentBlock will not tally an SLComment, but will tally a MLCommentLine ", ()=> {
            let tallier = new Tallier(); 
            tallier.tallyLine(['comment_ML_StartComment']);
            tallier.tallyLine([]);
            tallier.tallyLine(['comment_SL_StartOfLine']);
            tallier.tallyLine(['comment_SL_EndOfLine']);
            tallier.tallyLine([]);
            tallier.tallyLine(['comment_ML_EndComment']);
            expect(tallier.tally.counter.MLCommentBlocks).toBe(1);
            expect(tallier.tally.counter.MLCommentLines).toBe(6);
            expect(tallier.tally.counter.SLComments).toBe(0);
        });
    }

    singleLineTests = () => {
        test("Check that single line comments at the start of a line register the entire line as a comment", ()=> {
            let tallier = new Tallier();
            tallier.tallyLine(['comment_SL_StartOfLine']);
            expect(tallier.tally.counter.SLComments).toBe(1);
        });
        test("Check that single line comments at the end of a code line will register the line as a code line and not as a comment line", ()=> {
            let tallier = new Tallier();
            tallier.tallyLine(['comment_SL_EndOfLine']);
            expect(tallier.tally.counter.SLComments).toBe(0);
            expect(tallier.tally.counter.codeLines).toBe(1);
        });
    }

    describe("Parameter tests", () => parameterTests());
    describe("blankLine tests", () => blankLineTests());
    describe("multiLine comment tests", ()=> multiLineTests());
    describe("singleLine comment tests", ()=> singleLineTests());
}

runTests();