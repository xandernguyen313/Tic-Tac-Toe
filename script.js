/*

    0|1|2
    3|4|5
    6|7|8

*/
class Board {

    constructor() {
        this.game_board = ['','','','','','','','','']
        this.xWinCount = 0
        this.oWinCount = 0
        this.winpositions
        this.winner
        this.isXTurn
        this.isOTurn
    }

    // Place x or o into array position
    move(player, position) {
        if(player === 'x') {
            this.game_board[position] = 'x'
        } else {
            this.game_board[position] = 'o'
        }
        
    }
    //Check if the spot is taken
    isTaken(position) {
        if(this.game_board[position] !== '') {
            return true
        } else {
            return false
        }
    }

    // Check for winner or tie
    checkPositions(){
        this.winner = null
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
        
        if(!this.game_board.includes('') && this.winner == null) {
            this.winner = 'none';
        }
    }
    
    // Set array to empty and set winner to null
    resetBoard() {
        this.game_board = ['','','','','','','','','']
        this.winner = undefined
    }

    // Return a random integer for computer turn
    // Return -1 if the array is full
    easyAI()  {
        let randomInt;
        // check if board has available spots left
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
const resultDiv = document.querySelector(".result")
const all_cell = document.querySelectorAll(".cell")
const restartBtn = document.querySelector(".restart")
const playFriendBtn = document.querySelector("#two-players-mode")
const easyAIBtn = document.querySelector("#easy-mode")
const hardAIBtn = document.querySelector("#hard-mode")
const gameOptionsDiv = document.querySelector(".game-options")



function startGame() {
    // Listen for user's choice

    // Button 1: Play with Friend
    playFriendBtn.addEventListener('click', function() {
        game.isXTurn = true
        game.isOTurn = false
        playerOneDiv.style.borderColor = "aquamarine"
        boardDiv.addEventListener('click', humanVsHuman)
        gameOptionsDiv.style.display = "none";
        boardDiv.classList.remove("hidden")
    })

    // Button 2: Play against an Easy AI 
    easyAIBtn.addEventListener('click', function() {
        game.isXTurn = true
        game.isOTurn = false
        playerOneDiv.style.borderColor = "aquamarine"
        boardDiv.addEventListener('click', humanVsEasyAI)
        gameOptionsDiv.style.display = "none";
        boardDiv.classList.remove("hidden")
    })

    // Button 3: Play against a Hard AI 
    hardAIBtn.addEventListener('click', function() {
        game.isXTurn = true
        game.isOTurn = false
        playerOneDiv.style.borderColor = "aquamarine"
        boardDiv.addEventListener('click', humanVsHardAI)
        gameOptionsDiv.style.display = "none";
        boardDiv.classList.remove("hidden")
    })

    // Listen when user clicks the Restart Button
    restartBtn.addEventListener('click', restart)
}

// "Play with Friend"
// Listen for user's click and switch turn
// 'X' for player 1, 'O' for player 2
function humanVsHuman(event) {
    const position = parseInt(event.target.dataset.position)
    if(!game.isTaken(position)) {
        if(game.isXTurn) {
            xTurn(position)

        } else if(game.isOTurn) {
            oTurn(position)
        }
    
        check()
    }

}

// "Easy AI"
// 'X' for human, 'O' for computer
// Listen for user's click and switch turn
function humanVsEasyAI(event) {
    const position = parseInt(event.target.dataset.position)
    if(!game.isTaken(position)) {
        if(game.isXTurn) {
            xTurn(position)
            check()
        }
        if(game.isOTurn) {
            setTimeout(function() {
                EasyAI()
            }, 400)
        }
    }
}

// Easy AI Logic
// Place 'O' in a random spot
function EasyAI() {
    const position = game.easyAI()
    if (position !== -1) {
        oTurn(position)
    }
    check()
}

// "Hard AI"
// 'X' for human, 'O' for computer
// Listen for user's click and switch turn
function humanVsHardAI(event) {
    const position = parseInt(event.target.dataset.position)
    if(!game.isTaken(position)) {
        if(game.isXTurn) {
            xTurn(position)
            check()
        }
        if(game.isOTurn) {
            setTimeout(function() {
                HardAI()
            }, 400)
        }
    }
}


// Hard AI Logic
// Use the Minimax Algorithm
function HardAI(){
    let bestScore = -Infinity
    let position
    let board = game.game_board
    for(let i = 0; i < 9; i++) {
        if (board[i] == '') {
            board[i] = 'o'
            let score = minimax(board, false)       
            board[i] = ''
            if(score > bestScore) {
                bestScore = score
                position = i
            }
        }

    }
    if(position !== undefined) {
        oTurn(position)
        check()
    }
}

// Recursive function
// Find the best case scenerio for the computer
function minimax(board, isMaximizing){

    game.checkPositions()
    let result = game.winner

    // Base Case
    if(result == 'x') {
        return -1
    } else if(result == 'o') {
        return 1
    } else if(result == 'none') {
        return 0
    }

    // Maximizing its score
    // Will choose a move with a score of +1
    if (isMaximizing) {
        let bestScore = -Infinity
        for(let i = 0; i < 9; i++) {
            if (board[i] == '') {
                board[i] = 'o'    
                let score = minimax(board, false)
                board[i] = ''
                bestScore = Math.max(score, bestScore)
            }
        }

        return bestScore

    // Minimizing the computer's ultimate score
    // Will choose a move with a score of -1
    } else {
        let bestScore = Infinity
        for(let i = 0; i < 9; i++) {
            if (board[i] == '') {
                board[i] = 'x'
                let score = minimax(board, true)
                board[i] = ''
                bestScore = Math.min(score, bestScore)
            }
        }
        return bestScore
    }
    
}

// Creates an image tag for X and append it to the targeted div in board
function xTurn(position) {
    imgTag = createImgTag("images/x-mark.svg", "filter-1")
    game.move('x', position)
    changeDivColor("black", "aquamarine")
    game.isXTurn = false
    game.isOTurn = true
    boardDiv.children[position].appendChild(imgTag)

}

// Creates an image tag for O and append it to the targeted div in board
function oTurn(position) {
    const imgTag = createImgTag("images/circle.svg", "filter-2")
    game.move('o', position)
    changeDivColor("aquamarine", "black")
    game.isXTurn = true
    game.isOTurn = false
    boardDiv.children[position].appendChild(imgTag)
}
function createImgTag(img_url, filter) {
    const imgTag = document.createElement("img") 
    imgTag.src = img_url
    imgTag.classList.add(filter)
    return imgTag
}

// Change border color based on the current player's turn
function changeDivColor(color1, color2) {
    playerOneDiv.style.borderColor = color1
    playerTwoDiv.style.borderColor = color2
}


// Check for winner 
// and call the appropriate function depending on the result
function check() {
    game.checkPositions()
    if (game.winner === 'x') {
        game.isOTurn = false
        addToScoreBoard(game.winner)
    } else if(game.winner === 'o') {
        addToScoreBoard(game.winner)
    } else if(game.winner === 'none') {
        displayResult(game.winner)
        displayMessage()
    }
}

// Increment the player win counts and change the HTML
// to reflect that number
function addToScoreBoard(winner) {
    
    if (winner === 'x') {
        game.xWinCount++
        playerOneDiv.children[1].innerHTML = game.xWinCount
        displayResult(winner)
    } else if(winner === 'o') {
        game.oWinCount++
        playerTwoDiv.children[1].innerHTML = game.oWinCount
        displayResult(winner)
    }
    blink()
    setTimeout(displayMessage, 1200)
}

// Toggle certain classes to display the result of the game
function displayResult(winner) {
    if(winner === 'x') {
        resultDiv.querySelector("#x-winner").classList.remove("hidden")
        resultDiv.querySelector("#o-winner").classList.add("hidden")
        resultDiv.querySelector("#draw").classList.add("hidden")
    } else if (winner === 'o') {
        resultDiv.querySelector("#o-winner").classList.remove("hidden")
        resultDiv.querySelector("#x-winner").classList.add("hidden")
        resultDiv.querySelector("#draw").classList.add("hidden")
    } else {
        resultDiv.querySelector("#draw").classList.remove("hidden")
        resultDiv.querySelector("#o-winner").classList.add("hidden")
        resultDiv.querySelector("#x-winner").classList.add("hidden")
    }
}

// Loop through all existing positions of Xs and Os
// and add blinking animation to the winning
// positions of Xs or Os
function blink() {
    let i = 0
    all_cell.forEach(function(cell){
        if (game.winpositions.includes(i)) {
            cell.firstChild.setAttribute('id','blink')
        }
        i++
    })
}
// Hide the board and display the result
function displayMessage() {
    boardDiv.classList.add("hide")
    resultDiv.classList.add("show")
}

// Reset board and clear out all the cells
function restart() {
    game.resetBoard()

    game.isXTurn= true
    playerOneDiv.style.borderColor = "aquamarine"
    playerTwoDiv.style.borderColor = "black"
    boardDiv.classList.remove("hide")
    resultDiv.classList.remove("show")

    all_cell.forEach(function(elem){
        elem.innerHTML = ''
    })

}


startGame()

