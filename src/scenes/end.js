// import * as $ from "jquery";
import sceneManager from "../SceneManager";
import run from "./presents/index";

sceneManager.register({ id: "end", next: "gift" });

document.getElementById("end_trigger").addEventListener("click", initHandler);

function initHandler() {
    // $("#end").fadeOut().delay(1000).addClass("re-hidden");
    run();
    sceneManager.next("end");
}
