import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let vals = input.trim().split('\n').map(l => l.split('').reverse());

const strMap = new Map<string, number>([
    ['=', -2],
    ['-', -1],
    ['0', 0],
    ['1', 1],
    ['2', 2],
]);

// Add numbers
let decimalSum = 0;
for (const val of vals) {
    let decimalValue = 0;
    for (const [i, str] of val.entries()) {
        let num = strMap.get(str);
        if (num == null) throw new Error(`String value ${str} unkown`);
        decimalValue += ((5 ** i) * num);
    }
    decimalSum += decimalValue;
}

const numMap = new Map<number, string>([
    [-2, '='],
    [-1, '-'],
    [0, '0'],
    [1, '1'],
    [2, '2'],
]);

// Convert to SNAFU
let remainder = decimalSum;
let place = 0;
let snafu = '';
while (remainder) {
    const unit = 5 ** place
    const mod = 5 ** (place + 1);
    const num = (((remainder + 2 * unit) % mod) / unit) - 2;
    const str = numMap.get(num);
    if (str == null) throw new Error(`Number value ${num} unkown`);
    remainder -= num * unit;
    snafu = str + snafu;
    place++;
}
console.log('Answer:', snafu);