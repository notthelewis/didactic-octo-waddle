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

    getTotalLines = () => {
        for (const property in this.counter) {
            if (property != "totalLines") {
                this.counter.totalLines += this.counter[property];
            } else {
                return this.counter.totalLines;
            }
        }
    }
}

exports.TallyObject = TallyObject;