const { hasUncaughtExceptionCaptureCallback } = require("process");
const { Tallier } = require("../Tallier");

runTests = async () => {
    valid = ()=> {
        blankLineTests = () => {
            let tallier = new Tallier();
            let testMatchesArray = ['blankLine'];
            
            test("Check that the 'blankLine' property, when MultiLine = false, will increment the blankLine field", ()=> {
                tallier.tallyLine(testMatchesArray);
                expect(tallier.tally.counter.blankLines).toStrictEqual(1);
            });

            test("Check that the 'blankLine' property, when MultiLine = true, will increment the MutltiLine field", ()=> {
                tallier.multiLine = true;
                tallier.tallyLine(testMatchesArray);

                expect(tallier.tally.counter.MLCommentLines).toStrictEqual(1);

                tallier.multiLine = false;
            });

        }
        describe("blankLine Tallier tests", () => blankLineTests());
    }

    describe("Valid tests", ()=> valid());
}

runTests();