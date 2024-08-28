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

    return {
        grid,
        markGrid,
        reset,
    }
})()