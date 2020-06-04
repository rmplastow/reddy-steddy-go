// 1. Computer Science — the real fundamentals (not especially JavaScript)
// 2. JavaScript, all on its own, not even in a browser — let fred = { eyes:2 }
// 3. JavaScript in an environment — usually browser, but could be Node, or Espruino
//      document.querySelector('p')
//      fs.readFile('/my-file.txt')
// 4. General purpose frameworks, like React
// 5. Specialist frameworks, Phaser or Mozilla A-Frame
// 6. JavaScript in Adobe Animate (used to be Flash), kinda possible in Unity

// Constants.
// These won’t change while the program runs.

const defaultLandscape = `
 # # # # #
# . . a . #
 # . # . #
  # . . A
   # # #
 `;

const hexagonWidth = 11.547005;
const hexagonHeight = 10;

const kindClasses = {
  "#": "barrier",
  ".": "grass",
  a: "npc wizard grass",
  A: "door door-a"
};

// const $habitat = document.querySelector("#habitat");
const $messages = document.querySelector("#messages");

// $habitat.style.transform = "scale(0.2)";

// State.

let gameOver = false;

function xyToLeftTop(x, y) {
  return {
    left: `${hexagonWidth * x + (y % 2 ? 0 : hexagonWidth / 2)}em`,
    top: `${hexagonHeight * y}em`
  };
}

function renderLandscapeHexagon(kind, x, y) {
  const { left, top } = xyToLeftTop(x, y);
  const kindClass = kindClasses[kind];
  return `<div id="x${x}y${y}" class="hexagon ${kindClass}" style="left:${left}; top:${top}"></div>`;
}

function renderLandscapeRow(row, y) {
  const hexagons = row
    .replace(/ {2}/g, "X ")
    .split(" ")
    .filter(h => h !== "");
  return hexagons.reduce(
    (html, kind, x) =>
      (html += kind === "X" ? "" : renderLandscapeHexagon(kind, x, y)),
    ""
  );
}

function renderLandscape(landscape) {
  const rows = landscape.split("\n").filter(row => row !== "");
  return rows.reduce(
    (html, row, y) => (html += renderLandscapeRow(row, y)),
    ""
  );
}

const reddy = {
  background: "red",
  id: "reddy",
  keys: [],
  x: 1,
  y: 2
};

const characters = {
  wizard: {
    background: "blue",
    id: "wizard",
    keys: [],
    x: 2,
    y: 2
  }
};

function renderCharacter(character, className) {
  const { left, top } = xyToLeftTop(character.x, character.y);
  return `<div id="${
    character.id
  }" class="${className}" style="left:${left}; top:${top}; background:${
    character.background
  }"><div class="head"></div><div class="torso"></div><div class="left leg"></div><div class="right leg"></div></div>`;
}

// Start the program!

document.getElementById("landscape").innerHTML = renderLandscape(
  defaultLandscape
);
document.getElementById("x1y2").classList.add("current");

document.getElementById("avatars").innerHTML = renderCharacter(reddy, "avatar");

document.getElementById("characters").innerHTML = renderCharacter(
  characters.wizard,
  "character"
);

let runningTimeout;

function updateAvatarPosition(avatar, toX, toY) {
  const dx = avatar.x - toX;
  const dy = avatar.y - toY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const duration = 500 * distance; // milliseconds
  avatar.x = toX;
  avatar.y = toY;
  const { left, top } = xyToLeftTop(avatar.x, avatar.y);
  const $avatar = document.getElementById(avatar.id);
  $avatar.style.transition = `left ${duration}ms, top ${duration}ms`;
  $avatar.style.left = left;
  $avatar.style.top = top;
  if (runningTimeout) clearTimeout(runningTimeout);
  $avatar.classList.add("running");
  setTimeout(() => $avatar.classList.remove("running"), duration);
}

// Click handlers.

function onClick(evt) {
  const { target } = evt;
  if (!target) return;
  if (gameOver) return;

  if (target.className.includes("grass")) {
    Array.from(document.querySelectorAll(".grass.current")).forEach($div =>
      $div.classList.remove("current")
    );
    const matches = target.id.match(/x(\d+)y(\d+)/);
    updateAvatarPosition(reddy, +matches[1], +matches[2]);
    target.classList.add("current");
  }

  if (target.parentNode.className.includes("character")) {
    if (!reddy.keys.includes("door")) {
      $messages.innerHTML = "<p>OK, here’s a key.</p>" + $messages.innerHTML;
      reddy.keys.push("door");
    } else {
      $messages.innerHTML =
        "<p>I already gave you a key!</p>" + $messages.innerHTML;
    }
  }

  if (target.className.includes("door")) {
    if (!reddy.keys.includes("door")) {
      $messages.innerHTML = "<p>That door is locked!</p>" + $messages.innerHTML;
      return;
    } else {
      Array.from(document.querySelectorAll(".grass.current")).forEach($div =>
        $div.classList.remove("current")
      );
      const matches = target.id.match(/x(\d+)y(\d+)/);
      updateAvatarPosition(reddy, +matches[1], +matches[2]);
      target.classList.remove("door");
      target.classList.add("current", "grass");
      $messages.innerHTML = "<p>Hooray you won!</p>" + $messages.innerHTML;
      gameOver = true;
    }
  }
}

document.body.addEventListener("click", onClick);
