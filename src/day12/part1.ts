import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let letterMap = input.trim().split('\n').map(l => l.split(''));

let height = letterMap.length;
let width = letterMap[0].length;
let start: number[] = [], end: number[] = [];
let directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];

for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
        if (letterMap[j][i] == 'S') start = [i, j];
        if (letterMap[j][i] == 'E') end = [i, j];
    }
}

function letterToVal(letter: string): number {
    if (letter == 'S') return 0;
    if (letter == 'E') return 25;
    return letter.charCodeAt(0) - 'a'.charCodeAt(0);
}
let numberMap = letterMap.map(l => l.map(s => letterToVal(s)));

function h(point: string) {
    let [x, y] = point.split(',').map(Number);
    let dist = Math.abs(x - end[0]) + Math.abs(y - end[1]);
    let height = 25 - numberMap[y][x];
    return Math.max(dist, height);
}

function countSteps(cameFrom: Map<string, string>, current: string) {
    let steps = 0;
    while (cameFrom.has(current)) {
        current = cameFrom.get(current)!;
        steps++;
    }
    return steps;
}

// Run A* path finding
function aStar(): number {
    let startKey = start.join(',');
    let endKey = end.join(',');
    let openSet = new Set<string>([startKey]);
    let cameFrom = new Map<string, string>();
    let gScore = new Map<string, number>([[startKey, 0]]);
    let fScore = new Map<string, number>([[startKey, h(startKey)]]);
    while (openSet) {
        let current = [...openSet][0];
        let currScore = fScore.get(current) ?? Infinity;
        for (const item of openSet) {
            let newScore = fScore.get(item) ?? Infinity;
            if (newScore < currScore) {
                current = item;
                currScore = newScore;
            }
        }
        if (current == endKey) return countSteps(cameFrom, current);
        openSet.delete(current);

        for (const dir of directions) {
            let currentArr = current.split(",").map(Number);
            let neighborArr = currentArr.map((a, i) => a + dir[i]);
            if (neighborArr[0] < 0 || width <= neighborArr[0]) continue;
            if (neighborArr[1] < 0 || height <= neighborArr[1]) continue;
            if (numberMap[currentArr[1]][currentArr[0]] < numberMap[neighborArr[1]][neighborArr[0]] - 1) continue;

            let neighbor = neighborArr.join(',');
            let tentative_gScore = (gScore.get(current) ?? Infinity) + 1;
            if (tentative_gScore < (gScore.get(neighbor) ?? Infinity)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentative_gScore);
                fScore.set(neighbor, tentative_gScore + h(neighbor));
                openSet.add(neighbor);
            }
        }
    }
    return -1;
}

console.log('Answer:', aStar());