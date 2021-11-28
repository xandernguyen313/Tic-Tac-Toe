/*

    0|1|2
    3|4|5
    6|7|8

*/
class Board {

    constructor() {
        this.game_board = ['','','','','','','','','']
        this.p1WinCount = 0
        this.p2WinCount = 0
        this.winpositions;
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
            this.winpositions = [0,1,2]
            this.winner = 'x'
            
        } else if(this.game_board[3] === 'x' && this.game_board[4] === 'x' && this.game_board[5] === 'x') {
            this.winpositions = [0,3,5]
            this.winner = 'x'

        } else if(this.game_board[6] === 'x' && this.game_board[7] === 'x' && this.game_board[8] === 'x') {
            this.winpositions = [6,7,8]
            this.winner = 'x'
        }

        if(this.game_board[0] === 'o' && this.game_board[1] === 'o' && this.game_board[2] === 'o') {
            this.winpositions = [0,1,2]
            this.winner = 'o'
        } else if(this.game_board[3] === 'o' && this.game_board[4] === 'o' && this.game_board[5] === 'o') {
            this.winpositions = [0,3,5]
            this.winner = 'o'
        } else if(this.game_board[6] === 'o' && this.game_board[7] === 'o' && this.game_board[8] === 'o') {
            this.winpositions = [6,7,8]
            this.winner = 'o'
        }

        //check columns
        if(this.game_board[0] === 'x' && this.game_board[3] === 'x' && this.game_board[6] === 'x') {
            this.winpositions = [0,3,6]
            this.winner = 'x'
        } else if(this.game_board[1] === 'x' && this.game_board[4] === 'x' && this.game_board[7] === 'x') {
            this.winpositions = [1,4,7]
            this.winner = 'x'
        } else if(this.game_board[2] === 'x' && this.game_board[5] === 'x' && this.game_board[8] === 'x') {
            this.winpositions = [2,5,8]
            this.winner = 'x'
        }

        if(this.game_board[0] === 'o' && this.game_board[3] === 'o' && this.game_board[6] === 'o') {
            this.winpositions = [0,3,6]
            this.winner = 'o'
        } else if(this.game_board[1] === 'o' && this.game_board[4] === 'o' && this.game_board[7] === 'o') {
            this.winpositions = [1,4,7]
            this.winner = 'o'
        } else if(this.game_board[2] === 'o' && this.game_board[5] === 'o' && this.game_board[8] === 'o') {
            this.winpositions = [2,5,8]
            this.winner = 'o'
        }

        // check diagnals
        if(this.game_board[0] === 'x' && this.game_board[4] === 'x' && this.game_board[8] === 'x') {
            this.winpositions = [0,4,8]
            this.winner = 'x'
        } else if(this.game_board[2] === 'x' && this.game_board[4] === 'x' && this.game_board[6] === 'x') {
            this.winpositions = [2,4,6]
            this.winner = 'x'
        }

        if(this.game_board[0] === 'o' && this.game_board[4] === 'o' && this.game_board[8] === 'o') {
            this.winpositions = [0,4,8]
            this.winner = 'o'
        } else if(this.game_board[2] === 'o' && this.game_board[4] === 'o' && this.game_board[6] === 'o') {
            this.winpositions = [2,4,6]
            this.winner = 'o'
        }
        
        if(!this.game_board.includes('')) {
            this.winner = 'none';
        }
    }
    
    getWinner() {
        return this.winner;
    }
    resetBoard() {
        this.game_board = ['','','','','','','','','']
    }
}

const game = new Board()
const boardDiv = document.querySelector(".board")
const playerOneDiv = document.querySelector(".playerone")
const playerTwoDiv = document.querySelector(".playertwo")
const messageDiv = document.querySelector(".message")
const all_cell = document.querySelectorAll(".cell")

playerOneDiv.style.borderColor = "aquamarine"

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
            document.querySelector(".message").classList.remove("show")
        }

        event.target.appendChild(imgTag)
    }

    game.checkForWinner()
    if (game.winner === 'x') {
        addToScoreBoard(game.winner)
    } else if(game.winner === 'o') {
        addToScoreBoard(game.winner)
    } else if(game.winner === 'none') {

    }
}

function addToScoreBoard(winner) {
    if (winner === 'x') {
        game.p1WinCount++
        playerOneDiv.children[1].innerHTML = game.p1WinCount
    } else if(winner === 'o') {
        game.p2WinCount++
        playerTwoDiv.children[1].innerHTML = game.p2WinCount
    }
    blink()
    setTimeout(displayWinner, 1200)
}

function blink() {
    let i = 0
    all_cell.forEach(function(cell){
        if (game.winpositions.includes(i)) {
            cell.firstChild.setAttribute('id','blink');
        }
        i++
    })
}

function displayWinner() {
    boardDiv.classList.add("hide")
    messageDiv.classList.add("show")

}
function clearBoard() {
    game.resetBoard()
    player1Turn = true
    playerOneDiv.style.borderColor = "aquamarine"
    playerTwoDiv.style.borderColor = "black"
    all_cell.forEach(function(elem){
        elem.innerHTML = ''
    })
}
