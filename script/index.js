"use strict";

const Player = (name) => {
    const getName = () => name;

    return { getName };
}

const GameBoard = (() => {
    const board = [];

    const getBoard = () => [...board];

    const resetBoard = () => {
        document.getElementById("results-feedback").textContent = "";
        const squares = document.getElementsByClassName("square");

        [...squares].map(square => {
            if(board.length !== 0){
                board.pop();
            }

            square.classList.remove("add-circle");
            square.classList.remove("add-cross");
        });

        return board;
        
    };

    const addToBoard = (value) => {
        board.push(Number(value));
        return [...board];
    };

    const showGameBoard = () => {
        const gameBoard = document.getElementById("game-board");
        const squares = document.getElementsByClassName("square");

        gameBoard.classList.add("show-game-board");

        [...squares].map(square => square.classList.add("change-cursor"));
    }
    
    const sortArray = () => {

        let start;
        let i = 0;
        let first;
        let second;

        if (board.length % 2 === 0) {
            i = 1;
        }

        start = i;

        for (start; start < board.length - 2; start += 2) {
            first = board[start];
            second = board[start + 2];
            if (first > second) {
                board[start] = second;
                board[start + 2] = first;
                start = i - 2;
            }
        }

    };

    const checkWinningPossibilities = () => {
        let winner = null;
        let first, second, third;

        first = 0;

        if(board.length % 2 === 0){
            first = 1;
        }

        second = first + 2;
        third = second + 2;

        sortArray();

        while(third <= board.length - 1){
            winner = checkWinner(board[first], board[second], board[third]);
            
            if(winner !== null){
                return winner;
            }
            
            third += 2;

            if(third > board.length - 1){
                if(second + 2 !== third - 2){
                    second += 2;
                    third = second + 2;
                }else if(first + 2 !== second){
                    first += 2;
                    second = first + 2;
                    third = second + 2;
                }
            }

        }

        if(winner === null && board.length === 9){
            winner = "draw";
        }

        return winner;
    };

    const checkWinner = (first, second, third) => {

        let i = 0;
        const length = board.length;
        let winner = "one";

        if (length % 2 === 0) {
            i = 1;
            winner = "two";
        }
        
        if (first === 0) {
            if (second == 1 && third == 2) {
                return winner;
            } else if (second === 3 && third == 6) {
                return winner;
            } else if (second === 4 && third === 8) {
                return winner;
            }
        } else if (first === 1 && second === 4 && third === 7) {
            return winner;
        } else if (first === 2) {
            if (second === 4 && third === 6) {
                return winner;
            } else if (second === 5 && third === 8) {
                return winner;
            }
        } else if (first === 3 && second === 4 && third === 5) {
            return winner;
        } else if (first === 6 && second === 7 && third === 8) {
            return winner;
        }

        return null;

    };

    return { checkWinningPossibilities, addToBoard, resetBoard, getBoard, showGameBoard }

})();

const DisplayController = (() => {

    let results = null;
    let playerOne = null;
    let playerTwo = null;
   
    const submit = document.getElementById("submit");
    const restart = document.getElementById("restart");
    const squares = document.getElementsByClassName("square");
    const playerOneInput = document.getElementById("player-one-name");
    const playerTwoInput = document.getElementById("player-two-name");
    const displayResults = document.getElementById("results-feedback");
   
    restart.addEventListener("click", GameBoard.resetBoard);

    playerOneInput.value = "";
    playerTwoInput.value = "";
    
    const assignPlayerNames = () => {

        if(playerOneInput.value === null || playerTwoInput.value === null ||
            playerOneInput.value.length === 0 || playerTwoInput.value.length === 0){
            if(playerOneInput.value === null || playerOneInput.value.length === 0){
                playerOneInput.focus();
            }else{
                playerTwoInput.focus();
            }

            return false;
        }

        playerOne = Player(playerOneInput.value);
        playerTwo = Player(playerTwoInput.value);

        GameBoard.showGameBoard();
        GameBoard.resetBoard();

        return true;
    };

    submit.addEventListener("click", assignPlayerNames);

    (() => {
        [...squares].map((square) => {
            square.addEventListener("click", () => {

                let board = GameBoard.getBoard();

                square.classList.remove("change-cursor");
                if (square.classList.contains("add-circle") || square.classList.contains("add-cross")
                    || displayResults.textContent !== "") {
                    return;
                }

                if(playerOne === null || playerTwo == null){
                    if(!assignPlayerNames()){
                        return;
                    }
                }

                if (board.length % 2 === 0) {
                    square.classList.add("add-circle");
                } else {
                    square.classList.add("add-cross");
                }

                board = GameBoard.addToBoard(square.dataset.position);

                if (board.length > 4) {
                    results = GameBoard.checkWinningPossibilities();

                    if(results !== null){
                        if(results === "draw"){
                            displayResults.textContent = results;
                        }else if(results === "one"){
                            displayResults.textContent = `${playerOne.getName()} wins`;
                        }else if(results === "two"){
                            displayResults.textContent = `${playerTwo.getName()} wins`;
                        }
                        results = null;
                    }
                }

            });
        });
    })();
    
})();