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

const wrapCoord = (coord: number[], facing: number): [number[], number] => {
    let check = coord.slice();
    if (!isVoid(coord)) return [check, facing];
    const faceSize = 50;
    const faceIndex = check.map(a => Math.floor(a / faceSize));
    /*  ┌───┬───┐
        │1,0│2,0│
        ├───┼───┘ 
        │1,1│
    ┌───┼───┤
    │0,2│1,2│
    ├───┼───┘ 
    │1,1│
    └───┘ */
    const error = () => { return new Error(`Direction '${facing}' and face index '${faceIndex}' not a valid combination. Coords: ${check}`) };
    switch (facing) {
        case 0:     // Facing right
            switch (faceIndex[1]) {
                case 0:     // Face [2, 0] -> [1, 2]
                    return [[99, 149 - check[1]], 2];
                case 1:     // Face [1, 1] -> [2, 0]
                    return [[check[1] + 50, 49], 3];
                case 2:     // Face [1, 2] -> [2, 0]
                    return [[149, 149 - check[1]], 2];
                case 3:     // Face [0, 3] -> [1, 2]
                    return [[check[1] - 100, 149], 3];
                default:
                    throw error();
            }
        case 1:     // Facing down
            switch (faceIndex[0]) {
                case 0:     // Face [0, 3] -> [0, 2]
                    return [[check[0] + 100, 0], 1];
                case 1:     // Face [1, 2] -> [0, 3]
                    return [[49, check[0] + 100], 2];
                case 2:     // Face [2, 0] -> [1, 1]
                    return [[99, check[0] - 50], 2];
                default:
                    throw error();
            }
        case 2:     // Facing left
            switch (faceIndex[1]) {
                case 0:     // Face [1, 0] -> [0, 2]
                    return [[0, 149 - check[1]], 0];
                case 1:     // Face [1, 1] -> [0, 2]
                    return [[check[1] - 50, 100], 1];
                case 2:     // Face [0, 2] -> [1, 0]
                    return [[50, 149 - check[1]], 0];
                case 3:     // Face [0, 3] -> [1, 0]
                    return [[check[1] - 100, 0], 1];
                default:
                    throw error();
            }
        case 3:     // Facing up
            switch (faceIndex[0]) {
                case 0:     // Face [0, 2] -> [1, 1]
                    return [[50, check[0] + 50], 0];
                case 1:     // Face [1, 0] -> [0, 3]
                    return [[0, check[0] + 100], 0];
                case 2:     // Face [2, 0] -> [0, 3]
                    return [[check[0] - 100, 199], 3];
                default:
                    throw error();
            }
        default:
            throw error();
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
        for (let a = 1; a <= count; a++) {
            const dir = directions[facing];
            let [check, newFacing] = wrapCoord(position.map((v, i) => v + dir[i]), facing);
            if (map[check[0]][check[1]] == legend.wall) break;
            position = check;
            facing = newFacing;
        }
    }
}

let score = (1000 * (position[1] + 1)) + (4 * (position[0] + 1)) + facing;
console.log('Answer:', score);