import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let blueprints = input.trim().split('\n').map(l => l.match(/Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./d)!.slice(1, 8).map(Number));

// Ore -> Ore collecting robots -> Ore
// Ore -> Clay collecting robots -> Clay
// Ore, Clay -> Obsidian collecting robots -> Obsidian
// Ore, Obsidian -> Geode collecting robots -> Geode
type Costs = {
    ore_ore: number,
    clay_ore: number,
    obsidian_ore: number,
    obsidian_clay: number,
    geode_ore: number,
    geode_obsidian: number,
}
type Resources = number[];
const robotTypes = ["ore", "clay", "obsidian", "geode"] as const;
type Robot = typeof robotTypes[number];

const maxGeodes = (costs: Costs, totalTime: number): number => {
    let max = 0;

    const collectResources = (resources: Resources): Resources => {
        for (let i = 0; i < 4; i++) {
            resources[i] += resources[i + 4];
        }
        return resources;
    }

    const enoughResources = (robotType: Robot, resources: Resources): boolean => {
        switch (robotType) {
            case "ore":
                return resources[0] >= costs.ore_ore;
            case "clay":
                return resources[0] >= costs.clay_ore;
            case "obsidian":
                return (resources[0] >= costs.obsidian_ore) && (resources[1] >= costs.obsidian_clay);
            case "geode":
                return (resources[0] >= costs.geode_ore) && (resources[2] >= costs.geode_obsidian);
        }
    }

    const makeRobot = (type: Robot, time: number, resources: Resources) => {
        while (!enoughResources(type, resources)) {
            resources = collectResources(resources);
            time++;
            if (time >= totalTime) {
                if (resources[3] > max) {
                    max = resources[3];
                }
                return;
            }
        }
        resources = collectResources(resources);
        switch (type) {
            case "ore":
                resources[0] -= costs.ore_ore;
                resources[4]++;
                break;
            case "clay":
                resources[0] -= costs.clay_ore;
                resources[5]++;
                break;
            case "obsidian":
                resources[0] -= costs.obsidian_ore;
                resources[1] -= costs.obsidian_clay;
                resources[6]++;
                break;
            case "geode":
                resources[0] -= costs.geode_ore;
                resources[2] -= costs.geode_obsidian;
                resources[7]++;
                break;
        }
        time++;
        solve(time, resources.slice());
    }

    const solve = (time: number, resources: Resources) => {
        if (time >= totalTime) {
            if (resources[3] > max) {
                max = resources[3];
            }
            return;
        }
        if (resources[4] < Math.max(costs.ore_ore, costs.clay_ore, costs.obsidian_ore, costs.geode_ore)) makeRobot("ore", time, resources.slice());
        if (resources[5] < costs.obsidian_clay) makeRobot("clay", time, resources.slice());
        if (resources[6] < costs.geode_obsidian) makeRobot("obsidian", time, resources.slice());
        makeRobot("geode", time, resources.slice());
    }

    let startingResources: Resources = Array.from({ length: 8 }, () => 0);
    startingResources[4]++;
    solve(0, startingResources.slice());
    return max;
}

let score = 1;
for (const b of blueprints.slice(0,3)) {
    let costs: Costs = {
        ore_ore: b[1],
        clay_ore: b[2],
        obsidian_ore: b[3],
        obsidian_clay: b[4],
        geode_ore: b[5],
        geode_obsidian: b[6],
    }
    score *= maxGeodes(costs, 32);;
}

console.log('Answer:', score);