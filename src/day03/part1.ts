import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let vals = input.trim().split('\n');

function score(line: string): number {
    let split = [line.substring(0, line.length / 2), line.substring(line.length / 2)]
    let [set1, set2] = split.map(s => new Set([...s]));
    let char = [...set1].filter(a => set2.has(a))[0];
    return char.charCodeAt(0) - (char == char.toLowerCase() ? 96 : 38);
}

let total = vals.map(x => score(x)).reduce((a, b) => a + b, 0);
console.log('Answer:', total);