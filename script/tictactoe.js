const Gameboard = ( () => {
    const grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    function markGrid(mark, row, column) {
        // check if chosen grid is empty
        if (!grid[row][column]) {
            grid[row][column] = mark;
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

    function noMoreMoves() {
        for (let row = 0; row < 3; row ++) {
            for (let col = 0; col < 3; col ++) {
                if (!grid[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }

    function reset() {
        for (row in grid) {
            for (column in grid[row]) {
                grid[row][column] = '';
            }
        }

        const allCells = document.querySelectorAll('.cellFormat');
        for (cell in allCells) {
            allCells[cell].textContent = '';
        }
    }

    function createPlayer (name, marker) {
        let score = 0;
        let playerName = name;
    
        function addToScore () {
            this.score++;
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
    playerOne = createPlayer('Player 1', 'Click to choose marker');
    playerTwo = createPlayer('Player 2', 'Click to choose marker');
    
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
    let displayText = document.querySelector('.displayText');

    function decideFirstPlayer() {
        const randomValue = Math.random() * 2
        if (randomValue > 1) {
            currentPlayer = playerTwo.playerName;
            currentPlayerMarker = playerTwo.marker;
        } else {
            currentPlayer = playerOne.playerName;
            currentPlayerMarker = playerOne.marker;
        }
        displayText.textContent = `${currentPlayer} (${currentPlayerMarker}) starts the game!`;
    }

    function switchPlayers() {
        switch (currentPlayer) {
            case playerOne.playerName:
                currentPlayer = playerTwo.playerName;
                currentPlayerMarker = playerTwo.marker;
                break;
            case playerTwo.playerName:
                currentPlayer = playerOne.playerName;
                currentPlayerMarker = playerOne.marker;
                break;
        }
        displayText.textContent = `It is currently ${currentPlayer} (${currentPlayerMarker})'s turn!`
    }

    let gameInProgress = false;

    const ui = ( () => {
        const displayGrid = document.querySelector('.displayGrid');

        const pOneName = document.querySelector('.playerOneName');
        const pOneNameBold = document.createElement('b');
        const pOneMarker = document.querySelector('.playerOneMarker');
        const pOneScore = document.querySelector('.playerOneScore');

        const pTwoName = document.querySelector('.playerTwoName');
        const pTwoNameBold = document.createElement('b');
        const pTwoMarker = document.querySelector('.playerTwoMarker');
        const pTwoScore = document.querySelector('.playerTwoScore');

        pOneNameBold.textContent = playerOne.playerName;
        pOneMarker.textContent += playerOne.marker;
        pOneScore.textContent += playerOne.score;

        pTwoNameBold.textContent = playerTwo.playerName;
        pTwoMarker.textContent += playerTwo.marker;
        pTwoScore.textContent += playerTwo.score;

        pOneName.appendChild(pOneNameBold);
        pTwoName.appendChild(pTwoNameBold);

        function addNameForm(ele) {
            const nameForm = document.createElement('input');
            const parentEle = ele.parentNode;
            const currentName = ele.textContent 

            nameForm.value = currentName;

            nameForm.addEventListener('focusout', () => {
                nameEdit(ele, nameForm, currentName);
            })

            ele.textContent = '';
            parentEle.appendChild(nameForm);
            nameForm.focus();
        }

        function nameEdit(ele, nameForm, currentName) {
            const nameBold = document.createElement('b');

            // For blank inputs, don't change name
            if (!nameForm.value) {
                nameForm.value = currentName;
            }

            nameBold.textContent = nameForm.value;

            ele.appendChild(nameBold);

            playerOne.playerName = pOneNameBold.textContent; 
            playerTwo.playerName = pTwoNameBold.textContent;

            // Attempt to minimise memory leaks
            nameForm.removeEventListener('focusout', nameEdit);
            nameForm.remove();
        }

        [pOneNameBold, pTwoNameBold].forEach( (ele) => {
            ele.addEventListener('click', () => {
                addNameForm(ele);
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

        function addMarkerChoices (ele) {
            if (gameInProgress) {
                alert('Cannot change marker as game in progress!');
                return;
            }

            [buttonO, buttonX, buttonRand].forEach( (btn) => {
                btn.addEventListener('click', () => {
                    assignMarkers(btn, ele);
                })
            })

            // Although function is insert *before*, this will allow buttonChoices to be inserted *after* marker div
            ele.parentNode.insertBefore(buttonChoices, ele.nextSibling);
        }

        function assignMarkers (btn, ele) {
            pOneMarker.textContent = '';
            pTwoMarker.textContent = '';

            if (btn.textContent === 'Random') {
                ele.textContent = randomChoice();
            } else {
                ele.textContent = btn.textContent;
            }

            // auto-assigns other player's marker
            if ((pOneMarker.textContent === 'X') || (pTwoMarker.textContent === 'O')) {
                playerOne.marker = 'X';
                playerTwo.marker = 'O';
            } else if ((pOneMarker.textContent === 'O') || (pTwoMarker.textContent === 'X')) {
                playerOne.marker = 'O';
                playerTwo.marker = 'X';
            }

            // updates both markers
            pOneMarker.textContent = `Marker: ` + playerOne.marker;
            pTwoMarker.textContent = `Marker: ` + playerTwo.marker;

            // To minimise memory leaks
            buttonChoices.removeEventListener('click', assignMarkers);
            buttonChoices.remove();
        }

        [pOneMarker, pTwoMarker].forEach( (ele) => {
                ele.addEventListener('click', () => {
                    addMarkerChoices(ele);
                });
        })

        function addToGrid (cell, row, col) {
            if (gameInProgress && !cell.textContent) {
                cell.textContent = currentPlayerMarker;
                markGrid(currentPlayerMarker, row, col);

                const playerWon = winCheck(row, col);
                if (playerWon || noMoreMoves()) {
                    endGame(playerWon);
                    return;
                };
                switchPlayers();
            }
        }

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
                cell.addEventListener('click', () => {
                    addToGrid(cell, row, col);
                })
            }
        }

        return { pOneScore, pTwoScore };
    } )()

    function playersCheck() {
        if (
            ((playerOne.marker === 'X') && (playerTwo.marker === 'O'))
            || ((playerOne.marker === 'O') && (playerTwo.marker === 'X')) 
        )   { 
            return true;
        } else {
            return false;
            };
    }

    function endGame(playerWon) {
        if (playerWon) {
            displayText.textContent = `${currentPlayer} has won!`;
            if (currentPlayer === playerOne.playerName) {
                playerOne.addToScore();
                ui.pOneScore.textContent = `Score: ${playerOne.score}`; 
            } else if (currentPlayer === playerTwo.playerName) {
                playerTwo.addToScore();
                ui.pTwoScore.textContent = `Score: ${playerTwo.score}`;
            }
        } else {
            displayText.textContent = `Draw!`
        }
        gameInProgress = false;
        startBtn.disabled = false;
    }

    function startGame () {
        reset();
        if (playersCheck()) {
            gameInProgress = true;
            decideFirstPlayer();
            startBtn.disabled = true;
        } else {
            displayText.textContent = 'Please choose player markers!'
        }
    }

    const startBtn = document.querySelector('.startBtn')
    startBtn.addEventListener('click', startGame);
})() 