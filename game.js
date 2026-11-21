// A radius is measured from the middle of the target to one edge.
const PERFECT_RADIUS = 0.06;
const CATCH_RADIUS = 0.15;

// Each wave has a target position and a one-way travel time in milliseconds.
const waves = [
  { target: 0.50, travel: 1200 },
  { target: 0.66, travel: 1100 },
  { target: 0.40, travel: 1000 },
  { target: 0.58, travel: 950 },
  { target: 0.47, travel: 850 }
];

const button = document.querySelector("#action");
const statusLine = document.querySelector("#status");
const waveLabel = document.querySelector("#wave");
const scoreLabel = document.querySelector("#score");
const bestLabel = document.querySelector("#best");
const marker = document.querySelector("#marker");
const storageKey = "swell-window.best.v1";
let waveIndex = 0;
let score = 0;
let best = null;
let phase = "ready";
let startTime = 0;
let markerPosition = 0;
let frame = 0;

try {
  const saved = localStorage.getItem(storageKey);
  if (saved !== null && /^\d+$/.test(saved) && Number(saved) <= waves.length * 3) {
    best = Number(saved);
    bestLabel.textContent = best;
  }
} catch { /* A set can still be played when browser storage is unavailable. */ }

function setTarget() {
  for (const [id, radius] of [["zone", CATCH_RADIUS], ["perfect", PERFECT_RADIUS]]) {
    const band = document.getElementById(id);
    band.style.left = waves[waveIndex].target * 100 + "%";
    band.style.width = radius * 200 + "%";
  }
}

function animate(now) {
  if (phase !== "riding") return;
  const elapsed = Math.max(0, now - startTime);
  const progress = (elapsed / waves[waveIndex].travel) % 2;
  markerPosition = 1 - Math.abs(1 - progress);
  marker.style.left = markerPosition * 100 + "%";
  frame = requestAnimationFrame(animate);
}

function startWave() {
  phase = "riding";
  waveLabel.textContent = (waveIndex + 1) + " / " + waves.length;
  setTarget();
  startTime = performance.now();
  animate(startTime);
  statusLine.textContent = "Time your takeoff. Catch the marker inside the zone.";
  button.textContent = "Catch wave";
}

function catchWave() {
  cancelAnimationFrame(frame);
  const distance = Math.abs(markerPosition - waves[waveIndex].target);
  let points = 0;
  let result = markerPosition < waves[waveIndex].target ? "Too early." : "Too late.";
  if (distance <= PERFECT_RADIUS) {
    points = 3;
    result = "Perfect takeoff! +3.";
  } else if (distance <= CATCH_RADIUS) {
    points = 1;
    result = "Caught it! +1.";
  }
  score += points;
  scoreLabel.textContent = score;
  if (waveIndex + 1 < waves.length) {
    phase = "between";
    button.textContent = "Next wave";
    statusLine.textContent = result;
    return;
  }
  phase = "finished";
  if (best === null || score > best) {
    best = score;
    bestLabel.textContent = best;
    try { localStorage.setItem(storageKey, String(best)); } catch { /* Keep the session best. */ }
  }
  statusLine.textContent = result + " Set complete. " + score + " of " + (waves.length * 3) + " points.";
  button.textContent = "Surf again";
}

function takeAction() {
  if (phase === "riding") {
    catchWave();
    return;
  }
  if (phase === "between") {
    waveIndex += 1;
  } else {
    waveIndex = 0;
    score = 0;
    scoreLabel.textContent = score;
  }
  startWave();
}

button.addEventListener("click", takeAction);
document.addEventListener("keydown", event => {
  if (event.code !== "Space" || event.ctrlKey || event.metaKey || event.altKey) return;
  event.preventDefault();
  if (!event.repeat) takeAction();
});
setTarget();
marker.style.left = "0%";
