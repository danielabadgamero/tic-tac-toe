const board = document.querySelector(".board");
const cells = [];
const playAgainstCheckboxes = [...document.querySelectorAll("input[type='radio']")];
const form = document.querySelector("form")

for (let i = 0; i <= 8; i++) {
    cells.push(document.createElement(`div`));
    cells[i].classList.add("cell");
    cells[i].setAttribute("id", i);
    board.appendChild(cells[i]);
}

playAgainstCheckboxes[0].addEventListener("change", (e) => {
    form.querySelector("div.empty").classList.remove("names");
})

playAgainstCheckboxes[1].addEventListener("change", (e) => {
        form.querySelector("div.empty").classList.add("names");
})