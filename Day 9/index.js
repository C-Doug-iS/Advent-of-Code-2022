import { readFileSync } from 'fs';

//Get input from file
const input = readFileSync('./input.txt', 'utf8').split('\n');

class Head {
    constructor() {
        this.position = [0, 0];
    }
    U() {
        this.position = [this.position[0], this.position[1] + 1]
    }
    D() {
        this.position = [this.position[0], this.position[1] - 1]
    }
    L() {
        this.position = [this.position[0] - 1, this.position[1]]
    }
    R() {
        this.position = [this.position[0] + 1, this.position[1]]
    }
}

class Tail extends Head {
    constructor(head) {
        super();
        this.previousPoints = [[0, 0]];
        this.head = head;
        this.nextLink = null;
    }
    checkPreviousPoints() {
        const pointAsString = JSON.stringify(this.position)

        if(!this.previousPoints.some(oldPoint => JSON.stringify(oldPoint) === pointAsString)){
            this.previousPoints.push(JSON.parse(pointAsString))
        }
    }
    checkForNewTail(){
        if(allTails.length == 9) return;
        if(this.nextLink) return this.nextLink.checkForNewTail();
        if(this.position[0] !== 0 && this.position[1] !== 0){
            this.nextLink = new Tail(this)
            allTails.push(this.nextLink)
        }
    }
    checkForNeededMove(){
        const headPosition = this.head.position;
        const xDiff = headPosition[0] - this.position[0];
        const yDiff = headPosition[1] - this.position[1];
        if(Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) return;
        if(Math.abs(xDiff) > 1 && yDiff == 0){
            //X-axis move needed
            if(xDiff > 0) this.R();
            else this.L();
        } else if(Math.abs(yDiff) > 1 && xDiff == 0) {
            //Y-axis move needed
            if(yDiff > 0) this.U();
            else this.D();
        } else {
            //Diagonal move needed
            this.position = [this.position[0] + Math.sign(xDiff), this.position[1] + Math.sign(yDiff)]
        }
        this.checkPreviousPoints();
        this.checkForNewTail();
        if(this.nextLink) this.nextLink.checkForNeededMove();
    }
}

const ropeHead = new Head();
const ropeTail = new Tail(ropeHead);
const allTails = [ropeTail];

for(const [direction, amount] of input.map(line => line.split(' '))){
    for(let i = 0; i < Number(amount); i++){
        ropeHead[direction]();
        ropeTail.checkForNeededMove();
    }
}

const firstPuzzleSolution = ropeTail.previousPoints.length
const secondPuzzleSolution = allTails[8].previousPoints.length

console.log(firstPuzzleSolution)
console.log(secondPuzzleSolution)