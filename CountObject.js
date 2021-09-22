const { EventEmitter } = require("stream");

class CountObject extends EventEmitter {
    constructor() {
        super();
        this.counter = {
            codeLineCounter: 0,
            MLCommentCounter: 0,
            SLCommentCounter: 0,
            blankLineCounter: 0,
            allLinesCounter: 0
        };

        this.on('fileClosed', ()=> {
            console.log(this.counter);
        });

        this.state = {
            current: 'codeLine',
            availableStates: {
                codeLine : {
                    onSwitchToAction: ()=> {
                        this.counter.codeLineCounter++;
                    }
                },
                MLComment: {
                    onSwitchToAction: ()=> {
                        this.counter.MLCommentCounter++;
                    }
                },
                SLComment: {
                    onSwitchToAction: ()=> {
                        this.counter.SLCommentCounter++;
                    }
                },
                blankLine: {
                    onSwitchToAction: ()=> {
                        this.counter.blankLineCounter++;
                    }
                }
            },
        };

        this.permittedTransitions = {
            codeLine: ['MLComment', 'SLComment', 'blankLine', 'codeLine'],
            MLComment: ['codeLine', 'MLComment'],
            SLComment: ['codeLine', 'SLComment'],
            blankLine: ['codeLine', 'MLComment', 'SLComment', 'blankLine']
        };
    }

    switchState(toSwitchTo) {
        if (this.permittedTransitions[this.state.current].includes(toSwitchTo)) {
            toSwitchTo == this.state.current ? null : this.state.current = toSwitchTo;
            this.state.availableStates[toSwitchTo].onSwitchToAction();
            this.counter.allLinesCounter++;
        }
    };
}

exports.CountObject = CountObject;