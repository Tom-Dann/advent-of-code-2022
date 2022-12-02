import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let rounds = input.trim().split('\n').map(x => x.split(' '));

function convertChar(char: string): number {
    switch(char) {
        case 'A':
        case 'X':   // lose
            return 1;
        case 'B':
        case 'Y':   // draw
            return 2;
        case 'C':
        case 'Z':   // win
            return 3;
        default:
            throw(`Not valid selection. "${char}"`);
    }
}

function scoreRound(i: number, j: number): number {
    j = (i + j + 1) % 3;
    j ||= 3;
    let diff = ((j - i) + 3) % 3;   // 0: draw, 1: win, 2: loss
    let mult = (diff + 1) % 3;      // 0: loss, 1: draw, 2: win
    return j + (mult * 3);
}

let totalScore = 0;
for (let [, round] of rounds.entries()) {
    let nums = round.map(x => convertChar(x));
    totalScore += scoreRound(nums[0], nums[1]);
}

console.log('Answer:', totalScore);