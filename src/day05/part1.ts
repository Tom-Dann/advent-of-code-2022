import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let [map, instructions] = input.split('\n\n');

let stacks: string[][] = [[]];
for (const l of map.split('\n').slice(0, -1)) {
    for (let i = 1; i < l.length; i += 4) {
        if (l[i] != ' ') {
            let stack_no = (i - 1) / 4;
            stacks[stack_no] ??= [];
            stacks[stack_no].unshift(l[i]);
        }
    }
}

for (const instr of instructions.trim().split('\n').map(l => l.split(' '))) {
    let num = parseInt(instr[1]), source = parseInt(instr[3]), target = parseInt(instr[5]);
    for (let i = 0; i < num; i++) {
        let box = stacks[source - 1].pop();
        if (box != null) stacks[target - 1].push(box);
    }
}

let str = stacks.map(x => x[x.length - 1]).reduce((a, b) => a + b);
console.log(stacks.map((x, i) => `${i + 1} | [${x.join('][')}]`).join('\n'), '\n');
console.log('Answer:', str);