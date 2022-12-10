import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8').split('\n');

const tickValues = [{ start: 1, end: 1 }]

for (const [instruction, value] of input.map(line => line.split(' '))) {
    const currentValue = tickValues[tickValues.length - 1].end
    if (instruction == 'noop') {
        tickValues.push({ start: currentValue, end: currentValue })
    } else {
        tickValues.push({ start: currentValue, end: currentValue }, { start: currentValue, end: currentValue + Number(value) })
    }
}

function partOneSolve(array, startingIndex = 0, delta = 1, max) {
    let counter = 0;
    for (let i = startingIndex; i <= max ?? array.length; i += delta) {
        counter += (array[i].start * i);
    }
    return counter
}

function partTwoSolve(array) {
    let output = '';
    for (let i = 1; i < array.length; i++) {
        const linePosition = (i - 1) % 40;
        const { start: during } = array[i];

        if(Math.abs(during - linePosition) > 1) output += '.'
        else output += '#'
        if(linePosition == 39) output += '\n'
    }
    return output;
}

const firstPuzzleSolution = partOneSolve(tickValues, 20, 40, 220)
const secondPuzzleSolution = partTwoSolve(tickValues)

console.log(firstPuzzleSolution)
console.log(secondPuzzleSolution)