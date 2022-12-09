import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let moves = input.trim().split('\n');

let length = 10;
let visited = new Set<string>(["0,0"]);
let rope = Array.from({ length: length }, () => [0, 0]);

for (const move of moves) {
    let [dir, n] = move.split(' ');
    let num = parseInt(n);

    for (let i = 1; i <= num; i++) {
        switch (dir) {
            case 'R':
                rope[0][0]++;
                break;
            case 'L':
                rope[0][0]--;
                break;
            case 'U':
                rope[0][1]++;
                break;
            case 'D':
                rope[0][1]--;
                break;
            default:
                throw (`Direction "${dir}" not found`);
        }

        for (let j = 1; j < length; j++) {
            if (Math.abs(rope[j - 1][0] - rope[j][0]) > 1 || Math.abs(rope[j - 1][1] - rope[j][1]) > 1) {
                if (rope[j - 1][0] > rope[j][0]) rope[j][0]++;
                if (rope[j - 1][1] > rope[j][1]) rope[j][1]++;
                if (rope[j - 1][0] < rope[j][0]) rope[j][0]--;
                if (rope[j - 1][1] < rope[j][1]) rope[j][1]--;
                if (j == length - 1) visited.add(rope[j][0] + ',' + rope[j][1]);
            } else {
                break;
            }
        }
    }
}

console.log('Answer:', visited.size);
