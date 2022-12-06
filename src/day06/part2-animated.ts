import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let signal = input.trim();

function colourChunk(chunk: string[]): string {
    let str = '';
    for (const char of chunk) {
        if (chunk.filter(x => x == char).length == 1) {
            str += `\x1b[32m${char}\x1b[0m`;
        } else {
            str += `\x1b[31m${char}\x1b[0m`;
        }
    }
    return str;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function run() {
    let size = 14;
    for (let i = size; i <= signal.length; i++) {
        let chunk = [...signal.slice(i - size, i)];
        let set = new Set(chunk);
        let output = colourChunk(chunk);
        let prev = '\x1b[38;5;8m' + signal.slice(Math.max(i - size - 20, 0), Math.max(i - size - 1, 0)).padStart(19, '-') + '\x1b[0m';
        let next = '\x1b[38;5;8m' + signal.slice(i + 1, i + 20) + '\x1b[0m';
        let start = '\x1b[100000D> Searching signal at position [' + i.toString().padStart(4, '0') + '] ';
        process.stdout.write(start + '|' + prev + '>' + output + '<' + next + '|');

        await sleep((i < 40 || i > 3800) ? 200 : 15);
        if (set.size == size) {
            await sleep(200);
            console.log('\n> Found match at position', i);
            break;
        }
    }
}
run();