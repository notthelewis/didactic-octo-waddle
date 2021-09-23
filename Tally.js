class TallyObject {
    constructor() {
        this.counter = {
            codeLine: 0,
            blankLine: 0,
            MLComment: 0,
            SLComment: 0,
            totalLines: 0
        };
    }

    incrementCounterProperty = (property) => {
        return (value)=> {
            value != undefined ? this.counter[property] += value : this.counter[property]++;
        }
    }

    incrementCodeLine  = v => this.incrementCounterProperty('codeLine')(v);
    incrementBlankLine = v => this.incrementCounterProperty('blankLine')(v);
    incrementMLComment = v => this.incrementCounterProperty('MLComment')(v);
    incrementSLComment = v => this.incrementCounterProperty('SLComment')(v);

    getTotalLines = () => {
        this.counter.totalLines = this.counter.blankLine + this.counter.blankLine + this.counter.MLComment + this.counter.SLComment;
        return this.counter.totalLines;
    }
}

exports.TallyObject = TallyObject;