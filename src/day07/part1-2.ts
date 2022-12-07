import { readFileSync } from 'fs';

let input = readFileSync(__dirname + '/input.txt', 'utf-8');
let vals = input.trim().split('\n');

interface FileSystemObj {
    type: "dir" | "file";
    getSize(): number;
}

class Directory implements FileSystemObj {
    contains: Map<string, FileSystemObj>;
    type: "dir";

    constructor() {
        this.contains = new Map<string, FileSystemObj>();
        this.type = "dir";
    }

    add(path: string[], name: string, obj: FileSystemObj) {
        let dirName = path.shift();
        if (dirName == undefined) {
            this.contains.set(name, obj);
        } else {
            (this.contains.get(dirName) as Directory).add(path, name, obj);
        }
    }

    getSize() {
        let totalSize = 0;
        for (const obj of this.contains.values()) {
            totalSize += obj.getSize();
        }
        return totalSize;
    }

    getSubDirectories(): FileSystemObj[] {
        let subDir: FileSystemObj[] = [];
        for (const obj of this.contains.values()) {
            if (obj.type == 'dir') {
                let dir = obj as Directory;
                subDir.push(dir);
                subDir.push(...dir.getSubDirectories())
            }
        }
        return subDir;
    }
}

class File implements FileSystemObj {
    type: "file";
    size: number;

    constructor(size: number) {
        this.type = "file";
        this.size = size;
    }

    getSize() {
        return this.size;
    }
}

let currDir: string[] = [];
let root = new Directory();
for (const l of vals) {
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
    } else if (line[0] == 'dir') {
        root.add(currDir.slice(), line[1], new Directory());
    } else {
        root.add(currDir.slice(), line[1], new File(parseInt(line[0])));
    }
}

let directories: Directory[] = root.getSubDirectories().filter(o => o.type == 'dir') as Directory[];
console.log('Part 1:', directories.reduce((a, b) => a + (b.getSize() <= 100000 ? b.getSize() : 0), 0));

let free = 70000000 - root.getSize();
let toFind = 30000000 - free;
let candidateSize = root.getSize();
for (const dir of directories) {
    let size = dir.getSize();
    if (size > toFind && size < candidateSize) candidateSize = size;
}
console.log('Part 2:', candidateSize);