import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let wind = input.trim().split('');

const width = 7;
const shapes = [
    [[0, 0], [1, 0], [2, 0], [3, 0]],           // Rock shape: –
    [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]],   // Rock shape: +
    [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]],   // Rock shape: ⅃
    [[0, 0], [0, 1], [0, 2], [0, 3]],           // Rock shape: |
    [[0, 0], [1, 0], [0, 1], [1, 1]],           // Rock shape: □
]

class Rock {
    points: number[][];

    constructor(index: number, height: number) {
        let shape = shapes[index % shapes.length].slice();
        this.points = shape.map(coord => [coord[0] + 2, coord[1] + height + 3]);
    }

    canMove(offset: number[], tower: Tower): boolean {
        for (const point of this.points) {
            let newPoint = [point[0] + offset[0], point[1] + offset[1]];
            if (tower.rocks.includes(newPoint.join(','))) return false;     // Would intersect current rock
            if (newPoint[0] < 0 || newPoint[0] >= width || newPoint[1] < 0) return false;   // Would be out of bounds
        }
        return true;
    }

    move(offset: number[]) {
        this.points = this.points.map(p => [p[0] + offset[0], p[1] + offset[1]]);
    }
}

class Tower {
    rocks: string[] = [];
    height: number = 0;
    constructor() {
    }

    addRock(rock: Rock) {
        for (const point of rock.points) {
            if (point[1] >= this.height) this.height = point[1] + 1;
            this.rocks.push(point.join(','));
        }
    }
}

const rockTotal = 1000000000000;
let rockCount = rockTotal;
let iteration = 0;
let tower = new Tower();
let combos = new Map<string, number[]>();
let repetitionFound = false;
let heightToAdd = 0;
for (let i = 0; i < rockCount; i++) {
    let falling = true;
    let rock = new Rock(i, tower.height);
    let rockNo = i % shapes.length;
    let windNo = iteration % wind.length;
    let combo = rockNo + '-' + windNo;
    while (falling) {
        let direction = wind[iteration++ % wind.length];
        let offset = (direction == '<') ? [-1, 0] : [1, 0];
        if (rock.canMove(offset, tower)) rock.move(offset);
        let down = [0, -1];
        rock.canMove(down, tower) ? rock.move(down) : falling = false;
    }
    tower.addRock(rock);
    if (!repetitionFound && i > 1000) {     // Adding buffer at start for pattern to stabilise
        if (combos.has(combo)) {
            let first = combos.get(combo)!;
            let repHeight = tower.height - first[1];
            let repetitions = Math.floor((rockTotal - first[0]) / (i - first[0])) - 2;
            heightToAdd = repetitions * repHeight;
            rockCount = rockTotal - (repetitions * (i - first[0]));
            repetitionFound = true;
        } else {
            combos.set(combo, [i, tower.height]);
        }
    }
}

console.log('Answer:', tower.height + heightToAdd);