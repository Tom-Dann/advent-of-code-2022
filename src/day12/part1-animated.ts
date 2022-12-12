let input = `abcccaaaaaaccccccccaaaaaccccccaaaaaaccccccaaaaaaaacccaaaaaaaccaaaacccccccccccccccccccccccccaaaaaacccccccccccccccccccccccccccccaaaaaa
abcccaaaaaacccccccaaaaaaccccaaaaaaaacccccccaaaaaaaaaaaaaaaaccaaaaacccccccccccccccccccccccccaaaaaacccccccccccccccccccccccccccccaaaaaa
abccccaaaaacaaaccaaaaaaaacccaaaaaaaaacccccccaaaaaaaaaaaaaaaacaaaaaacccccccccaaacccccccccccaaaaaaaaccccccccccaaccccccccccccccccaaaaaa
abccccaaaaccaaaaaaaaaaaaacccaaaaaaaaaacccccaaaaaaaaaaaaaaaaaaacaaaacccccccccaaaacccccccccaaaaaaaaaacccccccccaaaccccccccccccccccccaaa
abcccccccccaaaaaacccaacccccccccaaacaaaccccccaacccccccaaaaaaaaacaacccccccccccaaaacccccccccaaaaaaaaaacccccccccaaaccacaaccccccccccccaaa
abcccccccccaaaaaacccaacccccccccaaacccccccccccccccccccaaaacaaaacccccccaacaaccaaaccccccccccaccaaaaacacccccccccaaaacaaaaccccccccccccaac
abccccccccccaaaaacccccccccccccccacccaaaacccccccccccccaaaacccccccccccccaaaacccccccccccaacccccaaaaccccccccjjjjaaaaaaaaaccccccccccccccc
abccccccccccaaaacccccccccccccccccccaaaaacccccccccccccaaaccccccccccccccaaaaacccccccccaaaaaacccaaccccccccjjjjjjkkaaaacccccccccaacccccc
abcccccaaccccccccccccccccccccccccccaaaaaacccccccccccccaacccccccccccccaaaaaaccccccccccaaaaaccccccccccccjjjjjjjkkkkaacccccaacaaacccccc
abccaaaacccccccccccccccccccccccccccaaaaaaccccccccccccccccccccccccccccaaaacaccccccccaaaaaaaccccaacccccjjjjoooookkkkkkkklllaaaaaaacccc
abccaaaaaacccccccccccccccccccccccccaaaaacccccccccccccccccccccccccccccccaaccccccccccaaaaaaaaccaaaaccccjjjoooooookkkkkkkllllaaaaaacccc
abcccaaaaacccccccccccccccccccccccccccaaaccccccccaaaacccccccccccccccccccccccccccccccaaaaaaaaccaaaaccccjjooooooooppkkppplllllaccaacccc
abccaaaaaccccccccccccaccccccccccccccccccccccccccaaaacccccccccccccccccccccccccccccccccaaacacccaaaacccijjooouuuuoppppppppplllccccccccc
abcccccaacccccccccccaaaaaaaaccccccccccccccccccccaaaaccccaaccccccccaaacccccccccccccaacaaccccccccccccciijoouuuuuuppppppppplllcccaccccc
abcccccccccccccccccccaaaaaaccccccccccccccccccccccaaccccaaaacccccccaaaaccccccccccaaaaaaccccccccccccciiiiootuuuuuupuuuvvpppllccccccccc
abcccccccccccccccccccaaaaaaccaaaaacccccccccccccccccccccaaaacccccccaaaaccccccccccaaaaaaccccccccccccciiinnotuuxxxuuuuvvvpppllccccccccc
abccccccccccccccacccaaaaaaaacaaaaaaacccccccccccccccccccaaaacccccccaaacccccaaaaccaaaaaccccaaccccccciiiinnnttxxxxuuyyyvvqqqllccccccccc
abcccccccccccaaaaccaaaaaaaaaaaaaaaaaaccaacccccccccccccccccccccccccccccccccaaaacccaaaaaccaaacccccciiinnnnnttxxxxxyyyyvvqqqllccccccccc
abaaaacccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccccccccccccccccccccaaaacccaaaaaacaaaccccciiinnnnttttxxxxxyyyyvvqqmmmccccccccc
abaaaaccccccccaaaaacccaaaaacaaaaaacaaaaaaccccccccccccccccaaccccccccccccccccaacccccccaaaaaaaaaaciiinnnnttttxxxxxyyyyvvqqqmmmccccccccc
SbaaaacccccccaaaaaccccaaaaaccaaaaaaaaaaaccccccccccccccccaaacaacccccccccccccccccccccccaaaaaaaaachhhnnntttxxxEzzzzyyvvvqqqmmmccccccccc
abaaaacccccccaacaacccccaaaaaaaacaaaaaaaaaccccccccccccccccaaaaaccccccccccccccccccccccccaaaaaaacchhhnnntttxxxxxyyyyyyvvvqqmmmdddcccccc
abaaaacccccccccccccccccccaaaaaacaaaaaaaaaacccccccccccccaaaaaaccccccccaaaccccccccccccccaaaaaaccchhhnnntttxxxxywyyyyyyvvvqqmmmdddccccc
abaacccccccccccccccccccaaaaaaacccccaaaaaaacccccccccccccaaaaaaaacccccaaaacccccccccccccaaaaaaacaahhhmmmttttxxwwyyyyyyyvvvqqmmmdddccccc
abcccccccccccccccccccccaaaaaaacaaccaaacccccccccccccccccaacaaaaacccccaaaacccccccccccccaaacaaaaaahhhmmmmtsssswwyywwwwvvvvqqqmmdddccccc
abcccccccccccccccaaaccccaaaaaaaaaacaaccaaccccccccccccccccaaacaccccccaaaacccccccccccccccccaaaaacahhhmmmmmsssswwywwwwwvvrrqqmmdddccccc
abcccccccccccccaaaaaaccccaaaaaaaaaccaaaacccccccccccccccccaacccccccccccccccccccccccaaaccccaaaaaaahhhhhmmmmssswwwwwrrrrrrrrmmmmddccccc
abcccccccccccccaaaaaaccccaaaaaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccaaaaaacccccaaaaachhhhhmmmmsswwwwrrrrrrrrrkkmdddccccc
abccccccccccccccaaaaaccccccaaaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccaaaaaaccccaaaaacccchhggmmmssswwrrrrrkkkkkkkkdddacccc
abccaaaacccccccaaaaacccccccccaaaaaacaaaaacccccccccccccccccccccccccccccccccccccccaaaaaaccccaacaaaccccggggmmsssssrrlkkkkkkkkkdddaccccc
abccaaaacccccccaaaaacccccccccaaaaaaccccaacccccccccccccccccccccccccccccccccccccccaaaaaccccccccaaccccccgggmllssssrllkkkkkkkeeeddaccccc
abccaaaacccccccaaacccccccccccaaaaaacccccccccccccccccccaacccccccccccccccccccccccaaaaaacccccccccccccccccggllllssslllkkeeeeeeeeeaaacccc
abcccaaccccccccaaacaaaccccccaaaaaaaaaaacccccccccccccaaaaaacccccccccccccccccccccaaacaaacccccaacccccccccggglllllllllfeeeeeeeeaaaaacccc
abccccccccccaaaaaaaaaaccccccccccccaccaaaccacccccccccaaaaaaccccaaccaacccaaccccccaaaaaaacccccaaccccccccccggglllllllfffeeecccaaaaaacccc
abccccccccccaaaaaaaaacccccccccccccccaaaaaaaccccccccccaaaaaccccaaaaaacccaaaaaaccaaaaaacccaaaaaaaacccccccggggllllfffffccccccaacccccccc
abcccccccccccaaaaaaacccccccccccccccccaaaaaaccaacccccaaaaaccccccaaaaacccaaaaaacaaaaaaacccaaaaaaaaccccccccgggffffffffccccccccccccccccc
abccccccccccccaaaaaaacccccccccccccaaaaaaaaacaaaaccccaaaaacaaaaaaaaaacaaaaaaacaaaaaaaaaccccaaaacccccccccccggffffffacccccccccccccccaaa
abccccccccccccaaaaaaacaaccccccccccaaaaaaaaacaaaacccccaaaaaaaaaaaaaaaaaaaaaaacaaaaaaaaaacccaaaaacccccccccccaffffaaaaccccccccccccccaaa
abccccccccccccaaacaaaaaacccccccccccaaaaaaaacaaaaaaaaaaaaaaaaaaaaaaaaacaaaaaaacccaaacaaaccaaaaaacccccccccccccccccaaaccccccccccccccaaa
abccccccccccccaaccaaaaaccccccccccccccaaaaaaaccccaaaaaaaaaaaaccccaacccccaaaaaacccaaaccccccaaccaacccccccccccccccccaaacccccccccccaaaaaa
abcccccccccccccccaaaaaaaaccccccccccccaacccacccccccaaaaaaaaaaccccaacccccaaccccccccaccccccccccccccccccccccccccccccccccccccccccccaaaaaa
`;
let letterMap = input.trim().split('\n').map(l => l.split(''));

