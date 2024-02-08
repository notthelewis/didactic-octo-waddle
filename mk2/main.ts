import { createInterface } from "readline";
import { createReadStream, accessSync } from "fs";
import LineCounter, { CountResult } from "./lineCounter";
import { pipeline } from "stream/promises";

const args = process.argv.slice(2);

interface CountedFile {
    arg: string,
    count: CountResult
}

async function countAllFiles(): Promise<CountedFile[]> {
    const toReturn: CountedFile[] = []

    for (const arg of args) {
        // Skip inaccessible files
        try {
            accessSync(arg)
        } catch(e: unknown) {
            continue
        }

        const lineCounter = new LineCounter()
        const lineReader = createInterface({
            input: createReadStream(arg),
            terminal: false,
        })

        await pipeline(lineReader, lineCounter)
        toReturn.push({arg, count: lineCounter.count})
    }

    return toReturn.sort((a, b) => {
        if (a.count.totalLines < b.count.totalLines) {
            return -1
        } else {
            return 1
        }
    })
}

async function calculateTotal(files: CountedFile[]): Promise<CountedFile[]>  {
    let total: CountedFile = {
        arg: "total",
        count: {
            totalLines: 0,
            codeLines: 0,
            slComments: 0,
            mlCommentLines: 0
        }
    }

    for (const { count } of files) {
        total.count.totalLines += count.totalLines
        total.count.codeLines += count.codeLines
        total.count.slComments += count.slComments
        total.count.mlCommentLines += count.mlCommentLines
    }
    
    files.push(total)
    return files
}

countAllFiles().then(calculateTotal).then((results: CountedFile[])=> {
    console.log('{"results":', JSON.stringify(results), "}")
})


