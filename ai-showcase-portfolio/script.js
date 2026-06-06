const filterButtons = document.querySelectorAll(".filter-button");
const showcaseCards = document.querySelectorAll(".showcase-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    showcaseCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

const canvas = document.getElementById("productCanvas");
const ctx = canvas.getContext("2d");
let angle = 0;
let velocity = 0.018;
let playing = true;

function drawRoundedRect(x, y, width, height, radius, fillStyle) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function drawProduct() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const background = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  background.addColorStop(0, "#0f171f");
  background.addColorStop(0.5, "#213642");
  background.addColorStop(1, "#17212b");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2 + 16);

  ctx.fillStyle = "rgba(255,255,255,0.09)";
  ctx.beginPath();
  ctx.ellipse(0, 148, 178, 34, 0, 0, Math.PI * 2);
  ctx.fill();

  const wobble = Math.sin(angle) * 52;
  const width = 184 + Math.cos(angle) * 44;
  const side = Math.max(22, Math.abs(Math.sin(angle)) * 70);
  const x = -width / 2;
  const y = -142;

  const body = ctx.createLinearGradient(x, y, x + width, y + 270);
  body.addColorStop(0, "#ffffff");
  body.addColorStop(0.34, "#e7f1ed");
  body.addColorStop(0.35, "#2ba39b");
  body.addColorStop(0.74, "#1f8a8a");
  body.addColorStop(0.75, "#17212b");
  body.addColorStop(1, "#0e151b");

  drawRoundedRect(x + wobble * 0.18, y, width, 270, 28, body);

  ctx.fillStyle = "rgba(255,255,255,0.25)";
  drawRoundedRect(x + 26 + wobble * 0.08, y + 24, width * 0.48, 18, 9, "rgba(255,255,255,0.6)");
  drawRoundedRect(x + 26 + wobble * 0.08, y + 58, width * 0.68, 8, 4, "rgba(23,33,43,0.18)");
  drawRoundedRect(x + 26 + wobble * 0.08, y + 76, width * 0.54, 8, 4, "rgba(23,33,43,0.14)");

  ctx.fillStyle = "#f1b84b";
  ctx.beginPath();
  ctx.arc(x + width - 48 + wobble * 0.08, y + 210, 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.beginPath();
  ctx.moveTo(x + width, y + 28);
  ctx.lineTo(x + width + side, y + 58);
  ctx.lineTo(x + width + side, y + 232);
  ctx.lineTo(x + width, y + 270);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "700 15px system-ui, sans-serif";
  ctx.fillText("AI Product Storyboard", 28, 42);
  ctx.fillStyle = "rgba(255,255,255,0.42)";
  ctx.fillText("Campaign · Brochure · Presentation · 3D showcase", 28, 68);
}

function tick() {
  if (playing) angle += velocity;
  drawProduct();
  requestAnimationFrame(tick);
}

document.querySelectorAll("[data-spin]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.spin;
    if (action === "left") {
      velocity = -Math.abs(velocity || 0.018);
      playing = true;
    }
    if (action === "right") {
      velocity = Math.abs(velocity || 0.018);
      playing = true;
    }
    if (action === "toggle") {
      playing = !playing;
      button.textContent = playing ? "▶" : "Ⅱ";
    }
  });
});

tick();
