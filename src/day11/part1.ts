import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8').trim().split('\n\n');

type Monkey = {
    items: number[],
    operation: (a: number) => number,
    test: (a: number) => boolean,
    throwTo: number[],
    inspectCount: number,
}

function findOperation(s: string): (a: number) => number {
    let symbols = s.split(' ');
    switch (symbols[1]) {
        case '+':
            if (symbols[2] == 'old') return (a) => { return a * 2 };    // new = old + old
            return (a) => { return a + parseInt(symbols[2]) };          // new = old + <x>
        case '*':
            if (symbols[2] == 'old') return (a) => { return a ** 2 };   // new = old * old
            return (a) => { return a * parseInt(symbols[2]) };          // new = old * <x>
        default:
            throw (`Operator '${symbols[1]}' not implemented`);
    }
}

// Parse input
let monkeys: Monkey[] = [];
for (const def of input) {
    let lines = def.split('\n');
    let items = lines[1].split(': ')[1].split(',').map(Number);
    let operation = findOperation(lines[2].split(' = ')[1]);
    let test = (a: number) => (a % parseInt(lines[3].split('by ')[1]) == 0);
    let trueNo = parseInt(lines[4].split('monkey ')[1]);
    let falseNo = parseInt(lines[5].split('monkey ')[1]);
    let monkey: Monkey = {
        items,
        operation,
        test,
        throwTo: [falseNo, trueNo],
        inspectCount: 0
    }
    monkeys.push(monkey);
}

for (let i = 1; i <= 20; i++) {     // 20 rounds of inspecting and throwing
    for (const monkey of monkeys) {
        while (monkey.items) {
            let num = monkey.items.shift();
            if (num == null) break;
            let newNum = Math.floor(monkey.operation(num) / 3);
            let to = +monkey.test(newNum);
            monkey.inspectCount++;
            monkeys[monkey.throwTo[to]].items.push(newNum);
        }
    }
}

let counts = monkeys.map(m => m.inspectCount).sort((a, b) => b - a);
console.log('Answer:', counts[0] * counts[1]);
