"use strict";

const Player = (name) => {
    const getName = () => name;

    return { getName };
}

const GameBoard = (() => {
    const board = [];

    const getBoard = () => board;

    const resetBoard = () => {
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

    const addToBoard = (value) => board.push(Number(value));
    
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
        }else if (length === 9) {
            return "draw";
        }

        return null;

    };

    return { checkWinningPossibilities, addToBoard, resetBoard, getBoard }

})();

const DisplayController = (() => {

    const restart = document.getElementById("restart");

    restart.addEventListener("click", GameBoard.resetBoard);

})();

const Play = (() => {

    let results = null;
    const squares = document.getElementsByClassName("square");
    const displayResults = document.getElementById("results-feedback");

    (() => {
        [...squares].map((square) => {
            square.addEventListener("click", () => {

                let board = GameBoard.getBoard();

                if (square.classList.contains("add-circle") || square.classList.contains("add-cross")
                    || results !== null) {
                    return;
                }

                if (board.length % 2 === 0) {
                    square.classList.add("add-circle");
                } else {
                    square.classList.add("add-cross");
                }

                board = GameBoard.addToBoard(square.dataset.position);

                if (board.length > 4) {
                    results = checkWinningPossibilities();

                    if(results !== null){
                        if(results === "draw"){
                            displayResults.textContent = results;
                        }else if(results === "one"){
                            displayResults.textContent = `player ${results} wins`;
                        }else if(results === "two"){
                            displayResults.textContent = `player ${results} wins`;
                        }
                    }
                }

            });
        });
    })();

})();