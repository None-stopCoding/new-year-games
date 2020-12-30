import * as $ from 'jquery';
const cards = document.querySelectorAll(".memory-card");

let matchedCardsCount = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let stateChanged = null;
var audio = new Audio();

function flipCard() {
    audio.src = './audio/click.mp3';
    audio.volume = 0.1;
    audio.play();
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
        setTimeout(function() {
            audio.src = './audio/win.mp3';
            audio.volume = 0.4;
            audio.play();
        }, 100);
    }
}

function disableCards() {
    audio.src = './audio/whoosh.mp3';
    audio.play();
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchedCardsCount += 1;
    resetBoard();
}

function unflipCards() {
    audio.src = './audio/ups.mp3';
    audio.play();
    setTimeout(function()  {
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

    Array.prototype.forEach.call(cards, function(card) {
        let ramdomPos = Math.ceil(Math.random() * 12);
        card.style.order = ramdomPos;
    });
};

export default function init({ stateChangedCallback }) {
    stateChanged = stateChangedCallback;

    shuffle();
    Array.prototype.forEach.call(cards, function(card) {
        card.addEventListener("click", flipCard)
    });
}
