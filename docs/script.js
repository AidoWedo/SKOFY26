const warningState = {
  engineTemp: 2,
  abs: 1,
  oil: 2,
};

function playStartLights(callback) {
  const lights = document.querySelectorAll('.light');
  const revAudio = new Audio('revving.mp3');
  revAudio.loop = true;
  revAudio.play();
  lights.forEach((light, i) => {
    setTimeout(() => { light.style.opacity = 1; }, 500 * (i + 1));
  });
  setTimeout(() => {
    revAudio.pause();
    revAudio.currentTime = 0;
    lights.forEach(light => light.style.opacity = 0.2);
    const video = document.getElementById("bgvid");
    const engineAudio = document.getElementById("engineAudio");
    if (video) video.play();
    if (engineAudio) engineAudio.play();
    callback();
  }, 3500);
}

const data = {
  personas: ["CIO", "CISO", "Network Architect", "SecOps Lead"],
  tracks: ["Finance", "Healthcare", "Retail", "Government"],
  teams: ["Mercedes", "Red Bull", "Ferrari", "McLaren"]
};

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function updateTombola() {
  document.getElementById("persona").textContent = pickRandom(data.personas);
  document.getElementById("track").textContent = pickRandom(data.tracks);
  document.getElementById("team").textContent = pickRandom(data.teams);
}

function spin() {
  playStartLights(() => {
    updateTombola();
    // Random speed above 120
    const speed = Math.floor(120 + Math.random() * 120);
    // Randomly set icon states (0 or 1)
    const iconStates = {
      engineTemp: Math.round(Math.random()),
      abs: Math.round(Math.random()),
      gas: Math.round(Math.random())
    };
    window.draw(
      speed / 240,
      iconStates
    );
  });
}

window.spin = spin;

window.onload = function() {
  // Draw idle state: speed 0, all icons off
  window.draw(0, {engineTemp:0, abs:0, gas:0});
}
