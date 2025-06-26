// Hardcoded fallback data only
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

function playStartLights(callback) {
  const lightElems = document.querySelectorAll('.light');
  const revAudio = new Audio('revving.mp3');
  revAudio.loop = true;
  revAudio.play();

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      lightElems[i].style.opacity = 1;
    }, 500 * (i + 1));
  }

  setTimeout(() => {
    revAudio.pause();
    revAudio.currentTime = 0;

    lightElems.forEach(light => light.style.opacity = 0.2);

    const bgvid = document.getElementById("bgvid");
    if (bgvid) bgvid.play();

    const engineSound = document.getElementById("engineAudio");
    if (engineSound) engineSound.play();

    callback();
  }, 3500);
}

function spin() {
  document.gauge.options.value = 0;
  document.gauge.draw();

  playStartLights(() => {
    const targetValue = Math.floor(Math.random() * 240) + 20;
    let currentValue = 0;

    const interval = setInterval(() => {
      if (currentValue >= targetValue) {
        clearInterval(interval);
        updateTombola();
        return;
      }
      currentValue += 10;
      document.gauge.options.value = currentValue;
      document.gauge.draw();
    }, 50);
  });
}

window.onload = () => {
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.5;

  const gaugeConfig = {
    renderTo: 'speedGauge',
    width: size,
    height: size,
    minValue: 0,
    maxValue: 240,
    value: 0,
    majorTicks: ["0", "40", "80", "120", "160", "200", "240"],
    highlights: [
      { from: 200, to: 240, color: "rgba(255,30,0,.25)" }
    ],
    needleType: "arrow",
    needleColor: "red",
    valueBox: true,
    colorPlate: "#E5F1FA",
    colorMajorTicks: "#000",
    colorMinorTicks: "#333",
    colorTitle: "#000",
    colorUnits: "#000",
    colorNumbers: "#000"
  };

  document.gauge = new RadialGauge(gaugeConfig).draw();

  window.onresize = () => {
    const newSize = Math.min(window.innerWidth, window.innerHeight) * 0.5;
    gaugeConfig.width = newSize;
    gaugeConfig.height = newSize;
    document.gauge.update(gaugeConfig).draw();
  };
};
