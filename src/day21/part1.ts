import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let lines = input.trim().split('\n');

let monkeys = lines.slice().map(l => l.split(': '));
let toCheck: string[][] = [];
let knownMonkeys = new Map<string, number>();
for (const monkey of monkeys) {
    let rhs = monkey[1].split(' ');
    if (rhs.length == 1) {
        knownMonkeys.set(monkey[0], parseInt(monkey[1]));
    } else {
        toCheck.push([monkey[0], ...rhs]);
    }
}

while (toCheck.length) {
    let monkey = toCheck.shift()!;
    let val1 = knownMonkeys.get(monkey[1]);
    let val2 = knownMonkeys.get(monkey[3]);
    if (val1 != null && val2 != null) {
        switch (monkey[2]) {
            case '+':
                knownMonkeys.set(monkey[0], val1 + val2);
                break;
            case '-':
                knownMonkeys.set(monkey[0], val1 - val2);
                break;
            case '*':
                knownMonkeys.set(monkey[0], val1 * val2);
                break;
            case '/':
                knownMonkeys.set(monkey[0], val1 / val2);
                break;
            default:
                throw new Error(`Operator ${monkey[2]} not implemented`);
        }
    } else {
        toCheck.push(monkey);
    }
}

console.log('Answer:', knownMonkeys.get('root'));