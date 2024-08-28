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
        console.table(grid);
        winCheck(row, column);
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
            alert('Player has won!');
            return;
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
            alert('Player has won!');
            return;
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
            alert('Player has won!');
            return;
        }
        
        win = true;
        for (let i = 0; i < 3; i++) {
            if (grid[row][column] !== grid[i][2 - i]) {
                win = false;
                break;
            }
        }
        if (win) {
            alert('Player has won!');
            return;
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
    
        let playerTwoMarker;
        switch (playerOneMarker) {
            case 'x':
                playerTwoMarker = 'o';
                break;
            case 'o':
                playerTwoMarker = 'x';
                break;
        }
        
        if (! (confirm(`${playerTwoName}'s marker will be ${playerTwoMarker}. Proceed?`))) {
            assign();
        }
    
        return { assign };
    })()
    
    const PlayerOne = createPlayer(playerOneName, playerOneMarker);
    const PlayerTwo = createPlayer(playerTwoName, playerTwoMarker);

    return {
        grid,
        markGrid,
        reset,
    }
})() 

