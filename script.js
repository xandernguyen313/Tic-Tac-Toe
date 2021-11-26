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
        if(player === 'x') {
            this.game_board[position] = 'x'
        } else {
            this.game_board[position] = 'o'
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


game.move('o', 0)
console.log(game.checkForWinner())
game.move('o', 4)
console.log(game.checkForWinner())
game.move('o', 8)

console.log(game.checkForWinner())