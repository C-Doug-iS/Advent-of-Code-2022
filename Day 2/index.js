import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8');

const dict = {
    X: 1,
    Y: 2,
    Z: 3,
    A: 1,
    B: 2,
    C: 3
}

const rounds = input.split('\n').map(r => r.split(' '))

const firstScores = rounds.map(r => {
    const [ oppChoice, myChoice ] = r.map(choice => dict[choice]);
    if(oppChoice == myChoice) return myChoice + 3;
    if(oppChoice > myChoice){
        if(myChoice !== 1) return myChoice + 0;
        if(oppChoice == 3 && myChoice == 1) return myChoice + 6;
        else return myChoice + 0;
    }
    if(myChoice > oppChoice){
        if(oppChoice !== 1) return myChoice + 6;
        if(myChoice == 3 && oppChoice == 1) return myChoice + 0;
        else return myChoice + 6;
    }
})

const firstPuzzleSolution = firstScores.reduce((acc, curr) => acc + curr)

console.log(firstPuzzleSolution)

const resultDict = {
    X: 0,
    Y: 3,
    Z: 6
}

const secondScores = rounds.map(r => {
    const oppChoice = dict[r[0]];
    const condition = resultDict[r[1]];

    if(condition == 3) return condition + oppChoice;
    if(condition == 6) {
        if(oppChoice == 3) return condition + 1
        else return condition + oppChoice + 1
    }
    if(condition == 0) {
        if(oppChoice == 1) return condition + 3
        else return condition + oppChoice - 1
    }
})

const secondPuzzleSolution = secondScores.reduce((acc, curr) => acc + curr)

console.log(secondPuzzleSolution)