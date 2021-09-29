/* 
    Tally object is the low-level count object which simply keeps a tally of each interesting element we're looking after.
*/
class TallyObject {
    constructor() {
        this.counter = {
            codeLines: 0,
            blankLines: 0,
            MLCommentBlocks: 0,
            MLCommentLines: 0,
            SLComments: 0,
            totalLines: 0
        };
    }

    /* Higher order function, used to generate a simple addition function; which adds one or a user defined value to a property specified on generation.
        This reduces code repetition, and means that it's more robust when it comes to adding new properties.
    */
    incrementCounterProperty = (property) => {
        /* If property is valid */
        if (property && typeof(property) == "string" && this.counter.hasOwnProperty(property) && typeof this.counter[property] == "number") {
            return (value)=> {
                /* If a specific incrementor is provided, check that it's a valid value */
                if (value && typeof(value) != "number") {
                    throw new Error(`Bad addition for ${property} when trying to increment by value: ${value}`);
                }
                try {
                    value != undefined ? this.counter[property] += value : this.counter[property]++;
                } catch(e) {
                    throw e;
                }
            }
        } else {
            throw new Error(`Unable to generate counter property incrementor for property name: ${property}`);
        }
    }

    /* Incrementor functions for each property we're counting */
    incrementCodeLines  = v => this.incrementCounterProperty('codeLines')(v);
    incrementBlankLines = v => this.incrementCounterProperty('blankLines')(v);
    incrementMLCommentBlocks = v => this.incrementCounterProperty('MLCommentBlocks')(v);
    incrementMLCommentLines = v => this.incrementCounterProperty('MLCommentLines')(v);
    incrementSLComments = v => this.incrementCounterProperty('SLComments')(v);

    /*  Run getTotalLines() once all other lines have been tallied.
        This reduces the overal number of operations to (n+4) as opposed to (n*4), where n == number of lines
        Iterate over all of this.counter's properties, adding the property's value to totalLines.
        When we get to totalLines propery, subtract MLCommentBlocks. This is because a comment block is a collection of lines, not a single line.
        Subtract at end as it's less operations than checking if property == 'MLCommentBLock' every iteration.
    */
    getTotalLines = () => {
        for (const property in this.counter) {
            if (property != "totalLines") {
                this.counter.totalLines += this.counter[property];
            } else {
                this.counter.totalLines -= this.counter.MLCommentBlocks;
                return this.counter.totalLines;
            }
        }
    }
}

exports.TallyObject = TallyObject;