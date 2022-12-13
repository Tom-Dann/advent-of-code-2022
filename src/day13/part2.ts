import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let strings = input.trim().split(/\n+/);
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

let dividers = ['2', '6'];
strings.push(...dividers.map(n => `[[${n}]]`));    // Add dividers
let packets = strings.map(s => JSON.parse(s) as Packet[]);
let sorted = packets.slice().sort((a, b) => compare(b.slice(), a.slice()));
let indexes = dividers.map(s => sorted.findIndex(packet => packet.join(',') == s) + 1);
console.log('Answer:', indexes.reduce((a, b) => a * b, 1));