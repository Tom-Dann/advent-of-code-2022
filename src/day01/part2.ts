import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let elves = input.split('\n\n').map(x => x.split('\n').map(y => parseInt(y)));

let sum = (a: number, b: number) => a + b;
let topThree = [0, 0, 0];
for (let [, elf] of elves.entries()) {
    let calories = elf.reduce(sum, 0);
    if (calories > Math.min.apply(Math, topThree))  {
        topThree.push(calories);
        topThree.sort().shift();
    }
}

console.log('Top three elves:', topThree);
console.log('Answer:', topThree.reduce(sum, 0));
