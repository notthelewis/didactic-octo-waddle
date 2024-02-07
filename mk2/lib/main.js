"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const fs_1 = require("fs");
const lineCounter_1 = __importDefault(require("./lineCounter"));
const promises_1 = require("stream/promises");
const args = process.argv.slice(2);
async function countAllFiles() {
    const toReturn = [];
    for await (const arg of args) {
        try {
            (0, fs_1.accessSync)(arg);
        }
        catch (e) {
            console.log(`{"${arg}": "${e.name}"}`);
            continue;
        }
        const lineCounter = new lineCounter_1.default();
        const lineReader = (0, readline_1.createInterface)({
            input: (0, fs_1.createReadStream)(arg),
            terminal: false,
        });
        await (0, promises_1.pipeline)(lineReader, lineCounter);
        toReturn.push({ arg, count: lineCounter.count });
    }
    return toReturn.sort((a, b) => {
        if (a.count.totalLines < b.count.totalLines) {
            return -1;
        }
        else {
            return 1;
        }
    });
}
async function calculateTotal(files) {
    let total = {
        arg: "total",
        count: {
            totalLines: 0,
            codeLines: 0,
            slComments: 0,
            mlCommentLines: 0
        }
    };
    for (const { count } of files) {
        total.count.totalLines += count.totalLines;
        total.count.codeLines += count.codeLines;
        total.count.slComments += count.slComments;
        total.count.mlCommentLines += count.mlCommentLines;
    }
    files.push(total);
    return files;
}
countAllFiles().then(calculateTotal).then((results) => {
    console.log('{"results":', JSON.stringify(results), "}");
});
// countAllFiles().then((results: CountedFile[]) => {
// })
