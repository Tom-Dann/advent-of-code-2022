import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let lines = input.trim().split('\n').map(l => l.match(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? ([\w(,\s)]+)/d));

let flowRates = new Map<string, number>();
let leadsTo = new Map<string, string[]>();

// Parse input
for (const line of lines) {
    if (line == null) throw ('Regex failed');
    flowRates.set(line[1], parseInt(line[2]));
    leadsTo.set(line[1], line[3].split(', '));
}

type State = {
    current: string,
    opened: string[],
    pressure: number,
}
let minutes: State[][] = [[{
    current: "AA",
    opened: [],
    pressure: 0,
}]];

let makeKey = (curr: string, opened: string[]): string => {
    return curr + ':' + opened.sort().join(',');
}

let totalTime = 30;
for (let minute = 1; minute <= totalTime; minute++) {
    let next: State[] = [];
    let day = minutes[minute - 1];
    let bestStates = new Map<string, number>();
    for (const [i, state] of day.entries()) {
        const current = state.current;
        const pressure = state.pressure;
        let opened = state.opened.slice();
        const flowRate = flowRates.get(current) || 0;
        if (!(opened.includes(current)) && (flowRate > 0)) {
            let newOpened = opened.slice();
            newOpened.push(current);
            let newPressure = pressure + ((totalTime - minute) * flowRate);
            let key = makeKey(current, newOpened);
            bestStates.set(key, Math.max(newPressure, (bestStates.get(key) || 0)));
        }
        let tunnels = leadsTo.get(current) || [];
        for (const tunnel of tunnels) {
            let key = makeKey(tunnel, opened);
            bestStates.set(key, Math.max(pressure, (bestStates.get(key) || 0)));
        }
    }
    for (const [key, pressure] of bestStates.entries()) {
        let [current, tunnels] = key.split(':');
        let opened = (tunnels != '') ? tunnels.split(',') : [];
        next.push({
            current,
            opened,
            pressure,
        });
    }
    minutes.push(next);
}

let final = minutes[totalTime];
let pressures = final.map(s => s.pressure);
let max = 0;
for (const v of pressures) {
    if (v > max) max = v;
}
console.log('Answer:', max);