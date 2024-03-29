const fs = require('fs');
const args = process.argv.slice(2);

const { LineCounter } = require('./LineCounter');

async function countAllFiles() { 
    let toReturn = [];

    for (let i = 0; i < args.length; i++) {
        try {
            fs.accessSync(args[i])
        } catch(e) {
            console.log(`${args[i]} not accessible, code: ${e.code}`);
            continue;
        }

        const lineCounter = new LineCounter(args[i]);
        const results = await lineCounter.startTally();

        toReturn.push({
            name: args[i],
            count: results
        });
    }

    return toReturn;
}


async function collateResults(resultSet) {
    let totalCount = {
        codeLines: 0,
        blankLines: 0, 
        MLCommentBlocks: 0,
        MLCommentLines: 0,
        SLComments: 0,
        totalLines: 0
    };

    resultSet.forEach(result => {
        Object.keys(totalCount).forEach(key => {
            totalCount[key] += result.count[key] ;
        });
    })

    return {
        name: 'totalCount',
        count: totalCount
    }
}

async function main() {
    const fileCounts = await countAllFiles();
    
    if (fileCounts.length <= 1) {
        console.log("File count: ", fileCounts);
    } else {
        console.log("Individual file counts: ", fileCounts);
        let collatedResults = await collateResults(fileCounts);
        console.log("Collated totals: ", collatedResults);
    }

}

main();
