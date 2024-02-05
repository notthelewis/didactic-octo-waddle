# didactic-octo-waddle
This project aims to count lines of working source code (i.e. excluding multi-line comments, single-line comments and blank lines) in any code using C-like syntax.

### Quick notice

This project was written to improve my JS and general programming knowledge when I was working at Senti. The overal goal
was to learn the `facade` design pattern, as there was a place where I needed to use it for my day job. It's always crazy 
looking at old code. This is 3 years old and feels like ancient history. If I wanted to redo this task, I wouldn't go 
about it the same way. In fact, I think I might redo this just to make it abundantly apparent just how different I'd do
it.

### End of notice, start of README of old 


It's written in JS for the Node environment, and has absolutely zero third party dependencies other than its runtime. 

To get started, you have to run `node ./main.js <path-to-file>.`
Multiple file names can be passed as required: `node ./main.js <path-to-file1> <path-to-file-2> ... <path-to-file-x>`

For example, to count the `source.c` file and the `main.js` file at the same time:
```
./main.js source.c main.js
```

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
