import * as $ from 'jquery';
// Класс отвечающий за UI: отрисовка/обновление/добавление элементов
export default class View {
    constructor(gameLogic) {
        this.gameLogic = gameLogic;

        // Инициализация нужных HTML элементов
        this.board = document.getElementById("game__board");
        this.board.innerHTML = '';
    }

    // Обновление UI в зависимости от исхода партии
    updateUiAfterEndParty(message, alt) {

        alert(message);
        // swal({ title: message, icon: alert });
        this.removeEvent();
        this.addElementToHistory(this.gameLogic.board);
    }

    // Добавление нового элемента в историю игр
    addElementToHistory() {
        // var historyBlock = document.getElementById("history");
        // var elementOfHistory = this.board.cloneNode(true);
        // historyBlock.appendChild(elementOfHistory);
    }

    // Удаления событий повешенных на ячейки игрового поля
    removeEvent() {
        const elements = this.board.getElementsByTagName("td");
        $(elements).unbind();
    }

    // Рестарт игры
    restart(board) {
        const elements = $(board).find("td");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "";
            elements[i].classList.remove("x");
            elements[i].classList.remove("o");
        }
        // this.showBlock($(".choose-player"), "inline-block");
    }

    // Изменение видмости блока
    showBlock(element, blockStyle) {
        if (!$(element).is(":visible")) {
            $(element).fadeIn(250);
            $(element).css({ display: blockStyle });
        } else $(element).fadeOut(250);
    }

    // Отрисовка таблицы согласно заданным размерам
    renderTable(boardLength) {
        for (let j = 0; j < boardLength; j++) {
            let row = document.createElement("tr");

            for (var i = 0; i < boardLength; i++) {
                let cell = document.createElement("td");
                row.appendChild(cell);
            }

            this.board.appendChild(row);
        }
    }

    // Занятие ячейки игрового поля
    occupationCell(x, y, icon) {
        this.board.rows[x].cells[y].innerText = icon;
        this.board.rows[x].cells[y].classList.add(icon);
    }
}
