import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');

let currDir: string[] = [];
let sizes = new Map<string, number>([["/", 0]]);
for (const l of input.trim().split('\n')) {
    let line = l.split(' ');
    if (line[0] == '$') {
        if (line[1] == 'cd') {
            switch (line[2]) {
                case '..':
                    currDir.pop();
                    break;
                case '/':
                    currDir = [];
                    break;
                default:
                    currDir.push(line[2]);
                    break;
            }
        }
    } else if (line[0] != 'dir') {
        let path = currDir.slice();
        let size = parseInt(line[0]);
        sizes.set("/", sizes.get("/")! + size)
        while (path.length > 0) {
            let curr = sizes.get(path.join("/")) ?? 0;
            sizes.set(path.join("/"), curr + size);
            path.pop();
        }
    }
}

let part1 = [...sizes.values()].filter(n => n <= 100000).reduce((a, b) => a + b, 0);
console.log('Part 1:', part1);

let rootSize = sizes.get("/");
let toFind = 30000000 - (70000000 - rootSize!);
let part2 = Math.min(...[...sizes.values()].filter(n => n >= toFind))
console.log('Part 2:', part2);