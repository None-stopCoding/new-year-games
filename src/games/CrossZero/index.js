import GameLogic from "./Logic/GameLogic";
import * as $ from 'jquery';
// Запуск новой игровой партии
export default function newGame({ stateChanged }) {

    // Инициализируем игровую логику. Входной параметр - размер игрового поля
    const gameLogic = new GameLogic(3);

    var articles = $("#game__board td");

    // Сброс UI игры в начало партии
    gameLogic.view.restart($("#game__board"));

    gameLogic.clearModel();

    // Вешаем обработчик кликов на ячейки игрового поля
    $(articles).on('click', function () {
        gameLogic.clickOnCell(this);
        stateChanged(gameLogic.gameState);
    });

    return gameLogic;
}
