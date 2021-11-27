/*

    0|1|2
    3|4|5
    6|7|8

*/
class Board {

    constructor() {
        this.game_board = ['','','','','','','','','']
        this.winner;
    }


    move(player, position) {
        if (this.isTaken(position)) {
            return 'Invalid move'
        }
        if(player === 'x') {
            this.game_board[position] = 'x'
        } else {
            this.game_board[position] = 'o'
        }
    }
    isTaken(position) {
        if(this.game_board[position] !== '') {
            return true
        } else {
            return false
        }
    }
    checkForWinner(){
        // check rows
        if(this.game_board[0] === 'x' && this.game_board[1] === 'x' && this.game_board[2] === 'x') {
            return 'x'
        } else if(this.game_board[3] === 'x' && this.game_board[4] === 'x' && this.game_board[5] === 'x') {
            return 'x'
        } else if(this.game_board[6] === 'x' && this.game_board[7] === 'x' && this.game_board[8] === 'x') {
            return 'x'
        }

        if(this.game_board[0] === 'o' && this.game_board[1] === 'o' && this.game_board[2] === 'o') {
            return 'o'
        } else if(this.game_board[3] === 'o' && this.game_board[4] === 'o' && this.game_board[5] === 'o') {
            return 'o'
        } else if(this.game_board[6] === 'o' && this.game_board[7] === 'o' && this.game_board[8] === 'o') {
            return 'o'
        }

        //check columns
        if(this.game_board[0] === 'x' && this.game_board[3] === 'x' && this.game_board[6] === 'x') {
            return 'x'
        } else if(this.game_board[1] === 'x' && this.game_board[4] === 'x' && this.game_board[7] === 'x') {
            return 'x'
        } else if(this.game_board[2] === 'x' && this.game_board[5] === 'x' && this.game_board[8] === 'x') {
            return 'x'
        }

        if(this.game_board[0] === 'o' && this.game_board[3] === 'o' && this.game_board[6] === 'o') {
            return 'o'
        } else if(this.game_board[1] === 'o' && this.game_board[4] === 'o' && this.game_board[7] === 'o') {
            return 'o'
        } else if(this.game_board[2] === 'o' && this.game_board[5] === 'o' && this.game_board[8] === 'o') {
            return 'o'
        }

        // check diagnals
        if(this.game_board[0] === 'x' && this.game_board[4] === 'x' && this.game_board[8] === 'x') {
            return 'x'
        } else if(this.game_board[2] === 'x' && this.game_board[4] === 'x' && this.game_board[6] === 'x') {
            return 'x'
        }

        if(this.game_board[0] === 'o' && this.game_board[4] === 'o' && this.game_board[8] === 'o') {
            return 'o'
        } else if(this.game_board[2] === 'o' && this.game_board[4] === 'o' && this.game_board[6] === 'o') {
            return 'o'
        }
        
    }
}

const game = new Board()
const boardDiv = document.querySelector(".board")
const playerOneDiv = document.querySelector(".playerone")
const playerTwoDiv = document.querySelector(".playertwo")

boardDiv.addEventListener('click', addToBoard)
let player1Turn = true

function addToBoard(event) {
    const imgTag = document.createElement("img")
    const position = parseInt(event.target.dataset.position)

    if(!game.isTaken(position)) {
        if(player1Turn) {
            imgTag.src = "images/x-mark.svg"
            imgTag.classList.add("filter-1")
            game.move('x', position)
            playerTwoDiv.style.borderColor = "aquamarine"
            playerOneDiv.style.borderColor = "black"
            player1Turn = false
        } else {
            imgTag.src = "images/circle.svg"
            imgTag.classList.add("filter-2")
            game.move('o', position)
            playerOneDiv.style.borderColor = "aquamarine"
            playerTwoDiv.style.borderColor = "black"
            player1Turn = true
        }

        event.target.appendChild(imgTag)
    }
    displayWinner()
}

function displayWinner() {
    if (game.checkForWinner() === 'x') {
        console.log("X is the winner")
    } else if(game.checkForWinner() === 'o') {
        console.log("O is the winner")
    }
}