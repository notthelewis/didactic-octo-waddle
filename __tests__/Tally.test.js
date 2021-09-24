const { TallyObject} = require('../Tally');

runTests = async()=> {
    let tallyTest = new TallyObject();
    
    valid = () => {
        test("Check that passing a correct name into the higher order function causes it to return a function", ()=> {
            expect(typeof tallyTest.incrementCounterProperty('totalLines')).toBe('function');
        });
        test("Check that passing no value into a generated incrementor function will cause it to simply add 1 to the property in question", ()=> {
            tallyTest.incrementBlankLines();
            expect(tallyTest.counter.blankLines).toBe(1);
        });
        test("Check that passing a negative value into a generated incrementor function will cause it to decrement the given property", ()=> {
            tallyTest.incrementBlankLines(-1);
            expect(tallyTest.counter.blankLines).toBe(0);
        });
        test("Check that calling getTotalLines when each value == 1 will return the expected number (4)", ()=> {
            tallyTest.incrementCodeLines();
            tallyTest.incrementBlankLines();
            tallyTest.incrementMLCommentBlocks();
            tallyTest.incrementMLCommentLines();
            tallyTest.incrementSLComments();
            expect(tallyTest.getTotalLines()).toBe(4);
        });
    }

    invalid = () => {
        test("Check that passing bad property to the higher order function will cause it to throw an error", ()=> {
            expect(()=> tallyTest.incrementCounterProperty('NONE_EXISTENT_PROPERTY')).toThrow(`Unable to generate counter property incrementor for property name: NONE_EXISTENT_PROPERTY`);
        });
        test("Check that passing a value which is not a number into a generated function wll cause it to throw an error", ()=> {
            expect(()=> tallyTest.incrementSLComments('stringValue')).toThrow('Bad addition for SLComments when trying to increment by value: stringValue');
        });
        test("Check that creating a new property, which is not an integer, on the counter object will cause a generator function for that property to throw an error", ()=> {
            tallyTest.counter.testProperty = "testProperty";
            expect(()=> tallyTest.incrementCounterProperty('testProperty')()).toThrow('Unable to generate counter property incrementor for property name: testProperty');
        });
    }

    describe("Valid tests", ()=> valid());
    describe("Invalid tests", ()=> invalid());
}

runTests();