import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8').split('\n\n');

let limiter;

class Monkey {
    constructor(items, operation, divisor, actions){
        this.items = items;
        this.operation = operation;
        this.divisor = divisor;
        this.actions = actions;
        this.inspectedCount = 0
    }
    inspectItemPartOne(item){
        const result = Math.floor(eval(this.operation) / 3)
        const destination = this.actions[+!!(result % this.divisor)]
        this.inspectedCount++;
        this.throwItem(item, result, destination, partOneMonkeys)
    }
    throwItem(item, result, destination, monkeys){
        const index = this.items.indexOf(item)
        if(index !== -1){
            this.items.splice(index, 1)
        }
        monkeys[destination].items.push(result)
    }
    inspectItemPartTwo(item){
        this.inspectedCount++;
        const result = eval(this.operation) % limiter;
        const destination = this.actions[+!!(result % this.divisor)]
        this.throwItem(item, result, destination, partTwoMonkeys)
    }
}

const partOneMonkeys = parseInput(input)
const partTwoMonkeys = parseInput(input)

function parseInput(input) {
    const monkeys = [];
    let internalLimiter = 1
    for(const monkey of input.map(line => line.split('\n').map(line => line.trim()))){
        const items = monkey[1].split(': ')[1].split(', ').map(Number)
        const operation = monkey[2].split(': ')[1]
            .replace('new = ', '')
            .replace(/old/g, 'item')
        const divisor = Number(monkey[3].split('by ')[1])
        const actions = [monkey[4].split('monkey ')[1], monkey[5].split('monkey ')[1]].map(Number)
        monkeys.push(new Monkey(items, operation, divisor, actions))
        internalLimiter *= divisor;
    }
    limiter = internalLimiter;
    return monkeys;
}

function simulateRoundsPtOne(roundCount){
    const rounds = [];
    for(let i = 0; i < roundCount; i++){
        rounds.push([])
        for(const currMonkey of partOneMonkeys){
            const copyOfItems = JSON.parse(JSON.stringify(currMonkey.items))
            for(const item of copyOfItems){
                currMonkey.inspectItemPartOne(item)
            }
        }
        for(const endOfRoundMonkey of partOneMonkeys){
            rounds[rounds.length - 1].push({items: endOfRoundMonkey.items, inspectedCount: endOfRoundMonkey.inspectedCount})
        }
    }
    return rounds;
}

function simulateRoundsPtTwo(roundCount){
    const rounds = [];
    for(let i = 0; i < roundCount; i++){
        rounds.push([])
        for(const currMonkey of partTwoMonkeys){
            const copyOfItems = JSON.parse(JSON.stringify(currMonkey.items))
            for(const item of copyOfItems){
                currMonkey.inspectItemPartTwo(item)
            }
        }
        for(const endOfRoundMonkey of partTwoMonkeys){
            rounds[rounds.length - 1].push({items: endOfRoundMonkey.items, inspectedCount: endOfRoundMonkey.inspectedCount})
        }
    }
    return rounds;
}

const partOneRounds = simulateRoundsPtOne(20)

partOneRounds[partOneRounds.length - 1].sort((a, b) => b.inspectedCount - a.inspectedCount)

const partTwoRounds = simulateRoundsPtTwo(10000)

partTwoRounds[partTwoRounds.length - 1].sort((a, b) => b.inspectedCount - a.inspectedCount)

const firstPuzzleSolution = partOneRounds[partOneRounds.length - 1][0].inspectedCount * partOneRounds[partOneRounds.length - 1][1].inspectedCount
const secondPuzzleSolution = partTwoRounds[partTwoRounds.length - 1][0].inspectedCount * partTwoRounds[partTwoRounds.length - 1][1].inspectedCount

console.log(firstPuzzleSolution)
console.log(secondPuzzleSolution)