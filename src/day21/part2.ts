import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let lines = input.trim().split('\n');

let monkeys = lines.slice().map(l => l.split(': '));
let toCheck: string[][] = [];
let knownMonkeys = new Map<string, number>();
for (const monkey of monkeys) {
    if (monkey[0] == 'humn') continue;
    let rhs = monkey[1].split(' ');
    if (rhs.length == 1) {
        knownMonkeys.set(monkey[0], parseInt(monkey[1]));
    } else {
        toCheck.push([monkey[0], ...rhs]);
    }
}

let calculating = true;
while (calculating) {
    calculating = false;
    let toCheckNew: string[][] = [];
    while (toCheck.length) {
        let monkey = toCheck.shift()!;
        let val1 = knownMonkeys.get(monkey[1]);
        let val2 = knownMonkeys.get(monkey[3]);
        if (val1 != null && val2 != null && monkey[0] != 'root') {
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
            calculating = true;
        } else {
            toCheckNew.push(monkey);
        }
    }
    toCheck = toCheckNew.slice();
}
let equations = new Map<string,string[]>;
for (const l of toCheck) {
    if (l[0] != 'humn') equations.set(l[0], l.slice(1));
}
equations.set('humn', ['target']);

let solve = (equation: string[], target: number): number => {
    if (equation[0] == 'target') return target;
    let val1 = knownMonkeys.get(equation[0]);
    let val2 = knownMonkeys.get(equation[2]);
    if (val1 == null && val2 != null) {
        switch (equation[1]) {
            case '+':
                return solve(equations.get(equation[0])!, target - val2);   // target = a + b => a = target - b
            case '-':
                return solve(equations.get(equation[0])!, target + val2);   // target = a - b => a = target + b
            case '*':
                return solve(equations.get(equation[0])!, target / val2);   // target = a * b => a = target / b
            case '/':
                return solve(equations.get(equation[0])!, target * val2);   // target = a / b => a = target * b
            case '=':
                return solve(equations.get(equation[0])!, val2);
            default:
                throw new Error(`Operator ${equation[1]} not implemented`);
        }
    } else if (val1 != null && val2 == null) {
        switch (equation[1]) {
            case '+':
                return solve(equations.get(equation[2])!, target - val1);   // target = a + b => b = target - a
            case '-':
                return solve(equations.get(equation[2])!, val1 - target);   // target = a - b => b = a - target
            case '*':
                return solve(equations.get(equation[2])!, target / val1);   // target = a * b => b = target / a
            case '/':
                return solve(equations.get(equation[2])!, val1 / target);   // target = a / b => b = a / target
            case '=':
                return solve(equations.get(equation[0])!, val1);
            default:
                throw new Error(`Operator ${equation[1]} not implemented`);
        }
    } else {
        throw new Error(`Cannot solve as both values ${equation[0]} and ${equation[2]} are unknown`);
    }
}

let root = equations.get('root')!;
root[1] = '=';
console.log('Answer:', solve(root, 0));