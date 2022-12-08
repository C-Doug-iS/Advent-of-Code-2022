import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8').split('\n').map(row => row.split('').map(Number));

const perimeter = (2 * input.length) + (2 * input[0].length) - 4

let interiorVisibleTrees = 0;
const visibilityScores = [];

for(let i = 1; i < input[0].length - 1; i++){
    for(let j = 1; j < input.length - 1; j++){
        if(checkVisibility(i, j)) interiorVisibleTrees++
        visibilityScores.push(getVisibilityScore(i, j));
    }
}

function checkVisibility(i, j){
    const tree = input[i][j];
    const [left, right, up, down] = getTreesInLine(i, j);
    if(Math.max(...left) < tree) return true;
    if(Math.max(...right) < tree) return true;
    if(Math.max(...up) < tree) return true;
    if(Math.max(...down) < tree) return true;
    return false;
}

function getVisibilityScore(i, j){
    const tree = input[i][j];
    let [left, right, up, down] = getTreesInLine(i, j);
    left = left.reverse();
    up = up.reverse();
    const results = [left, right, up, down].map(dir => {
        let visibilityCount = 0;
        for(const toCheck of dir){
            visibilityCount++;
            if(toCheck >= tree) break;
        }
        return visibilityCount;
    })
    return results.reduce((a, b) => a * b)
}

function getTreesInLine(i, j){
    const left = input[i].slice(0, j)
    const right = input[i].slice(j + 1)
    const column = input.map(row => row[j])
    const up = column.slice(0, i)
    const down = column.slice(i + 1)
    return [left, right, up, down]
}

const firstPuzzleSolution = perimeter + interiorVisibleTrees;
const secondPuzzleSolution = Math.max(...visibilityScores);

console.log(firstPuzzleSolution)
console.log(secondPuzzleSolution)

console.log(Math.pow((input.length - 1) / 2, 2) * Math.pow((input[0].length - 1) / 2, 2))