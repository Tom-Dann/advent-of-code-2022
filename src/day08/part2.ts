import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let trees = input.trim().split('\n').map(l => l.split('').map(t => parseInt(t)));

let rowSize = trees[0].length - 1, colSize = trees.length - 1;
let maxScore = 0;
for (let j = 0; j <= colSize; j++) {
    for (let i = 0; i <= rowSize; i++) {
        let scores = [0, 0, 0, 0];
        let val = trees[j][i];
        for (let a = i; a >= 0; a--) {          // left
            if ((a != i && trees[j][a] >= val) || a == 0) break;
            scores[0]++;
        }
        for (let a = i; a <= rowSize; a++) {    // right
            if ((a != i && trees[j][a] >= val) || a == rowSize) break;
            scores[1]++;
        }
        for (let b = j; b >= 0; b--) {          // up
            if ((b != j && trees[b][i] >= val) || b == 0) break;
            scores[2]++;
        }
        for (let b = j; b <= colSize; b++) {    // down
            if ((b != j && trees[b][i] >= val) || b == colSize) break;
            scores[3]++;
        }
        let score = scores.reduce((a, b) => a * b, 1);
        if (score > maxScore) maxScore = score;
    }
}

console.log('Answer:', maxScore);