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
        this.winpositions
        this.winner
        this.isPlayer1Turn;
        this.isPlayer2Turn;
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
    checkPositions(){

        // check rows
        if(this.game_board[0] === 'x' && this.game_board[1] === 'x' && this.game_board[2] === 'x') {
            this.winpositions = [0,1,2]
            this.winner = 'x'
            
        } else if(this.game_board[3] === 'x' && this.game_board[4] === 'x' && this.game_board[5] === 'x') {
            this.winpositions = [3,4,5]
            this.winner = 'x'

        } else if(this.game_board[6] === 'x' && this.game_board[7] === 'x' && this.game_board[8] === 'x') {
            this.winpositions = [6,7,8]
            this.winner = 'x'
        }

        if(this.game_board[0] === 'o' && this.game_board[1] === 'o' && this.game_board[2] === 'o') {
            this.winpositions = [0,1,2]
            this.winner = 'o'
        } else if(this.game_board[3] === 'o' && this.game_board[4] === 'o' && this.game_board[5] === 'o') {
            this.winpositions = [3,4,5]
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
        
        if(!this.game_board.includes('') && !this.winner) {
            this.winner = 'none';
        }
    }
    
    getWinner() {
        return this.winner;
    }
    resetBoard() {
        this.game_board = ['','','','','','','','','']
        this.winner = undefined
    }

    easyAI()  {
        let randomInt;
        if (this.game_board.includes('')) {
            do {
                randomInt = Math.floor(Math.random() * 9)
            } while(this.game_board[randomInt] !== '')
            return randomInt
        } else {
            return -1
        }
    }
}

const game = new Board()
const boardDiv = document.querySelector(".board")
const playerOneDiv = document.querySelector(".playerone")
const playerTwoDiv = document.querySelector(".playertwo")
const messageDiv = document.querySelector(".message")
const all_cell = document.querySelectorAll(".cell")
const restartBtn = document.querySelector(".restart")

function startGame() {
    game.isPlayer1Turn = true
    game.isPlayer2Turn = false
    playerOneDiv.style.borderColor = "aquamarine"
    boardDiv.addEventListener('click', humanVsHuman)
    restartBtn.addEventListener('click', restart)
 
}
function humanVsHuman(event) {
    let imgTag;
    const position = parseInt(event.target.dataset.position)
    if(!game.isTaken(position)) {
        if(game.isPlayer1Turn) {
            imgTag = createImgTag("images/x-mark.svg", "filter-1")
            game.move('x', position)
            changeDivColor("black", "aquamarine")
            game.isPlayer1Turn = false
        } else {
            imgTag = createImgTag("images/circle.svg", "filter-2")
            game.move('o', position)
            changeDivColor("aquamarine", "black")
            game.isPlayer1Turn = true
        }
        event.target.appendChild(imgTag)

        check()
    }

}

function humanVsAI(event) {
    let imgTag;
    const position = parseInt(event.target.dataset.position)
    if(!game.isTaken(position)) {
        if(game.isPlayer1Turn) {
            imgTag = createImgTag("images/x-mark.svg", "filter-1")
            game.move('x', position)
            changeDivColor("black", "aquamarine")
            game.isPlayer2Turn = true
            event.target.appendChild(imgTag)
            check()
        }
        if(game.isPlayer2Turn) {
            setTimeout(function() {
                AIPlayer(event)
            }, 400)
        }
    }
}
function AIPlayer() {
    const position = game.easyAI()
    if (position !== -1) {
        const imgTag = createImgTag("images/circle.svg", "filter-2")
        game.move('o', position)
        changeDivColor("aquamarine", "black")
        game.isPlayer1Turn = true
        boardDiv.children[position].appendChild(imgTag)
    }
    check()
}
function check() {
    game.checkPositions()

    if (game.winner === 'x') {
        game.isPlayer2Turn = false
        addToScoreBoard(game.winner)
    } else if(game.winner === 'o') {
        addToScoreBoard(game.winner)
    } else if(game.winner === 'none') {
        changeMessageDiv(game.winner)
        boardDiv.removeEventListener('click', humanVsHuman)
        displayMessage()
    }
}

function addToScoreBoard(winner) {
    boardDiv.removeEventListener('click', humanVsHuman)
    if (winner === 'x') {
        game.p1WinCount++
        playerOneDiv.children[1].innerHTML = game.p1WinCount
        changeMessageDiv(winner)

    } else if(winner === 'o') {
        game.p2WinCount++
        playerTwoDiv.children[1].innerHTML = game.p2WinCount
        changeMessageDiv(winner)
    }
    blink()
    setTimeout(displayMessage, 1200)
}
function changeMessageDiv(winner) {
    if(winner === 'x') {
        messageDiv.querySelector("#x-winner").classList.remove("hidden")
        messageDiv.querySelector("#o-winner").classList.add("hidden")
        messageDiv.querySelector("#draw").classList.add("hidden")
    } else if (winner === 'o') {
        messageDiv.querySelector("#o-winner").classList.remove("hidden")
        messageDiv.querySelector("#x-winner").classList.add("hidden")
        messageDiv.querySelector("#draw").classList.add("hidden")
    } else {
        messageDiv.querySelector("#draw").classList.remove("hidden")
        messageDiv.querySelector("#o-winner").classList.add("hidden")
        messageDiv.querySelector("#x-winner").classList.add("hidden")
    }
}
function blink() {
    let i = 0
    all_cell.forEach(function(cell){
        if (game.winpositions.includes(i)) {
            cell.firstChild.setAttribute('id','blink')
        }
        i++
    })
}

function displayMessage() {
    boardDiv.classList.add("hide")
    messageDiv.classList.add("show")
}

function restart() {
    game.resetBoard()

    isPlayer1Turn = true
    playerOneDiv.style.borderColor = "aquamarine"
    playerTwoDiv.style.borderColor = "black"
    boardDiv.classList.remove("hide")
    messageDiv.classList.remove("show")

    all_cell.forEach(function(elem){
        elem.innerHTML = ''
    })

    boardDiv.addEventListener('click', humanVsHuman)

}

function changeDivColor(color1, color2) {
    playerOneDiv.style.borderColor = color1
    playerTwoDiv.style.borderColor = color2
}
function createImgTag(img_url, filter) {
    const imgTag = document.createElement("img")
    imgTag.src = img_url
    imgTag.classList.add(filter)
    return imgTag
}


startGame()