let height = letterMap.length;
let width = letterMap[0].length;
let start: number[] = [], end: number[] = [];
let directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];

for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
        if (letterMap[j][i] == 'S') start = [i, j];
        if (letterMap[j][i] == 'E') end = [i, j];
    }
}

function letterToVal(letter: string): number {
    if (letter == 'S') return 0;
    if (letter == 'E') return 25;
    return letter.charCodeAt(0) - 'a'.charCodeAt(0);
}
let numberMap = letterMap.map(l => l.map(s => letterToVal(s)));

function h(point: string) {
    let [x, y] = point.split(',').map(Number);
    let dist = Math.abs(x - end[0]) + Math.abs(y - end[1]);
    let height = 25 - numberMap[y][x];
    return Math.max(dist, height);
}

async function countSteps(cameFrom: Map<string, string>, current: string) {
    let steps = 0;
    canvas.colorEnd();
    while (cameFrom.has(current)) {
        let [x, y] = current.split(',').map(Number);
        await canvas.colorPath(x, y);
        current = cameFrom.get(current)!;
        steps++;
        canvas.colorEnd();
        canvas.answerCount(steps);
    }
    return steps;
}

class Canvas {
    ctx: CanvasRenderingContext2D;
    ans: HTMLElement;

    constructor(){
        const c = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = c.getContext("2d")!;
        this.ans = document.getElementById("answer")!;
        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
                let num = 230 - (numberMap[j][i] * 7);
                this.ctx.fillStyle = `rgb(${num},${num},${num})`;
                this.ctx.fillRect((i * 10) + 20, (j * 10) + 20, 9, 9);
            }
        }
        this.colorStart();
        this.colorEnd();
    }

    colorStart() {
        this.ctx.fillStyle = `rgb(0,255,0)`;
        this.ctx.fillRect((start[0] * 10) + 20, (start[1] * 10) + 20, 9, 9);
    }

    colorEnd() {
        this.ctx.fillStyle = `rgb(255,0,0)`;
        this.ctx.fillRect((end[0] * 10) + 20, (end[1] * 10) + 20, 9, 9);
    }

    async colorPoint(x: number, y: number) {
        this.ctx.fillStyle = `rgba(0,0,255,0.5)`;
        this.ctx.fillRect((x * 10) + 20, (y * 10) + 20, 9, 9);
        await canvas.sleep(1);
    }

    async colorPath(x: number, y: number) {
        this.ctx.fillStyle = `rgb(255,223,0)`;
        this.ctx.fillRect((x * 10) + 20, (y * 10) + 20, 9, 9);
        await canvas.sleep(10);
    }

    answerCount(num: number) {
        this.ans.innerHTML = `&ensp;&ensp;&ensp;<b>Total steps:</b> ${num}`;
    }

    sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
}
let canvas = new Canvas();

