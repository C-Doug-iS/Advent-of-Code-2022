import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8');

const rucksacks = input.split('\n')

const commonItems = rucksacks.map(r => {
    const firstCompartment = r.slice(0, r.length / 2).split('')
    const secondCompartment = r.slice(r.length / 2).split('')
    return getCharPoints(firstCompartment.filter(e => secondCompartment.includes(e))[0])
})

const firstPuzzleSolution = commonItems.reduce((acc, curr) => acc + curr)

function getCharPoints(char) {
    if(char === char.toUpperCase()){
        return Number(char.charCodeAt(0) - 38)
    } else {
        return Number(char.charCodeAt(0) - 96)
    }
}

const groups = []

for (let i = 0; i < rucksacks.length; i += 3) {
    groups.push(rucksacks.slice(i, i + 3).map(r => r.split('')))
}

const badges = groups.map(g => {
    return getCharPoints(g[0].filter(r => g[1].includes(r) && g[2].includes(r))[0])
})

const secondPuzzleSolution = badges.reduce((acc, curr) => acc + curr)

console.log(firstPuzzleSolution)
console.log(secondPuzzleSolution)