let sounds = [];
let index = 0;

const audio = new Audio();
audio.volume = 0.45;

async function start() {
  const response = await fetch("sounds/sounds.json");
  sounds = await response.json();
  playTrack();
}

function playTrack() {
  audio.src = "sounds/" + sounds[index].file;
  audio.play().catch(() => {});
}

function nextTrack() {
  index = (index + 1) % sounds.length;
  playTrack();
}

audio.addEventListener("ended", nextTrack);
audio.addEventListener("error", nextTrack);

document.addEventListener("click", start, { once: true });
