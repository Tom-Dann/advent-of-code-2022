import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let signal = input.trim();

function findMarker(size: number) {
    for (let i = size; i <= signal.length; i++) {
        let chunk = new Set([...signal.slice(i - size, i)]);
        if (chunk.size == size) return i;
    }
}

console.log('Part 1:', findMarker(4));
console.log('Part 2:', findMarker(14));