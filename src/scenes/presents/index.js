import fallingAnimation from "./falling";
import runParticles from './particles';
import _ from "lodash";
import sceneManager from "../../SceneManager";
sceneManager.register({ id: "gift", next: null });

let fall = fallingAnimation();
let myaudio = document.getElementById("myaudio");
let secondScene = document.getElementById("gift__second");
let letter = document.getElementById("letter");
let text = document.getElementById("text");
let textWrapper = document.getElementById("gift_letter");
let audio = new Audio("./audio/ho-ho-ho.mp3");
let envelop = document.getElementById("envelop");
audio.volume = 0.1;

export default function run() {
    fall.run();
    myaudio.volume = 0.05;
    myaudio.play();
    runParticles();

    setTimeout(() => {
        const wish = wishes[_.random(0, wishes.length)];

        showWish(wish);
    }, 4000);

    function showWish(wish) {
        text.textContent = wish;
        textWrapper.classList.remove("re-hide");

        audio.play();
        setTimeout(() => {
            envelop.classList.remove("re-hide");
            envelop.classList.add("animated");
            envelop.classList.add("tada");
            setTimeout(() => {
                letter.style.transform = "translateY(0)";
            }, 1500);
        }, 1500);
    }
}

var wishes = [
    "Счастье уже стоит за дверью.",
    "Прислушайтесь к советам интуиции.",
    "Счастье где-то рядом, обернитесь вокруг.",
    "Год слёз, но только от радости.",
    "В этом году Вас ждет море счастья.",
    "Дорога в тысячу миль начинается с первогошага.",
    "Будьте внимательны к подсказкам судьбы.",
    "Вперед и только вперед: дело, о котором Выдумаете, —правое!",
    "Доверьтесь интуиции, чем больше будетедумать, тем меньше будете понимать.",
    "Вы будете бодры и энергичны, и потому весь год пройдет отлично!",
    "Этот год будет самым лучшим и ярким.",
    "Новый год будет полон открытиями и успешными начинаниями",
    "Ни одно важное событие не пройдет мимо вас в Наступающем году!",
    "Новый год будет полон новыми открытиями и радостными событиями.",
    "Будь терпелив, и если твое решение правильно, Вселенная поддержит его.",
    "Здоровье Ваше крепче станет, вторая молодость настанет.",
    "Для сердца ожидает Вас услада -большое повышение оклада!",
    "Долой хандру и злость, и месть -получишь радостную весть.",
    "Покорив одну гору, начинай штурмовать другую...",
    "Год будет для вас ослепительным.",
    "От ярких событий и красок иногда захочется закрыть глаза.",
    "Внимательно смотрите по сторонам, чтобы не упуститьвозможность обрести свое счастье.",
    "Год для вас будет очень доходным.",
    "Год для вас будет очень результативным.",
    "Все проекты и дела, которые были намечены в прошлом, легко начнут реализовываться.",
    "Если будешь чаще улыбаться, все мечты твои начнут сбываться.",
    "Веселья полон будет год, хоть будет дел невпроворот.",
];
