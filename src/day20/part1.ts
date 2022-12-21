import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let vals = input.trim().split('\n');

let sequence = vals.slice().map((v, i) => [i, parseInt(v)]);
for (let i = 0; i < sequence.length; i++) {
    let index = sequence.findIndex(p => p[0] == i);
    let item = sequence[index];
    let newIndex = (index + item[1]) % (sequence.length - 1);
    if (newIndex < 0) newIndex += sequence.length - 1;
    sequence.splice(index, 1);
    let arr1 = sequence.slice(0, index);
    let arr2 = sequence.slice(index);
    sequence = arr1.concat(arr2);
    sequence.splice(newIndex, 0, item);
}

let zeroIndex = sequence.findIndex(p => p[1] == 0);
let indicies = [1000, 2000, 3000];
let sum = 0;
for (const i of indicies) {
    let index = (zeroIndex + i) % sequence.length;
    sum += sequence[index][1];
}

console.log('Answer:', sum);