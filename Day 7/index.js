import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8').split('\n');

class Directory {
    constructor(directoryName) {
        this.name = directoryName;
        this.parent = null;
        this.subdirectories = new Map();
        this.sumOfFiles = 0;
    }
}

const root = new Directory('/')

let current = root;

for (const line of input) {
    const data = line.split(' ')
    if(data[0] == '$'){
        if(data[1] == 'cd'){
            if(data[2] == '/') current = root;
            else if(data[2] == '..') current = current.parent;
            else current = current.subdirectories.get(data[2])
        }
    } else {
        if(data[0] == 'dir'){
            const child = new Directory(data[1])
            child.parent = current;
            current.subdirectories.set(data[1], child)
        } else {
            current.sumOfFiles += Number(data[0])
        }
    }
}

const directorySizes = {};

function getSizes(directory){
    const key = directory.parent ? `${directory.parent.name}-${directory.name}` : `root-/`
    if(directory.subdirectories.size == 0){
        directorySizes[key] = directory.sumOfFiles;
    } else {
        directorySizes[key] = directory.sumOfFiles + Array.from(directory.subdirectories.values()).map(dir => getSizes(dir, directorySizes)).reduce((acc, curr) => acc + curr)
    }
    return directorySizes[key];
}

getSizes(root, directorySizes);

const firstPuzzleSolution = Object.values(directorySizes).filter(size => size <= 100_000).reduce((acc, curr) => acc + curr);

const totalSpace = 70_000_000;
const neededSpace = 30_000_000;
const currentSpace = totalSpace - directorySizes['root-/'];
const toFree = neededSpace - currentSpace;

const secondPuzzleSolution = Object.values(directorySizes).filter(size => size > toFree).sort((a,b) => a - b)[0]

console.log(firstPuzzleSolution)
console.log(secondPuzzleSolution)