const musicButton = document.querySelector(".music");

let sounds = [];
let audio = null;

async function loadSounds() {
  const response = await fetch("sounds/sounds.json");
  sounds = await response.json();
}

function playRandomTrack() {
  if (sounds.length === 0) return;

  const track = sounds[Math.floor(Math.random() * sounds.length)];
  audio = new Audio("sounds/" + track.file);
  audio.volume = 0.45;
  audio.addEventListener("ended", playRandomTrack);
  audio.play();
}

musicButton.addEventListener("click", async () => {
  if (audio === null) {
    await loadSounds();
    playRandomTrack();
  } else if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }

  musicButton.classList.toggle("playing", audio !== null && !audio.paused);
});
