import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let instructions = input.trim().split('\n');

let x = 1, xVals = [1];
for (const instruction of instructions) {
    let s = instruction.split(' ');
    xVals.push(x);
    if (s[0] != 'noop') {
        xVals.push(x);
        x += parseInt(s[1]);
    }
}

let check = [20, 60, 100, 140, 180, 220];
let checkVals = check.map(n => xVals[n] * n);
console.log('Answer:', checkVals.reduce((a, b) => a + b, 0));