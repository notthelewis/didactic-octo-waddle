const { EventEmitter } = require("stream");

class PlaceHolder extends EventEmitter {
    constructor () {
        super();

        this.interestingRegexes = [
            /\/\*[\s\S]*?/, // Start of multi-line comment
            /[\s\S]*?\*\//, // End of multi-line comment
            /^\s*?\/\/*/, // Single line comment without stuff before it
            /^\S\s*?\/\//, // Single line comment with stuff before it
            /(^(\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm // Blank line, catering for different types of newline indicator
        ];


        this.correspondingStates = new Map();
        this.correspondingStates.set(0, 'MLComment');
        this.correspondingStates.set(1, 'codeLine');
        this.correspondingStates.set(2, 'SLComment');
        this.correspondingStates.set(3, 'SLComment');
        this.correspondingStates.set(4, 'blankLine');
    }

    getNewStateName(line) {
        let found = false;

        for (let i = 0; i < this.interestingRegexes.length; i++) {
            if (this.interestingRegexes[i].test(line)){
                this.emit(this.correspondingStates.get(i));
                return;
            }
        }
        if (!found){ 
            this.emit('codeLine');
        }
    }
}

exports.PlaceHolder = PlaceHolder;
