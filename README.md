# didactic-octo-waddle
This project aims to count lines of working source code (i.e. excluding multi-line comments, single-line comments and blank lines) in any code using C-like syntax.

It's written in JS for the Node environment, and has absolutely zero third party dependencies other than its runtime. 

To get started, you have to run `node ./main.js <path-to-file>. `
Multiple file names can be passed as required: `node ./main.js <path-to-file1> <path-to-file-2> ... <path-to-file-x>`

There's no limit to how many files can be passed. Any code using 'C-like' comment syntax (C, C++, C#, JS, PHP, Java, CSS... probably others) can be read... Though I've only tested on Javascript and C.

#### Problem statement

I want to run a command, that accepts a large amount of parameters.
Each parameter will be the name of a source code file.
Each source code file will then be read line-by-line.
Each line is then compared against a list of known comment syntax and blank lines.
If any known comments / blank lines are found, they are counted independent source code.
Once every line in this file is read, the LoC number is printed, alongside the amount of multi-line comments, single line comments and blank lines.

1. Parse command line argumments
2. Iterate over each argument
3. On every iteration, read the current argument (filename) line-by-line
4. For each line, check whether that line matches any of the list of regular expressions
5. Tally up each match or none match
6. Print the results. 
