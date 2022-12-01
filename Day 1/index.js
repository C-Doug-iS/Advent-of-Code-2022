import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8');

//Split input into elves and total their calories
let elves = input.split('\n\n')
    .map(e => e.split('\n')
    .map(Number))
    .map(e => e.reduce((acc, curr) => acc + curr))

const firstPuzzleSolution = Math.max(...elves)

const topThree = elves.sort((a, b) => b - a).slice(0, 3);

const secondPuzzleSolution = topThree.reduce((acc, curr) => acc + curr)

console.log(firstPuzzleSolution)
console.log(secondPuzzleSolution)