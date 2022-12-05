import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let vals = input.trim().split('\n');

let total = 0;
for (let i = 0; i < vals.length; i += 3) {
    let [set1, set2, set3] = vals.slice(i, i + 3).map(s => new Set([...s]));
    let badge = [...set1].filter(a => set2.has(a)).filter(a => set3.has(a))[0];
    total += badge.charCodeAt(0) - (badge == badge.toLowerCase() ? 96 : 38);
}

console.log('Answer:', total);