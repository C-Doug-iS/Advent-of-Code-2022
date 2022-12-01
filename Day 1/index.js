import {readFileSync} from 'fs';

const input = readFileSync('./input.txt',{encoding:'utf8', flag:'r'});

let elves = input.split('\n\n')

elves = elves.map(e => e.split('\n'))

elves = elves.map(e => e.reduce((acc, curr) => (Number(acc) || 0) + (Number(curr) || 0)))

const firstPuzzleSolution = Math.max(...elves)

let topThreeCombined = firstPuzzleSolution;

for(let i = 1; i < 3; i++){
    elves = elves.filter(e => e != Math.max(...elves))
    topThreeCombined += Math.max(...elves)
}

console.log(firstPuzzleSolution)
console.log(topThreeCombined)