import { readFileSync } from 'fs';
let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let lines = input.trim().split('\n').map(l => [...l.matchAll(/-?\d+/g)].map(m => parseInt(m[0])));

let d_manhattan = (a: number[], b: number[]): number => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

type Sensor = {
    sensor: number[],
    dist: number,
}
let xPrimes: { [val: number]: number } = {};
let yPrimes: { [val: number]: number } = {};
let sensors: Sensor[] = [];
const maxSize = 4000000;

for (const line of lines) {
    let sensor = [line[0], line[1]];
    let beacon = [line[2], line[3]];
    let dist = d_manhattan(sensor, beacon) + 1;

    // Find neighbourhood box in coordinate system x'=x-y; y'=x+y
    // Edges where x'=x-y is fixed ( from NE <-> SW [↙↗] )
    // Edges where y'=x+y is fixed ( from SE <-> NW [↖↘] )
    let xMin = sensor[0] - sensor[1] - dist;
    let xMax = sensor[0] - sensor[1] + dist;
    let yMin = sensor[0] + sensor[1] - dist;
    let yMax = sensor[0] + sensor[1] + dist;
    if (-maxSize <= xMin && xMin <= maxSize) xPrimes[xMin] = xPrimes[xMin] ? xPrimes[xMin] + 1 : 1;
    if (-maxSize <= xMax && xMax <= maxSize) xPrimes[xMax] = xPrimes[xMax] ? xPrimes[xMax] + 1 : 1;
    if (0 <= yMin && yMin <= (2 * maxSize)) yPrimes[yMin] = yPrimes[yMin] ? yPrimes[yMin] + 1 : 1;
    if (0 <= yMax && yMax <= (2 * maxSize)) yPrimes[yMax] = yPrimes[yMax] ? yPrimes[yMax] + 1 : 1;
    dist--;
    sensors.push({ sensor, dist });
}

let xPrimeCandidates = Object.entries(xPrimes).filter(val => val[1] > 1).map(val => parseInt(val[0]));
let yPrimeCandidates = Object.entries(yPrimes).filter(val => val[1] > 1).map(val => parseInt(val[0]));
allCheck:
for (const xPrime of xPrimeCandidates) {
    valCheck:
    for (const yPrime of yPrimeCandidates) {
        let x = 0.5 * (yPrime + xPrime);    // Convert x coordinate back using x=0.5(y'+x')
        let y = 0.5 * (yPrime - xPrime);    // Convert y coordinate back using y=0.5(y'-x')
        if (x != Math.floor(x) || y != Math.floor(y)) continue; // Half coordinates are not valid combinations
        for (const s of sensors) {
            if (d_manhattan(s.sensor.slice(), [x, y].slice()) <= s.dist) continue valCheck;
        }
        console.log('Answer', (x * maxSize) + y);
        break allCheck;
    }
}