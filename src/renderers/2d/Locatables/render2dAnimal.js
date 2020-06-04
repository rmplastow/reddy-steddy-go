import "./render2dAnimal.css";

function renderHead() {
  return `<div class="head"></div>`;
}
function renderLegs(legs) {
  return [...Array(legs)]
    .map((_, index) => `<div class="leg leg-${index}"></div>`)
    .join("");
}
function renderTail() {
  return `<div class="tail"></div>`;
}
function renderTorso() {
  return `<div class="torso"></div>`;
}

export default function render2dAnimal(animal) {
  return `
  <div
    class="Locatable Animal ${animal.kind}"
    id="${animal.id}"
    style="background:linear-gradient(${animal.color} 30%, #000);"
  >
  ${renderHead()}
  ${renderLegs(animal.numberOfLegs)}
  ${renderTail()}
  ${renderTorso()}
  </div>
  `;
}
