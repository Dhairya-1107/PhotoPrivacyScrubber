const startBtn = document.getElementById("startBtn");
const workspace = document.getElementById("workspace");
const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const previewPanel = document.getElementById("previewPanel");
const previewImage = document.getElementById("previewImage");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const results = document.getElementById("results");
const metadataGrid = document.getElementById("metadataGrid");
const scoreValue = document.getElementById("scoreValue");
const scoreLabel = document.getElementById("scoreLabel");
const scrubBtn = document.getElementById("scrubBtn");
const verification = document.getElementById("verification");
const downloadBtn = document.getElementById("downloadBtn");
const beforeText = document.getElementById("beforeText");
const afterText = document.getElementById("afterText");
const resetBtn = document.getElementById("resetBtn");

let currentFile = null;
let currentObjectUrl = null;
let currentMetadata = {};
let scrubbedUrl = null;

startBtn.addEventListener("click", () => {
  workspace.classList.remove("hidden");
  workspace.scrollIntoView({ behavior: "smooth" });
});

fileInput.addEventListener("change", e => {
  if (e.target.files[0]) handleFile(e.target.files[0]);
});

["dragenter", "dragover"].forEach(evt => {
  dropZone.addEventListener(evt, e => {
    e.preventDefault();
    dropZone.classList.add("dragging");
  });
});
["dragleave", "drop"].forEach(evt => {
  dropZone.addEventListener(evt, e => {
    e.preventDefault();
    dropZone.classList.remove("dragging");
  });
});
dropZone.addEventListener("drop", e => {
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) handleFile(file);
});

async function handleFile(file) {
  currentFile = file;
  currentMetadata = {};
  verification.classList.add("hidden");
  results.classList.add("hidden");

  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  currentObjectUrl = URL.createObjectURL(file);

  previewImage.src = currentObjectUrl;
  previewPanel.classList.remove("hidden");
  fileName.textContent = file.name;
  fileSize.textContent = formatBytes(file.size);

  results.classList.remove("hidden");
  metadataGrid.innerHTML = `<div class="meta-card"><div class="meta-value">Scanning metadata…</div></div>`;
  await scanMetadata(file);
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function scanMetadata(file) {
  try {
    const tags = await ExifReader.load(file, { expanded: true });

    console.log("========== PHOTO METADATA ==========");
    console.log(tags);
    console.log("====================================");

    currentMetadata = tags || {};

    renderMetadata(tags || {});

  } catch (error) {
    console.error("METADATA ERROR:", error);

    currentMetadata = {};

    renderMetadata({});
  }
}

function findTag(tags, keys) {
  const sections = [
    tags?.gps,
    tags?.exif,
    tags?.xmp,
    tags?.iptc,
    tags?.composite,
    tags
  ];

  for (const section of sections) {
    if (!section) continue;

    for (const key of keys) {
      const tag = section[key];

      if (!tag) continue;

      if (tag.description !== undefined) {
        return tag.description;
      }

      if (tag.computed !== undefined) {
        return tag.computed;
      }

      if (tag.value !== undefined) {
        return tag.value;
      }
    }
  }

  return null;
}

function renderMetadata(tags) {
  const gpsLat = findTag(tags, ["Latitude", "GPSLatitude"]);
  const gpsLon = findTag(tags, ["Longitude", "GPSLongitude"]);
  const gps = gpsLat != null && gpsLon != null ? `${gpsLat}, ${gpsLon}` : null;

  const device = findTag(tags, ["Model", "CameraModelName"]);
  const make = findTag(tags, ["Make"]);
  const camera = device || make;
  const date = findTag(tags, ["DateTimeOriginal", "DateTimeDigitized", "DateTime"]);
  const dimensions = `${previewImage.naturalWidth || "?"} × ${previewImage.naturalHeight || "?"}`;

  const items = [
    { icon: "📍", name: "GPS location", value: gps, risk: true },
    { icon: "📱", name: "Device / camera", value: camera, risk: true },
    { icon: "🕐", name: "Capture time", value: date, risk: true },
    { icon: "▣", name: "Image dimensions", value: dimensions, risk: false }
  ];

  metadataGrid.innerHTML = items.map(item => `
    <div class="meta-card ${item.value ? (item.risk ? "risk" : "safe") : "safe"}">
      <div class="meta-icon">${item.icon}</div>
      <div class="meta-name">${item.name}</div>
      <div class="meta-value">${item.value ? escapeHtml(String(item.value)) : "Not detected"}</div>
    </div>
  `).join("");

  const detectedRiskCount = items.filter(x => x.risk && x.value).length;
  const score = Math.min(100, detectedRiskCount * 25);
  scoreValue.textContent = score;
  scoreLabel.textContent = score >= 75 ? "HIGH" : score >= 50 ? "MEDIUM" : score >= 25 ? "LOW" : "SAFE";
  scoreLabel.style.color = score >= 75 ? "var(--danger)" : score >= 50 ? "var(--warning)" : "var(--accent)";
  beforeText.textContent = detectedRiskCount
    ? `${detectedRiskCount} privacy-related metadata categor${detectedRiskCount === 1 ? "y was" : "ies were"} detected.`
    : "No targeted privacy metadata was detected.";
}

scrubBtn.addEventListener("click", async () => {
  if (!currentFile) return;
  scrubBtn.disabled = true;
  scrubBtn.textContent = "Scrubbing…";

  try {
    const img = new Image();
    img.src = currentObjectUrl;
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    scrubbedUrl = await new Promise(resolve => canvas.toBlob(blob => {
      resolve(URL.createObjectURL(blob));
    }, "image/jpeg", 0.94));

    downloadBtn.href = scrubbedUrl;
    verification.classList.remove("hidden");
    afterText.textContent = "A new Canvas export was created; the original EXIF metadata is not carried into the exported image.";
    verification.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    alert("Could not scrub this image. Please try another image.");
    console.error(error);
  } finally {
    scrubBtn.disabled = false;
    scrubBtn.textContent = "🛡 Scrub photo";
  }
});

resetBtn.addEventListener("click", () => {
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  if (scrubbedUrl) URL.revokeObjectURL(scrubbedUrl);
  currentFile = null;
  fileInput.value = "";
  previewPanel.classList.add("hidden");
  results.classList.add("hidden");
  verification.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0)} ${units[i]}`;
}
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[c]));
}
