import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let moves = input.trim().split('\n');

let head = [0, 0], tail = [0, 0];
let visited = new Set<string>(["0,0"]);

for (const move of moves) {
    let [dir, n] = move.split(' ');
    let num = parseInt(n);

    for (let i = 1; i <= num; i++) {
        let old_head = head.slice();
        switch (dir) {
            case 'R':
                head[0]++;
                break;
            case 'L':
                head[0]--;
                break;
            case 'U':
                head[1]++;
                break;
            case 'D':
                head[1]--;
                break;
            default:
                throw(`Direction "${dir}" not found`);
        }

        if (Math.abs(head[0]-tail[0]) > 1 || Math.abs(head[1]-tail[1]) > 1) {
            tail = old_head.slice();
            visited.add(tail.join(','));
        }
    }
}

console.log('Answer:',visited.size);