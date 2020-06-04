import { Renderer } from "../src/renderers/AbstractRenderer";
import { Boar } from "../src/classes/Locatables/Animals/Boar";

import render from "../src/renderers/2d/render";

// Create a 2D CSS renderer.

const $animals = document.querySelector("#animals");

let firstBoar = new Boar("firstBoar", Renderer);
// let secondBoar = new Boar();

console.log(render.animal(firstBoar));

$animals.innerHTML += render.animal(firstBoar);
const $firstBoar = document.querySelector("#firstBoar");

// Toggle jogging.
const $jog = document.querySelector("#jog");
let isRunning = false;
function toggleRunning() {
  if (isRunning) {
    isRunning = false;
    $firstBoar.classList.remove("jogging");
    $jog.innerText = "Jog";
  } else {
    isRunning = true;
    $firstBoar.classList.add("jogging");
    $jog.innerText = "Stop";
  }
}
$jog.addEventListener("click", toggleRunning);
