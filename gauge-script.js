// Initialize the gauge
const gauge = new RadialGauge({
  renderTo: 'gauge',
  width: 400,
  height: 400,
  units: 'km/h',
  minValue: 0,
  maxValue: 240,
  majorTicks: [
    '0','20','40','60','80','100','120','140','160','180','200','220','240'
  ],
  minorTicks: 2,
  strokeTicks: true,
  highlights: [
    { from: 200, to: 240, color: 'rgba(200, 50, 50, .75)' }
  ],
  colorPlate: '#222',
  colorMajorTicks: '#f1c40f',
  colorMinorTicks: '#fff',
  colorTitle: '#fff',
  colorUnits: '#fff',
  colorNumbers: '#fff',
  colorNeedle: 'red',
  colorNeedleEnd: 'red',
  value: 0,
  animationRule: 'bounce',
  animationDuration: 1500
}).draw();

// Initialize the RPM gauge
const rpmGauge = new RadialGauge({
  renderTo: 'rpmGauge',
  width: 220,
  height: 220,
  units: 'rpm',
  minValue: 0,
  maxValue: 10000,
  majorTicks: [
    '0','1000','2000','3000','4000','5000','6000','7000','8000','9000','10000'
  ],
  minorTicks: 2,
  strokeTicks: true,
  highlights: [
    { from: 8000, to: 10000, color: 'rgba(200, 50, 50, .75)' }
  ],
  colorPlate: '#222',
  colorMajorTicks: '#f1c40f',
  colorMinorTicks: '#fff',
  colorTitle: '#fff',
  colorUnits: '#fff',
  colorNumbers: '#fff',
  colorNeedle: 'red',
  colorNeedleEnd: 'red',
  value: 0,
  animationRule: 'bounce',
  animationDuration: 1500
}).draw();

// Tombola data
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

// Red light sequence and revving logic
const lights = document.querySelectorAll('.light');
const revAudio = new Audio('revving.mp3');
const engineAudio = document.getElementById('engineAudio');

function resetLights() {
  lights.forEach(light => light.style.opacity = 0.2);
}

function showLights(count) {
  resetLights();
  for (let i = 0; i < count; i++) {
    lights[i].style.opacity = 1;
  }
}

function animateRevving(duration, onDone) {
  let start = Date.now();
  function animate() {
    let elapsed = Date.now() - start;
    if (elapsed > duration) {
      rpmGauge.value = 0;
      gauge.value = 0;
      if (onDone) onDone();
      return;
    }
    // Animate RPM and speed up and down
    const rpm = 4000 + Math.sin(Date.now() / 150) * 3000 + Math.random() * 1000;
    const speed = Math.abs(Math.sin(Date.now() / 200)) * 40 + Math.random() * 10;
    rpmGauge.value = rpm;
    gauge.value = speed;
    requestAnimationFrame(animate);
  }
  animate();
}

function startRaceSequence() {
  // 1. Start revving audio and lights
  revAudio.currentTime = 0;
  revAudio.loop = true;
  revAudio.play();
  let lightStep = 0;
  function nextLight() {
    lightStep++;
    showLights(lightStep);
    if (lightStep < 5) {
      setTimeout(nextLight, 600);
    } else {
      // 2. Animate revving for 1.2s
      animateRevving(1200, () => {
        // 3. Stop revving, start engine
        revAudio.pause();
        revAudio.currentTime = 0;
        if (engineAudio) {
          engineAudio.currentTime = 0;
          engineAudio.play();
        }
        // 4. Animate to final values
        const speed = Math.floor(80 + Math.random() * 160);
        const rpm = Math.floor(6000 + Math.random() * 4000);
        gauge.value = speed;
        rpmGauge.value = rpm;
        // 5. Show tombola
        updateTombola();
        // 6. Reset lights
        setTimeout(resetLights, 500);
      });
    }
  }
  nextLight();
}

document.getElementById('startRaceBtn').addEventListener('click', function() {
  startRaceSequence();
});

// Draw warning icons overlay (ABS, engine, brake) on the speedometer
function drawWarningIcons() {
  // This is a placeholder for overlaying icons. You can use images or SVGs absolutely positioned over the gauge.
  // Example: document.getElementById('absIcon').style.display = 'block';
}

// On load, show idle state
window.onload = function() {
  gauge.value = 0;
  rpmGauge.value = 0;
  resetLights();
  // Optionally hide tombola
  document.getElementById("persona").textContent = '';
  document.getElementById("track").textContent = '';
  document.getElementById("team").textContent = '';
  drawWarningIcons();
} 