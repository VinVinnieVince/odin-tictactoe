const Gameboard = ( () => {
    const grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    console.table(grid);

    function markGrid(mark, row, column) {
        // check if chosen grid is empty
        if (!grid[row][column]) {
            grid[row][column] = mark;
        }
        console.table(grid);
        const check = winCheck(row, column);
        if (check) {
            alert (`${currentPlayer} wins!`)
            gameWon = true;
        }
    }

    function winCheck(row, column) {
        let win = true;
        // check row
        for (let i = 0; i < 3; i++) {
            if (grid[row][column] !== grid[row][i]) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }

        win = true;
        // check column
        for (let i = 0; i < 3; i++) {
            if (grid[row][column] !== grid[i][column]) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }

        win = true;
        // check diags
        for (let i = 0; i < 3; i++) {
            if (grid[row][column] !== grid[i][i]) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }

        win = true;
        for (let i = 0; i < 3; i++) {
            if (grid[row][column] !== grid[i][2 - i]) {
                win = false;
                break;
            }
        }
        if (win) {
            return true;
        }
    }

    function reset() {
        for (row in grid) {
            for (column in grid[row]) {
                grid[row][column] = '';
            }
        }
    }

    function createPlayer (name, marker) {
        const score = 0;
        let playerName = name;
    
        function addToScore () {
            score++;
        }

        function rename () {
            playerName = prompt(`Write a new name for Player ${playerName}`);
        }

        return {
            playerName,
            marker,
            score,
            addToScore,
            rename,
        }
    }
    
    function randomChoice() {
        const randomValue = Math.random() * 2
        if (randomValue < 1) {
            return 'O';
        } else if (randomValue >= 1) {
            return 'X';
        } else {
            console.log('random value error');
        }
    }

    let currentPlayer;
    let currentPlayerMarker;

    // const randomValue = Math.random() * 2
    // if (randomValue > 1) {
    //     currentPlayer = playerTwo.playerName;
    //     currentPlayerMarker = playerTwo.marker;
    //     alert(`${playerTwo.playerName} starts first!`);
    // } else {
    //     currentPlayer = playerOne.playerName;
    //     currentPlayerMarker = playerOne.marker;
    //     alert(`${playerOne.playerName} starts first!`);
    // }

    // function switchPlayers() {
    //     switch (currentPlayer) {
    //         case playerOne.playerName:
    //             currentPlayer = playerTwo.playerName;
    //             currentPlayerMarker = playerTwo.marker;
    //             break;
    //         case playerTwo.playerName:
    //             currentPlayer = playerOne.playerName;
    //             currentPlayerMarker = playerOne.marker;
    //             break;
    //     }
    // }

    // let colChoice;
    // let rowChoice;
    // function makeChoice() {
    //     alert (`Its currently ${currentPlayer}'s turn!`)
    //     rowChoice = prompt(`Select a row (1-3)`);
    //     while ( (rowChoice < 1) || (rowChoice > 3) ) {
    //         rowChoice = prompt('Please select a valid row! (1-3)');
    //     }
    //     // Because array indexes begin at 0
    //     rowChoice--;

    //     colChoice = prompt(`Select a column (1-3)`);
    //     while ( (colChoice < 1) || (colChoice > 3) ) {
    //         colChoice= prompt('Please select a valid column! (1-3)');
    //     }
    //     colChoice--;
    // }
    
    playerOne = createPlayer('Player 1', 'Click to choose marker');
    playerTwo = createPlayer('Player 2', 'Click to choose marker');

    const ui = ( function refresh() {
        const displayGrid = document.querySelector('.displayGrid');

        const pOneName = document.querySelector('.playerOneName');
        const pOneNameBold = document.createElement('b');
        const pOneMarker = document.querySelector('.playerOneMarker');
        const pOneMarkerChoice = document.createElement('p');
        const pOneScore = document.querySelector('.playerOneScore');

        const pTwoName = document.querySelector('.playerTwoName');
        const pTwoNameBold = document.createElement('b');
        const pTwoMarker = document.querySelector('.playerTwoMarker');
        const pTwoMarkerChoice = document.createElement('p');
        const pTwoScore = document.querySelector('.playerTwoScore');

        pOneNameBold.textContent = playerOne.playerName;
        pOneMarkerChoice.textContent = playerOne.marker;
        pOneScore.textContent += playerOne.score;

        pTwoNameBold.textContent = playerTwo.playerName;
        pTwoMarkerChoice.textContent = playerTwo.marker;
        pTwoScore.textContent += playerTwo.score;

        [pOneNameBold, pTwoNameBold].forEach( (ele) => {
            ele.addEventListener('click', () => {
                const nameForm = document.createElement('input');
                const parentEle = ele.parentNode;
                const currentName = ele.textContent 

                nameForm.value = currentName;

                nameForm.addEventListener('focusout', function edit() {
                    const nameBold = document.createElement('b');

                    // For blank inputs, don't change name
                    if (!nameForm.value) {
                        nameForm.value = currentName;
                    }

                    nameBold.textContent = nameForm.value;

                    ele.appendChild(nameBold);

                    playerOne.name = pOneNameBold.textContent; 
                    playerTwo.name = pTwoNameBold.textContent;

                    // Attempt to minimise memory leaks
                    nameForm.removeEventListener('focusout', edit);
                    nameForm.remove();
                })

                ele.textContent = '';
                parentEle.appendChild(nameForm);
                nameForm.focus();
            });
        });

        const buttonChoices = document.createElement('div');
        const buttonO = document.createElement('button');
        const buttonX = document.createElement('button');
        const buttonRand = document.createElement('button');

        buttonO.textContent = 'O';
        buttonX.textContent = 'X';
        buttonRand.textContent = 'Random';

        buttonChoices.appendChild(buttonO);
        buttonChoices.appendChild(buttonX);
        buttonChoices.appendChild(buttonRand);

        [pOneMarkerChoice, pTwoMarkerChoice].forEach( (markerEle) => {
            markerEle.addEventListener('click', () => {
                const parentEle = markerEle.parentNode;

                [buttonO, buttonX, buttonRand].forEach( (btn) => {
                    btn.addEventListener('click', function decide() {
                        pOneMarkerChoice.textContent = '';
                        pTwoMarkerChoice.textContent = '';

                        if (btn.textContent === 'Random') {
                            markerEle.textContent = randomChoice();
                        } else {
                            markerEle.textContent = btn.textContent;
                        }

                        // auto-assigns other player's marker
                        if ((pOneMarkerChoice.textContent === 'X') || (pTwoMarkerChoice.textContent === 'O')) {
                            playerOne.marker = 'X';
                            playerTwo.marker = 'O';
                        } else if ((pOneMarkerChoice.textContent === 'O') || (pTwoMarkerChoice.textContent === 'X')) {
                            playerOne.marker = 'O';
                            playerTwo.marker = 'X';
                        }

                        pOneMarkerChoice.textContent = playerOne.marker;
                        pTwoMarkerChoice.textContent = playerTwo.marker;

                        buttonChoices.removeEventListener('click', decide);
                        buttonChoices.remove();
                    });
                });

                markerEle.textContent = '';
                parentEle.appendChild(buttonChoices);
            });
        })

        pOneName.appendChild(pOneNameBold);
        pTwoName.appendChild(pTwoNameBold);
        pOneMarker.appendChild(pOneMarkerChoice);
        pTwoMarker.appendChild(pTwoMarkerChoice);

        for (let row = 0; row < 3; row++) {
            const gridRow = document.createElement('div');
            gridRow.classList.add('gridRow');
            displayGrid.appendChild(gridRow);
            for (let col = 0; col < 3; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cellFormat');
                cell.dataset.row = String(row);
                cell.dataset.col = String(col);
                gridRow.appendChild(cell);
            }
        }

        return { refresh };
    } )()

    return {
        grid,
        markGrid,
        reset,
    }
})() 

