import { readFileSync } from 'fs';

let input = readFileSync('input.txt', 'utf-8');
let elves = input.split('\n\n').map(x => x.split('\n').map(y => parseInt(y)));

let max = 0;
for (let [, elf] of elves.entries()) {
    let calories = elf.reduce((a, b) => a + b, 0);
    if (calories > max) max = calories;
}

console.log('Answer:', max);