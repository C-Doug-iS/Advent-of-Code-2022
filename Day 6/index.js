import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8');

function findMarkerIndex(str, length) {
    for(let i = 0; i < str.length; i++){
        const substr = input.substring(i, i + length)
        if([...new Set(substr)].length == length) {
            return i + length
        }
    }
}

const firstPuzzleSolution = findMarkerIndex(input, 4)

const secondPuzzleSolution = findMarkerIndex(input, 14)

console.log(firstPuzzleSolution)
console.log(secondPuzzleSolution)