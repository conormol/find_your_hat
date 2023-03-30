const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
    }    
    get field() {
        return this._field;
    }
    print() {
        for(let i=0; i<this._field.length; i++) {
            console.log((this._field[i]).join(''));
        }    
    }
    static generateField(width, height) {
        let yArrays = [];
        let fieldElement;
        for (let fieldHeight = 0; fieldHeight<height; fieldHeight++) {
            let xArrays = [];
            xArrays.push(" ") 
            for (let fieldWidth = 0; fieldWidth<width; fieldWidth++) {               
                let fieldSelector = Math.floor(Math.random()*8);
                if (fieldSelector === 1) {
                    fieldElement = 'O';
                } else {
                    fieldElement = '░'
                }
                xArrays.push(fieldElement);                                              
            }   
             
            yArrays.push(xArrays);     
        } 
        yArrays[0][1] = pathCharacter; 
        const hatX = (width/2)+(Math.floor(Math.random()*width/2));
        const hatY = (height/2)+(Math.floor(Math.random()*height/2));
        yArrays[hatY-1][hatX-1] = hat;
        return yArrays;                                                              
    }     
}

const myField = new Field(Field.generateField(20, 10));

let inHole = false;
let foundHat = false;
let outOfBounds = false;
let endGame = false;
myField.print();

findUser = () => {
    for (let yIndexUser=0; yIndexUser<myField.field.length; yIndexUser++) {
         xIndexUser = myField.field[yIndexUser].indexOf(pathCharacter);  
         userPosition = [xIndexUser, yIndexUser];   
         if (xIndexUser != -1) {
             return userPosition;
         }            
    }    
}

findHat = () => {
    for (let yIndexHat=0; yIndexHat<myField.field.length; yIndexHat++) {
         xIndexHat = myField.field[yIndexHat].indexOf(hat);  
         hatPosition = [xIndexHat, yIndexHat];   
         if (xIndexHat != -1) {
             return hatPosition;
         }            
    }    
}

setUserPosition = (x, y) => { 
    findUser();    
    myField.field[userPosition[1]][userPosition[0]] = " ";    
    if (myField.field[y][x] === 'O') {
        inHole = true;
        myField.print();
    } else if (myField.field[y][x] === '^') {
        foundHat = true;
        myField.field[y][x] = pathCharacter;
        myField.print();
    } else if (myField.field[y].length === x || x === 0) {        
        outOfBounds = true;
        console.log(userPosition[0]);
        myField.field[y][x] = pathCharacter;
        myField.print();
    } else {
        myField.field[y][x] = pathCharacter;
        myField.print();
        findUser();
    };
    console.log(x);
    console.log(outOfBounds);
    if (inHole === true || foundHat === true || outOfBounds === true){
        endGame = true;
    } 
}

userRight = () => {
    findUser();
    userPosition[0] += 1;
    setUserPosition(userPosition[0], userPosition[1]);
}

userLeft = () => {
    findUser();
    userPosition[0] -= 1;
    setUserPosition(userPosition[0], userPosition[1]);
}

userDown = () => {
    findUser();
    userPosition[1] += 1;
    setUserPosition(userPosition[0], userPosition[1]);
}

userUp = () => {
    findUser();
    userPosition[1] -= 1;
    setUserPosition(userPosition[0], userPosition[1]);
}

play = () => {
    findUser();
    findHat();
    while (endGame === false) {
      let input = prompt("Your move: ");    
        if (input === 'd') {
            userRight();
         } else if (input === 's') {
            userDown();
        } else if (input === 'a') {
            userLeft();
        } else if (input === 'w') {
            userUp();
        }   
    }
    if (inHole === true) {
        console.log("You fell down a hole!")
    } else if (foundHat === true) {
        console.log ("You found your hat!")
    } else if (outOfBounds === true) (
        console.log("You left the field!")
    )
}


play();
