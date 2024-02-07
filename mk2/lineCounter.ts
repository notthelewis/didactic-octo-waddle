import { Writable } from "stream";

export type CommentFound = {
    found: boolean
    mlStarted: boolean
    mlEnded: boolean
}

export type CountResult = {
    totalLines: number
    codeLines: number
    slComments: number 
    mlCommentLines: number
}

export default class LineCounter extends Writable {
    count: CountResult = {
        totalLines:  0,
        codeLines:  0,
        slComments:  0,
        mlCommentLines:  0,
    }

    isInMultiLine: boolean = false
    
    findCommentOnLine!: (line: string) => CommentFound;

    _write(line: string, _: BufferEncoding, next: (error?: Error | null | undefined) => void): void {
        this.count.totalLines++

        const comment = this.findCommentOnLine(line)
        if (!comment.found) {
            this.isInMultiLine ? this.count.mlCommentLines++ : this.count.codeLines++
            return next()
        }

        if (!comment.mlStarted && !comment.mlEnded) {
            this.count.slComments++
            return next()
        }

        this.count.mlCommentLines++
        this.isInMultiLine = comment.mlStarted && !comment.mlEnded

        next()
    }
}

// findComment decides whether the line contains a singleLine, multiLineStart or multiLineEnd
LineCounter.prototype.findCommentOnLine = function(line: string): CommentFound {
    const slStart = line.indexOf("//")
    const mlStart = line.indexOf("/*")
    const mlEnd = line.indexOf("*/")

    let slFound = slStart !== -1
    let mlStartFound = mlStart !== -1
    let mlEndFound = mlEnd !== -1

    if (slFound && mlStartFound) {
        slFound = slStart < mlStart
        mlStartFound = !slFound
    }

    if (slFound && mlEndFound) {
        slFound = slStart < mlEnd
        mlEndFound = !slFound
    }

    return {
        found: slFound || mlStartFound || mlEndFound,
        mlStarted: mlStartFound,
        mlEnded: mlEndFound,
    }
}
