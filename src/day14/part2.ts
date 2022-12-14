import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let vals = input.trim().split('\n').map(l => l.split(' -> ').map(c => c.split(',').map(Number)));

let width = 1000, height = 200;
const legend = {air: 0, rock: 1, sand: 2};
let map = Array.from({ length: width }, () => Array.from({ length: height }, () => legend.air));

// Draw rocks
let floor = 0;
for (const line of vals) {
    for (let k = 1; k < line.length; k++) {
        let [x1, y1] = line[k - 1];
        let [x2, y2] = line[k];
        floor = Math.max(floor, y1, y2);
        if (x1 == x2) {
            let yMin = Math.min(y1, y2), yMax = Math.max(y1, y2);
            for (let j = yMin; j <= yMax; j++) {
                map[x1][j] = legend.rock;
            }
        }
        if (y1 == y2) {
            let xMin = Math.min(x1, x2), xMax = Math.max(x1, x2);
            for (let i = xMin; i <= xMax; i++) {
                map[i][y1] = legend.rock;
            }
        }
    }
}
floor += 2;

// Sand flow
let checks = [[0,1],[-1,1],[1,1]];
let finished = false;
while (!finished) {
    let x = 500, y = 0;
    let flowing = true;
    while(flowing) {
        flowing = false;
        if (map[500][0] == legend.sand) {
            finished = true;
            break;
        }
        for (const offset of checks) {
            let check = [x + offset[0], y + offset[1]];
            if (map[check[0]][check[1]] == legend.air) {
                x = check[0];
                y = check[1];
                flowing= true;
                break;
            }
        }
        if (y == floor - 1) flowing = false;
    }
    map[x][y] = legend.sand;
}

let count = map.reduce((a,b) => a + b.reduce((prev,curr) => prev + +(curr == legend.sand), 0), 0);
console.log('Answer:', count);