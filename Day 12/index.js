import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8').split('\n').map(line => line.split(''));

function findPos(array, symbol) {
    const string = array.toString().replace(/,/g, '');
    const pos = string.indexOf(symbol)
  
    const d = (array[0] || []).length
  
    const x = pos % d;
    const y = Math.floor(pos / d)
  
    return [x, y]
}

const startPos = findPos(input, "S")
const endPos = findPos(input, "E")

const maxX = input[0].length - 1
const maxY = input.length - 1

function isSafe(current, toCheck, visited, reverse = false){
    const visitedCheck = reverse ? current : toCheck
    const coordCheck = reverse ? current : toCheck
    if(visited.map(JSON.stringify).includes(JSON.stringify(visitedCheck))) return false;
    const [checkX, checkY] = coordCheck
    if(checkX < 0 || checkX > maxX) return false;
    if(checkY < 0 || checkY > maxY) return false;
    const currChar = getChar(current) == "S" ? "a" : getChar(current) == "E" ? "z" : getChar(current)
    const checkChar = getChar(toCheck) == "E" ? "z" : getChar(toCheck) == "S" ? "a" : getChar(toCheck)
    const currentCharCode = currChar.charCodeAt(0)
    const toCheckCharCode = checkChar.charCodeAt(0)
    if(currentCharCode - toCheckCharCode >= -1){
        return true
    }
    return false;
}

function bfsShortestPath(currentPos, visited, desiredEnd, reverse = false){
    const queue = [];
    queue.push([currentPos, 0]);
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    while(queue.length !== 0){
        const [[x, y], distance] = queue.shift();
        if(input[y][x] == desiredEnd) return distance;

        for(const direction of directions){
            const [dx, dy] = direction;
            const newPos = [x + dx, y + dy]
            const args = !reverse ? [[x, y], newPos, visited] : [newPos, [x, y], visited, reverse]
            if(isSafe(...args)){
                queue.push([newPos, distance + 1])
                visited.push(newPos)
            }
        }
    }
}

function getChar(coordinates){
    const [x, y] = coordinates;
    return input[y][x]
}

const firstPuzzleSolution = bfsShortestPath(startPos, [], "E")

const secondPuzzleSolution = bfsShortestPath(endPos, [endPos], 'a', true)

console.log(firstPuzzleSolution)

console.log(secondPuzzleSolution)