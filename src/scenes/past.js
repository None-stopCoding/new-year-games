import * as $ from "jquery";
import sceneManager from "../SceneManager";
import { getElementById, getRandomInt } from "../utils";
import { startModule } from '../games/FruitNinja/scripts/all';
import '../games/FruitNinja/styles.styl';
sceneManager.register({ id: "past", next: "present" });

// init({
//     imagePath: `./images/scene-past/p-${getRandomInt(1, 6)}.jpg`,
//     el: "pazzle-game",
//     stateChangedCallback: stateChanged,
// });

getElementById("past_trigger").addEventListener("click", initHandler);

getElementById("past_run-next").addEventListener("click", runNextHandler);
//
// /**
//  *
//  */
function stateChanged(isEnd) {
    // if (isEnd) {
    setTimeout(function() {
        // $("#past_finish").removeClass("re-hidden");
        $("#past_game-field").addClass("re-hidden");
        runNextHandler();
    }, 2000);
    // }
}

function initHandler() {
    $("#past_preview").fadeOut().delay(1000).addClass("re-hidden");
    $("#past_game-field").removeClass("re-hidden").fadeIn();
    startModule("scripts/main", stateChanged);
}

function runNextHandler() {
    sceneManager.next();
}
