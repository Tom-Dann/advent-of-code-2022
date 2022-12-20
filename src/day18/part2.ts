import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let droplet = input.trim().split('\n').map(l => l.split(',').map(Number).join(','));

let directions = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
]

let start = [-1, -1, -1];
let surfaceArea = 0;
let visited: string[] = [];
let toCheck = [start.join(',')];
let min = -1, max = 24;
while(toCheck.length) {
    let cube = toCheck.pop()!.split(',').map(Number);
    for (const dir of directions) {
        let check = [cube[0] + dir[0], cube[1] + dir[1], cube[2] + dir[2]];
        let checkKey = check.join(',');
        let inRange = check.reduce((bool, v) => bool && v >= min && v <= max, true);
        if (inRange && !visited.includes(checkKey)) {
            if (droplet.includes(checkKey)) {
                surfaceArea++;
            } else {
                if (!toCheck.includes(checkKey)) toCheck.push(checkKey);
            }
        }
    }
    visited.push(cube.join(','));
}

console.log('Answer:', surfaceArea);