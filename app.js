let boxs = document.querySelector('.boxs');

const N = 9;


let que= [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0],
];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        let input = document.createElement("input");
        input.className = 'small-box';
        input.maxLength = 1;
        // input.value=que[i][j];
        input.placeholder=0;
        boxs.appendChild(input);
    }
}


let grid = Array();
function isSafe(row, col, num) {
    for (let i = 0; i < N; i++)
        if (grid[row][i] == num)
            return false;
    for (let j = 0; j < N; j++)
        if (grid[j][col] == num)
            false;
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let r = 0; r < 3; r++)
        for (let c = 0; c < 3; c++)
            if (grid[r + startRow][c + startCol] == num)
                return false;
    return true;
}
function sudokuSolve() {
    let emptyCell = false;
    let i, j;
    for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++)
            if (grid[i][j] == 0) {
                emptyCell = true;
                break;
            }
        if (emptyCell)
            break;
    }
    if (!emptyCell)
        return true;
    for (let num = 1; num <= N; num++) {
        if (isSafe(i, j, num)) {
            grid[i][j] = num;
            if (sudokuSolve())
                return true;
            grid[i][j] = 0;
        }
    }
    return false;
}

let data = document.querySelectorAll('input');
function gridSolution() {
    console.log("click");
    grid = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ];
    let index = 0;
    for (let i = 0; i < N; i++)
        for (let j = 0; j < N; j++) {
            k =Number( data[index++].value);
            grid[i][j]=k;
        }

    // grid = [
    //     [3, 0, 6, 5, 0, 8, 4, 0, 0],
    //     [5, 2, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 8, 7, 0, 0, 0, 0, 3, 1],
    //     [0, 0, 3, 0, 1, 0, 0, 8, 0],
    //     [9, 0, 0, 8, 6, 3, 0, 0, 5],
    //     [0, 5, 0, 0, 9, 0, 6, 0, 0],
    //     [1, 3, 0, 0, 0, 0, 2, 5, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 7, 4],
    //     [0, 0, 5, 2, 0, 6, 3, 0, 0],
    // ];
    if (sudokuSolve()) {
        let sms=document.querySelector("#sms")
        index = 0;
        sms.innerText="Sudoku solved : ";
        for (let i = 0; i < N; i++)
            for (let j = 0; j < N; j++)
                data[index++].value = grid[i][j];
    }
    else
    sms.innerText="It's solution is not posible!";
}