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

    /* Higher order function, used to generate a simple addition function; which adds one or a user defined value 
        to a property specified on generation. This reduces code repetition, and means that it's easier to add new properties in future.
    */
    incrementCounterProperty = (property) => {
        return (value)=> {
            value != undefined ? this.counter[property] += value : this.counter[property]++;
        }
    }

    incrementCodeLines  = v => this.incrementCounterProperty('codeLines')(v);
    incrementBlankLines = v => this.incrementCounterProperty('blankLines')(v);
    incrementMLCommentBlocks = v => this.incrementCounterProperty('MLCommentBlocks')(v);
    incrementMLCommentLines = v => this.incrementCounterProperty('MLCommentLines')(v);
    incrementSLComments = v => this.incrementCounterProperty('SLComments')(v);

    /* Iterate over all of this.counter's properties, adding the property's value to totalLines.
        When we get to totalLines propery, subtract MLCommentBlocks. This is because a comment block is a collection of lines.
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