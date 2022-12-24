import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let inputMap = input.trim().split('\n').map(l => l.split(''));

class Storm {
    left: number[][];
    right: number[][];
    up: number[][];
    down: number[][];

    constructor(public width: number, public height: number) {
        this.left = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
        this.right = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
        this.up = Array.from({ length: width }, () => Array.from({ length: height }, () => 0));
        this.down = Array.from({ length: width }, () => Array.from({ length: height }, () => 0));
    };

    next() {
        for (let j = 0; j < this.height; j++) {     // Iterate over rows
            this.left[j].push(this.left[j].shift()!);
            this.right[j].unshift(this.right[j].pop()!);
        }
        for (let i = 0; i < this.width; i++) {     // Iterate over columns
            this.up[i].push(this.up[i].shift()!);
            this.down[i].unshift(this.down[i].pop()!);
        }
    }

    getBlizzards(): Set<string> {
        let blizzards = new Set<string>();
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                if (this.left[j][i] || this.right[j][i] || this.up[i][j] || this.down[i][j]) blizzards.add(i + ',' + j);
            }
        }
        return blizzards;
    }
}


// Parse input
const height = inputMap.length - 2;
const width = inputMap[0].length - 2;
let storm = new Storm(width, height);
for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
        switch (inputMap[j + 1][i + 1]) {
            case '<':
                storm.left[j][i] = 1;
                break;
            case '>':
                storm.right[j][i] = 1;
                break;
            case '^':
                storm.up[i][j] = 1;
                break;
            case 'v':
                storm.down[i][j] = 1;
                break;
        }
    }
}

// Find best path
const start = "0,-1";
const end = (width - 1) + ',' + height;
const directions = [
    [0,0],
    [1,0],
    [0,-1],
    [-1,0],
    [0,1],
];
const inBounds = (coords: number[]): boolean => {
    if (coords.join(',') == start || coords.join(',') == end) return true;
    return (0 <= coords[0] && 0 <= coords[1] && coords[0] < width && coords[1] < height);
}
let positions = new Set([start]);
let minutesElapsed = 0;
while (!positions.has(end)) {
    let nextPositions = new Set<string>();
    storm.next();
    const blizzards = storm.getBlizzards();
    for (const pos of positions) {
        const coord = pos.split(',').map(Number);
        for (const dir of directions) {
            const move = coord.map((v, i) => v + dir[i]);
            if (!blizzards.has(move.join(',')) && inBounds(move)) nextPositions.add(move.join(','));
        }
    }
    minutesElapsed++;
    positions = nextPositions;
}

console.log('Answer:', minutesElapsed);