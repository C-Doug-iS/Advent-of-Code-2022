import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8');

const pairs = input.split('\n')
    .map(p => p.split(',')
        .map(r => r.split('-').map(Number))
    )

let firstPuzzleSolution = 0;
let secondPuzzleSolution = 0;

for(const pair of pairs){
    const [firstLow, firstHigh] = pair[0]
    const [secondLow, secondHigh] = pair[1]

    if(firstLow > secondHigh || firstHigh < secondLow) continue;

    if((firstLow <= secondLow && secondHigh <= firstHigh) || (firstLow >= secondLow && secondHigh >= firstHigh)) firstPuzzleSolution += 1;

    secondPuzzleSolution += 1;
}

console.log(firstPuzzleSolution)
console.log(secondPuzzleSolution)