import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let vals = input.trim().split('\n').map(l => l.split(',').map(p => p.split('-').map(n => parseInt(n))));

function contains(a: number[], b: number[]): boolean {
    return a[0] <= b[0] && b[1] <= a[1];
}

function overlap(a: number[], b: number[]): boolean { 
    return !(b[1] < a[0] || a[1] < b[0]);
}

let part1 = 0, part2 = 0;
for (const pair of vals) {
    part1 += +(contains(pair[0], pair[1]) || contains(pair[1], pair[0]));
    part2 += +overlap(pair[0], pair[1]);
}

console.log('Part 1:', part1);
console.log('Part 2:', part2);