import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let pairs = input.trim().split('\n\n');
type Packet = Packet[] | number;

function compare(left: Packet, right: Packet): number {
    if (typeof left == "number") {
        if (typeof right == "number")  return Math.sign(right - left);
        return compare([left], right);
    }
    if (typeof right == "number") return compare(left, [right]);
    let [l, r] = [left.slice(), right.slice()];
    while (true) {
        if (l.length == 0) return (r.length == 0) ? 0 : 1;
        if (r.length == 0) return -1;
        let sign = compare(l.shift()!, r.shift()!);
        if (sign != 0) return sign;
    }
}

let sum = 0;
for (let [index, pair] of pairs.entries()) {
    let [left, right] = pair.split('\n').map(s => JSON.parse(s) as Packet[]);
    if (compare(left, right) == 1) sum += index + 1;
}
console.log('Answer:', sum);