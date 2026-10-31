const enterScreen = document.getElementById("token");
const enterButton = document.getElementById("token-button");

const audio = new Audio();
audio.volume = 0.25;
audio.preload = "auto";

let sounds = [];
let index = 0;

function load() {
  audio.src = "sounds/" + sounds[index].file;
  audio.load();
}

function next() {
  index = (index + 1) % sounds.length;
  load();
  audio.play().catch(() => {});
}

const ready = fetch("sounds/sounds.json")
  .then((res) => res.json())
  .then((data) => {
    sounds = data;
    index = Math.floor(Math.random() * sounds.length);
    load();
  });

enterButton.addEventListener(
  "click",
  async () => {
    enterScreen.classList.add("is-hidden");
    setTimeout(() => enterScreen.remove(), 600);
    await ready;
    audio.play().catch(() => {});
  },
  { once: true },
);

audio.addEventListener("ended", next);
audio.addEventListener("error", next);
