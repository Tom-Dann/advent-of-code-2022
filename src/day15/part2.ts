import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let lines = input.trim().split('\n').map(l => [...l.matchAll(/-?\d+/g)].map(m => parseInt(m[0])));

let d_manhattan = (a: number[], b: number[]): number => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
}

const maxSize = 4000000;
for (let j = 0; j <= maxSize; j++) {    // Very slow to run, but it was quick to adapt from part 1 :)
    let slices: number[][] = [];
    for (const line of lines) {
        let sensor = [line[0], line[1]];
        let beacon = [line[2], line[3]];
        let dist = d_manhattan(sensor, beacon);
        let sliceWidth = dist - Math.abs(sensor[1] - j);
        if (sliceWidth >= 0) {
            slices.push([sensor[0] - sliceWidth, sensor[0] + sliceWidth]);
        }
    }

    slices.sort((a, b) => a[0] - b[0]);
    let distinctSlices: number[][] = [];
    let [min, max] = slices[0];
    for (const slice of slices) {
        if (slice[0] <= max + 1) {
            min = Math.min(slice[0], min);
            max = Math.max(slice[1], max);
        } else if (min <= maxSize && 0 <= max) {
            distinctSlices.push([Math.max(0, min), Math.min(maxSize, max)]);
            [min, max] = slice;
        }
    }
    if (min <= maxSize && 0 <= max) {
        distinctSlices.push([Math.max(0, min), Math.min(maxSize, max)]);
    }
    if (distinctSlices.length > 1) {
        let x = distinctSlices[0][1] + 1;
        console.log('Answer:', (x * maxSize) + j);
        break;
    }
}