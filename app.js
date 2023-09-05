document.addEventListener("DOMContentLoaded", () => {
    generateSudoku();
});

function generateSudoku() {
    const sudoku = document.getElementById("sudoku");
    for (let ii = 0; ii < 9; ii++) {
        generateRow(sudoku);
    }
}

function generateRow(sudoku) {
    const div = document.createElement("div");
    for (let ii = 0; ii < 9; ii++) {
        const input = document.createElement("input");
        div.appendChild(input);
    }
    sudoku.appendChild(div);
}