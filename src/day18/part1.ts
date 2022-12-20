import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let cubes = input.trim().split('\n').map(l => l.split(',').map(Number));

let directions = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
]

let droplet: string[] = [];
let surfaceArea = 0;
for (const cube of cubes) {
    let touching = 0;
    for (const dir of directions) {
        let check = [cube[0] + dir[0], cube[1] + dir[1], cube[2] + dir[2]];
        if (droplet.includes(check.join(','))) touching++;
    }
    droplet.push(cube.join(','));
    surfaceArea += 6 - (touching * 2);
}

console.log('Answer:', surfaceArea);