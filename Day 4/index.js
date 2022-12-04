import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8');

const pairs = input.split('\n')
    .map(p => p.split(',')
        .map(r => extendRange(...r.split('-').map(Number))
            ))

function extendRange(start, end){
    return [...Array((end - start) + 1).keys()].map(e => e + start)
}

let firstPuzzleSolution = 0;
let secondPuzzleSolution = 0;

for(const pair of pairs){
    const shorter = pair[0].length <= pair[1].length ? pair[0] : pair[1];
    const longer = shorter.length == pair[0].length ? pair[1] : pair[0];

    if(shorter.every(num => longer.includes(num))) firstPuzzleSolution += 1;
    if(shorter.some(num => longer.includes(num))) secondPuzzleSolution += 1;
}

console.log(firstPuzzleSolution)
console.log(secondPuzzleSolution)