"use strict";

const Player = (name) => {
    const getName = () => name;

    return { name };
}

const GameBoard = (() => {
    const board = [];
    let results = null;
    const squares = document.getElementsByClassName("square");

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

    }

    const checkWinner = () => {

        let i = 0;
        let first, second, third;
        const length = board.length;
        let winner = "player one wins";

        if (length % 2 === 0) {
            i = 1;
            winner = "player two wins";
        }

        first = board[i];
        second = board[i + 2];
        third = board[i + 4];

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
        // 0 = 1 3 4  1 = 4  2 = 4 5  3 = 4  6 = 7
        //     | | |      |      | |      |      |
        //     2 6 8      7      6 8      5      8

    }

    (() => {
        [...squares].map((square) => {
            square.addEventListener("click", () => {

                if (square.classList.contains("add-circle") || square.classList.contains("add-cross")
                    || results !== null) {
                    return;
                }

                if (board.length % 2 === 0) {
                    square.classList.add("add-circle");
                } else {
                    square.classList.add("add-cross");
                }
                board.push(Number(square.dataset.position));

                if (board.length > 4) {
                    sortArray();
                    results = checkWinner();

                    if(results !== null){
                        console.log(results);
                    }
                }

            });
        });
    })();

})();

const DisplayController = (() => {

})();