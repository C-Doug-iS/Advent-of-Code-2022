import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8');

let [stackInput, instructions] = input.split('\n\n')

const levels = stackInput.split('\n').slice(0,-1).map(level => level.split('').map((e, index) => {
    if((index - 1) % 4 !== 0) return null
    return e
}).filter(e => e !== null).map(e => {
    if(e == ' ') return null
    return e
}))

const firstProblemStacks = []

for(const level of levels){
    for(const [index, item] of level.entries()){
        if(!firstProblemStacks[index]) firstProblemStacks[index] = []
        if(item) firstProblemStacks[index].unshift(item)
    }
}

const secondProblemStacks = JSON.parse(JSON.stringify(firstProblemStacks))

instructions = instructions.split('\n').map(i => i.split(' ').filter(e => !isNaN(e)).map(Number))

for(const [quantity, from, to] of instructions){
    const firstProblemToMove = firstProblemStacks[from - 1].splice(firstProblemStacks[from - 1].length - quantity, quantity).reverse()
    firstProblemStacks[to - 1] = firstProblemStacks[to - 1].concat(firstProblemToMove)

    const secondProblemToMove = secondProblemStacks[from - 1].splice(secondProblemStacks[from - 1].length - quantity, quantity)
    secondProblemStacks[to - 1] = secondProblemStacks[to - 1].concat(secondProblemToMove)
}

let firstPuzzleSolution = "";
let secondPuzzleSolution = "";

for(const stack of firstProblemStacks){
    firstPuzzleSolution += stack[stack.length - 1]
}
for(const stack of secondProblemStacks){
    secondPuzzleSolution += stack[stack.length - 1]
}

console.log(firstPuzzleSolution)
console.log(secondPuzzleSolution)