import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let trees = input.trim().split('\n').map(l => l.split('').map(t => parseInt(t)));

let rowSize = trees[0].length - 1, colSize = trees.length - 1;
let visible = new Set<string>();

function checkTree(i: number, j: number, checkVal: number): boolean {
    let val = trees[j][i];
    if (val > checkVal) {
        visible.add(i + ',' + j);
        return true;
    }
    return false;
}

for (let j = 0; j <= colSize; j++) {
    let fromLeft = -1, fromRight = -1;
    for (let i = 0; i <= rowSize; i++) {
        if (checkTree(i, j, fromLeft)) fromLeft = trees[j][i];
        if (checkTree(rowSize - i, j, fromRight)) fromRight = trees[j][rowSize - i];
    }
}

for (let i = 0; i <= rowSize; i++) {
    let fromTop = -1, fromBottom = -1;
    for (let j = 0; j <= colSize; j++) {
        if (checkTree(i, j, fromTop)) fromTop = trees[j][i];
        if (checkTree(i, colSize - j, fromBottom)) fromBottom = trees[colSize - j][i];
    }
}

console.log('Answer:', visible.size);