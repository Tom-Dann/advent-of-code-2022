import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let instructions = input.trim().split('\n');

let x = 1, xVals = [1], width = 40, height = 6;
let output = Array(height).fill('');

for (const instruction of instructions) {
    let s = instruction.split(' ');
    xVals.push(x);
    if (s[0] != 'noop') {
        xVals.push(x);
        x += parseInt(s[1]);
    }
}

for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
        let cycle = (j * width) + i + 1;
        let xPos = xVals[cycle];
        output[j] += (i - 1 <= xPos && xPos <= i + 1) ? '█' : ' ';
    }
}

console.log(output);