document.addEventListener("DOMContentLoaded", () => {
    generateSudoku();
    output = document.getElementById("link-output");
    document.getElementById("loader").addEventListener("change", (event) => {
        if (event.target.value.length !== 90) return false;
        loadURL(event.target.value);
    })
    document.getElementById("copy-link").addEventListener("click", () =>{
        navigator.clipboard.writeText(document.getElementById("link-output").textContent).then(
            () => {
              /* clipboard successfully set */
              console.log("success");
            },
            () => {
              /* clipboard write failed */
              console.log("failure");
            },
        );
    });
});

let output;
const inputs = [];

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
        input.pattern = "\d";
        input.type = "number";
        input.minLength = 1;
        input.maxLength = 1;
        input.addEventListener("change", onChangeHandler);
        input.addEventListener("keyup", onPressHandler);
        inputs.push(input);
        div.appendChild(input);
    }
    sudoku.appendChild(div);
}

function onChangeHandler() {
    const header = "sudoku://";
    let body = "";
    inputs.forEach(element => {
        body += element.value !== "" ? element.value : 0;
    });
    output.textContent = `${header}${body}`;
}

function onPressHandler(event) {
    let next = event.target;
    if (event.key ===  "Tab") return true;
    if (event.key ===  "Backspace") {
        while (next = next.previousSibling) {
            if (next == null)
                break;
            if (next.tagName.toLowerCase() === "input") {
                next.focus();
                break;
            }
        }
    } else {
        while (next = next.nextElementSibling) {
            if (next == null)
                break;
            if (next.tagName.toLowerCase() === "input") {
                next.focus();
                break;
            }
        }
    }
}

function loadURL(url) {
    const numbers = url.substring(9);
    for (let ii = 0; ii < inputs.length; ii++) {
        inputs[ii].value = numbers[ii] !== "0" ? numbers[ii] : "";
    }
    onChangeHandler();
}