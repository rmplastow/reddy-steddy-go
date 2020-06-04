import { Css2DContainer } from "../src/renderers/Css2D/Css2DContainer";
import { Boar } from "../src/renderables/Locatables/Animals/Boar";

// Create the 2D CSS renderer we’ll use to draw the Boar.
const animalContainer = new Css2DContainer("#animals");

// Create Anna, the first Boar.
const anna = new Boar("Alan", animalContainer);

// Change Anna’s color when the “Random Colour” button is clicked.
const $randomColor = document.querySelector("#random-color");
function randomizeColor() {
  anna.color = ["yellow", "pink", "cyan", "green"][~~(Math.random() * 4)];
}
$randomColor.addEventListener("click", randomizeColor);
