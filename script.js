// Terminal typing effect
const words = ["home", "post", "about"];
const delay = 100;
const hold = 2000;
const changingText = document.getElementById("changingText");
const changingLink = document.getElementById("changingLink");

let i = 0, charIndex = 0;
let currentWord = "";

function randomChar() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}

function typeNextChar() {
  if (charIndex < currentWord.length) {
    changingText.textContent =
      currentWord.slice(0, charIndex) +
      randomChar() +
      " ".repeat(currentWord.length - charIndex - 1);
    charIndex++;
    setTimeout(typeNextChar, delay);
  } else {
    changingText.textContent = currentWord;

    // Handle link behavior
    if (currentWord === "post") {
      changingLink.href = "#";
      changingLink.onclick = (e) => {
        e.preventDefault();
        showPopup();
      };
    } else {
      const page = currentWord === "home" ? "index.html" : currentWord + ".html";
      changingLink.href = page;
      changingLink.onclick = null; // Remove popup handler if switching away
    }

    setTimeout(nextWord, hold);
  }
}

function nextWord() {
  i = (i + 1) % words.length;
  currentWord = words[i];
  charIndex = 0;
  typeNextChar();
}

currentWord = words[i];
typeNextChar();

// Duck generator
const duckArt = [
  `  __\n<(o )___\n ( ._>  )\n  \`---'`,
  `   __\n<(° )\n (   )>\n  \`-'`,
  `   ___\n  (o o)\n (  V  )\n  \`---'`,
  `   _\n __(.)< Quack!\n \\___)`,
  `   __\n<(v )\n (   )\\\n  \`--'`,
  `   _\n (o )\n<(   )\n  \`~~'`,
  `   __\n (•ᴥ•)\n<(    )>\n  \`--'`,
  `   __\n<(•_•)>\n (___)\n  \`--'`,
  `  ___\n<( -_- )\n (     )\n  \`---'`,
  `   __\n<( >_< )>\n (     )\n  \`-~'`
];

function spawnDuck() {
  const duck = document.createElement("pre");
  duck.className = "goose";
  duck.textContent = duckArt[Math.floor(Math.random() * duckArt.length)];

  const top = Math.floor(Math.random() * 60) + 10;
  const fromRight = Math.random() > 0.5;

  duck.style.top = `${top}%`;
  document.getElementById("gooseContainer").appendChild(duck);

  const screenW = window.innerWidth;
  let pos = fromRight ? screenW : -300;
  const speed = 1 + Math.random();

  function move() {
    pos += fromRight ? -speed : speed;
    duck.style.left = pos + "px";

    if ((fromRight && pos < -300) || (!fromRight && pos > screenW + 300)) {
      duck.remove();
    } else {
      requestAnimationFrame(move);
    }
  }

  move();
}

setInterval(spawnDuck, 3000);
spawnDuck();

// Popup controls
function showPopup() {
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}
