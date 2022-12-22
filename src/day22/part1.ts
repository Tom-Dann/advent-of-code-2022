import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let lines = input.split('\n\n');

// Parse input
const mapInput = lines[0].split('\n');
const width = Math.max(...mapInput.map(l => l.length));
const height = mapInput.length;
const instructions = lines[1].match(/(\d+)|([LR])/g)!.slice();
const legend = {
    void: 0,
    open: 1,
    wall: 2,
};
let map = Array.from({ length: width }, () => Array.from({ length: height }, () => legend.void));
for (const [j, line] of mapInput.entries()) {
    for (const [i, char] of line.split('').entries()) {
        if (char == '.') map[i][j] = legend.open;
        if (char == '#') map[i][j] = legend.wall;
    }
}

const outOfBounds = (coord: number[]): boolean => {
    return (coord[0] < 0 || coord[1] < 0 || width <= coord[0] || height <= coord[1]);
}
const isVoid = (coord: number[]): boolean => {
    if (outOfBounds(coord)) return true;
    return map[coord[0]][coord[1]] == legend.void;
}

const wrapCoord = (coord: number[], facing: number): number[] => {
    let check = coord.slice();
    if (!isVoid(coord)) return check;
    switch (facing) {
        case 0:     // Wrap round to left side
            return [map.findIndex(a => a[check[1]] != legend.void), check[1]];
        case 1:     // Wrap round to top side
            return [check[0], map[check[0]].findIndex(a => a != legend.void)];
        case 2:     // Wrap round to right side
            return [map.findLastIndex(a => a[check[1]] != legend.void), check[1]];
        case 3:     // Wrap round to bottom side
            return [check[0], map[check[0]].findLastIndex(a => a != legend.void)];
        default:
            throw new Error(`Direction '${facing}' is not a valid direction`);
    }
}

// Run path
const directions = [
    [1, 0],     // Right
    [0, 1],     // Down
    [-1, 0],    // Left
    [0, -1],    // Up
];
let facing = 0; // Index for directions. Start facing right
let position = [map.findIndex(c => c[0] == legend.open), 0];    // Starting position is first open space on first row
for (const command of instructions) {
    if (command == 'L' || command == 'R') {
        let turn = (command == 'L') ? -1 : 1;
        facing = (facing + turn + directions.length) % directions.length;
    } else {
        const count = parseInt(command);
        const dir = directions[facing];
        for (let a = 1; a <= count; a++) {
            let check = wrapCoord(position.map((v, i) => v + dir[i]), facing);
            if (map[check[0]][check[1]] == legend.wall) break;
            position = check;
        }
    }
}

let score = (1000 * (position[1] + 1)) + (4 * (position[0] + 1)) + facing;
console.log('Answer:', score);