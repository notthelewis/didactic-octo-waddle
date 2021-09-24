const { PatternMatcher } = require('../PatternMatcher');

multiLineCommentTests = () => {
    let patternMatcher = new PatternMatcher();
    
    test("Check that the start of a multi-line comment (/*) is picked up correctly", ()=> {
        let testLine = '/*';
        expect(patternMatcher.checkMatch(testLine)).toStrictEqual(['comment_ML_StartComment']);
    });
    test("Check that the end of a multi-line comment (*/) is picked up correctly", ()=> {
        let testLine = '*/';
        expect(patternMatcher.checkMatch(testLine)).toStrictEqual(['comment_ML_EndComment']);
    });
    test("Check that passing a valid single-line comment, in multi-line syntax, will return the expected value", ()=> {
        let testLine = '/* single line comment */';
        expect(patternMatcher.checkMatch(testLine)).toStrictEqual(['comment_ML_StartComment', 'comment_ML_EndComment']);
    });
}

singleLineCommentTests = () => {
    let patternMatcher = new PatternMatcher();

    test("Check that passing single-line comment syntax at the start of a line is picked up correctly", ()=> {
        let testLine = '// full line, single-line comment';
        expect(patternMatcher.checkMatch(testLine)).toStrictEqual(['comment_SL_StartOfLine']);
    });

    test("Check that passing single-line comment syntax at the end of a line is picked up correctly", ()=> {
        let testLine = 'validCode(); // comment for this code';
        console.log(patternMatcher.checkMatch(testLine));
        expect(patternMatcher.checkMatch(testLine)).toStrictEqual(['comment_SL_EndOfLine']);
    });
}

multiLineCommentTests();
singleLineCommentTests();