// Run A* path finding
async function aStar(): Promise<number> {
    await canvas.sleep(1000);
    let startKey = start.join(',');
    let endKey = end.join(',');
    let openSet = new Set<string>([startKey]);
    let cameFrom = new Map<string, string>();
    let gScore = new Map<string, number>([[startKey, 0]]);
    let fScore = new Map<string, number>([[startKey, h(startKey)]]);
    while (openSet) {
        let current = [...openSet][0];
        let currScore = fScore.get(current) ?? Infinity;
        for (const item of openSet) {
            let newScore = fScore.get(item) ?? Infinity;
            if (newScore < currScore) {
                current = item;
                currScore = newScore;
            }
        }
        if (current == endKey) return countSteps(cameFrom, current);
        openSet.delete(current);

        for (const dir of directions) {
            let currentArr = current.split(",").map(Number);
            let neighborArr = currentArr.map((a, i) => a + dir[i]);
            if (neighborArr[0] < 0 || width <= neighborArr[0]) continue;
            if (neighborArr[1] < 0 || height <= neighborArr[1]) continue;
            if (numberMap[currentArr[1]][currentArr[0]] < numberMap[neighborArr[1]][neighborArr[0]] - 1) continue;

            let neighbor = neighborArr.join(',');
            let tentative_gScore = (gScore.get(current) ?? Infinity) + 1;
            if (tentative_gScore < (gScore.get(neighbor) ?? Infinity)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentative_gScore);
                fScore.set(neighbor, tentative_gScore + h(neighbor));
                openSet.add(neighbor);
                await canvas.colorPoint(neighborArr[0],neighborArr[1]);
            }
        }
    }
    return -1;
}

console.log('Answer:', aStar());