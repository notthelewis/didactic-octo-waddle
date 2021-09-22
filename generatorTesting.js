// function* generateSequence() {
//     yield 1;
//     yield 2; 
//     return 3;
// }

// let x = generateSequence();

// for (let value of x) {
//     console.log(value)
// }

// let seq = [0, ...generateSequence()];
// console.log(seq);


let range = {
    from: 1,
    to: 5,

    *[Symbol.iterator]() {
        for (let value = this.from; value <= this.to; value++) {
            yield value;
        }
    }
};

console.log([...range]);