import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let lines = input.trim().split('\n').map(l => l.match(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? ([\w(,\s)]+)/d));

let flowRates = new Map<string, number>();
let leadsTo = new Map<string, string[]>();
let allValves: string[] = [];
let valves: string[] = [];

// Parse input
for (const line of lines) {
    if (line == null) throw ('Regex failed');
    flowRates.set(line[1], parseInt(line[2]));
    leadsTo.set(line[1], line[3].split(', '));
    allValves.push(line[1]);
    if (line[1] == 'AA' || line[2] != '0') valves.push(line[1]);
}
allValves.sort();
valves.sort();

// Compute all distances by Floyd-Warshall
let allDistances = Array.from({ length: allValves.length }, () => Array.from({ length: allValves.length }, () => Infinity));
let distances = Array.from({ length: valves.length }, () => Array.from({ length: valves.length }, () => Infinity));
for (const [source, targets] of leadsTo) {
    for (const target of targets) {
        let m = allValves.indexOf(source);
        let n = allValves.indexOf(target);
        allDistances[m][n] = 1;
    }
}
for (let i = 0; i < allDistances.length; i++) {
    allDistances[i][i] = 0;
}
for (let k = 0; k < allDistances.length; k++) {
    for (let i = 0; i < allDistances.length; i++) {
        for (let j = 0; j < allDistances.length; j++) {
            if (allDistances[i][j] > allDistances[i][k] + allDistances[k][j]) {
                allDistances[i][j] = allDistances[i][k] + allDistances[k][j];
            }
        }
    }
}
for (let i = 0; i < distances.length; i++) {
    let m = allValves.indexOf(valves[i]);
    for (let j = 0; j < distances.length; j++) {
        let n = allValves.indexOf(valves[j]);
        distances[i][j] = allDistances[m][n];
    }
}

const getFlowRate = (index: number): number => flowRates.get(valves[index]) ?? 0;
let best: number = 0;
let findSolution = (time: number, current: number, opened: number, pressure: number) => {
    for (let i = 1; i < valves.length; i++) {
        let valveBit = (2 ** (i - 1));
        if ((opened & valveBit) > 0) continue;    // Already opened
        let elapsed = distances[current][i] + 1;
        let timeRemaining = time - elapsed;
        if (timeRemaining < 0) continue;               // Not enough time to open valve
        let newPressure = pressure + (timeRemaining * getFlowRate(i));
        findSolution(timeRemaining, i, (opened | valveBit), newPressure);
    }
    if (pressure > best) best = pressure;
}

findSolution(30, 0, 0, 0);
console.log('Answer:', best);