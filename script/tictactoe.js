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
    
    let playerOneName = prompt('Write a name for Player 1', 'Player 1');
    let playerTwoName = prompt('Write a name for Player 2', 'Player 2');
    
    let playerOneMarker;
    let playerTwoMarker;
    const PlayerMarkers = (function assign() {
        playerOneMarker = prompt(`X or O? (Type 'rand' for random)`);
    
        const acceptedInputs = ['x', 'o', 'rand'];
    
        while ( !(acceptedInputs.includes(playerOneMarker.toLowerCase())) ) {
            playerOneMarker = prompt(`Please type in 'x', 'o' or 'rand'!`);
        }
    
        if (playerOneMarker === 'rand') {
            const randomValue = Math.random() * 2;
            if (randomValue <= 1) {
                playerOneMarker = 'o';
            } else if (randomValue > 1) {
                playerOneMarker = 'x';
            } else {
                console.log('random marker error');
            }
            console.log(randomValue, playerOneMarker);
        }
    
        switch (playerOneMarker) {
            case 'x':
                playerTwoMarker = 'o';
                break;
            case 'o':
                playerTwoMarker = 'x';
                break;
            default:
                alert('error');
                break;
        }
        
        if (! (confirm(`${playerTwoName}'s marker will be '${playerTwoMarker}'. Proceed?`))) {
            assign();
        }
    
        return { assign };
    })()
    
    const playerOne = createPlayer(playerOneName, playerOneMarker);
    const playerTwo = createPlayer(playerTwoName, playerTwoMarker);

    let currentPlayer;
    let currentPlayerMarker;

    const randomValue = Math.random() * 2
    if (randomValue > 1) {
        currentPlayer = playerTwo.playerName;
        currentPlayerMarker = playerTwo.marker;
        alert(`${playerTwo.playerName} starts first!`);
    } else {
        currentPlayer = playerOne.playerName;
        currentPlayerMarker = playerOne.marker;
        alert(`${playerOne.playerName} starts first!`);
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
    }

    let colChoice;
    let rowChoice;
    function makeChoice() {
        alert (`Its currently ${currentPlayer}'s turn!`)
        rowChoice = prompt(`Select a row (1-3)`);
        while ( (rowChoice < 1) || (rowChoice > 3) ) {
            rowChoice = prompt('Please select a valid row! (1-3)');
        }
        // Because array indexes begin at 0
        rowChoice--;

        colChoice = prompt(`Select a column (1-3)`);
        while ( (colChoice < 1) || (colChoice > 3) ) {
            colChoice= prompt('Please select a valid column! (1-3)');
        }
        colChoice--;
    }
    
    let gameWon;
    const playGame = (function start() {
        gameWon = false;
        while (!(gameWon)) {
            makeChoice();
            markGrid(currentPlayerMarker, rowChoice, colChoice);
            alert(`
                ${grid[0]}
                ${grid[1]}
                ${grid[2]}`)
            switchPlayers();
        }

        return { start };
    })()

    const initUI = ( () => {
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

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cellFormat');
                cell.dataset.row = String(row);
                cell.dataset.col = String(col);
                displayGrid.appendChild(cell);
            }
        }
    } )()

    return {
        grid,
        markGrid,
        reset,
    }
})() 

