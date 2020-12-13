import * as $ from 'jquery';
const cards = document.querySelectorAll(".memory-card");

let matchedCardsCount = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let stateChanged = null;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();

    /** Если Победил */
    if (matchedCardsCount === cards.length / 2) {
        stateChanged();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchedCardsCount += 1;
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1500);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}
function shuffle() {
    cards.forEach((card) => {
        let ramdomPos = Math.ceil(Math.random() * 12);
        card.style.order = ramdomPos;
    });
};

export default function init({ stateChangedCallback }) {
    stateChanged = stateChangedCallback;
    shuffle();
    cards.forEach((card) => card.addEventListener("click", flipCard));
}