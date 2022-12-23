import { readFileSync } from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');
const vals = input.trim().split('\n').map(l => l.split(''));

// Parse input
let elves: string[] = [];
for (const [j, line] of vals.entries()) {
    for (const [i, char] of line.entries()) {
        if (char == '#') elves.push(i + ',' + j);
    }
}

const checks = [
    [[-1, -1], [0, -1], [1, -1]],   // NW, N, NE
    [[-1, 1], [0, 1], [1, 1]],      // SW, S, SW
    [[-1, -1], [-1, 0], [-1, 1]],   // NW, W, SW
    [[1, -1], [1, 0], [1, 1]],      // NE, E, SE
];

const proposeMove = (elf: string, check: number[][]): string => {
    let elfCoords = elf.split(',').map(Number);
    for (const dir of check) {
        let place = [elfCoords[0] + dir[0], elfCoords[1] + dir[1]];
        if (elves.includes(place.join(','))) return '';
    }
    return [elfCoords[0] + check[1][0], elfCoords[1] + check[1][1]].join(',');
}

const isAlone = (elf: string): boolean => {
    let elfCoords = elf.split(',').map(Number);
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i != 0 || j!=0) {
                let coord = [elfCoords[0] + i, elfCoords[1] + j];
                if (elves.includes(coord.join(','))) return false;
            }
        }
    }
    return true;
}

let round = 0;
let moving = true;
while(moving) {
    moving = false;

    // Work out proposed moves
    let proposed = new Map<string, string>();
    let proposedCounts = new Map<string, number>();
    for (const elf of elves) {
        if (isAlone(elf)) continue;
        for (let k = 0; k < checks.length; k++) {
            const check = checks[(round + k) % checks.length];
            let move = proposeMove(elf, check);
            if (move != '') {
                proposed.set(elf, move);
                proposedCounts.set(move, (proposedCounts.get(move) ?? 0) + 1);
                break;
            }
        }
    }

    // Move elves
    let newElves: string[] = [];
    for (const elf of elves) {
        const move = proposed.get(elf);
        if (move == null) {
            newElves.push(elf);
        } else {
            const count = proposedCounts.get(move)!;
            if (count > 1) {
                newElves.push(elf);
            } else {
                newElves.push(move);
                moving = true;
            }
        }
    }
    elves = newElves.slice();
    round++;
}

console.log('Answer:', round);