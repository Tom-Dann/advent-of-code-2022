import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let lines = input.trim().split('\n').map(l => [...l.matchAll(/-?\d+/g)].map(m => parseInt(m[0])));

let d_manhattan = (a: number[], b: number[]): number => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
}

const yVal = 2000000;
let slices: number[][] = [];
let beacons = new Set<number>();
for (const line of lines) {
    let sensor = [line[0], line[1]];
    let beacon = [line[2], line[3]];
    let dist = d_manhattan(sensor, beacon);
    let sliceWidth = dist - Math.abs(sensor[1] - yVal);
    if (sliceWidth >= 0) {
        slices.push([sensor[0] - sliceWidth, sensor[0] + sliceWidth]);
        if (beacon[1] == yVal) beacons.add(beacon[1]);
    }
}

slices.sort((a, b) => a[0] - b[0]);
let distinctSlices: number[][] = [];
let [min, max] = slices[0];
for (const slice of slices) {
    if (slice[0] <= max + 1) {
        min = Math.min(slice[0], min);
        max = Math.max(slice[1], max);
    } else {
        distinctSlices.push([min, max]);
        [min, max] = slice;
    }
}
distinctSlices.push([min, max]);
let count = distinctSlices.reduce((prev, curr) => prev + curr[1] - curr[0] + 1, 0);
console.log('Answer:', count - beacons.size);