// Abstract floating blobs background
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Blob setup
const BLOB_COUNT = 12;
const blobs = [];
const colors = [
  "rgba(96, 165, 250, 0.28)",  // blue
  "rgba(129, 140, 248, 0.25)", // indigo
  "rgba(45, 212, 191, 0.18)"   // teal
];

for (let i = 0; i < BLOB_COUNT; i++) {
  blobs.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 120 + Math.random() * 120,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

function draw() {
  ctx.fillStyle = "rgba(5, 6, 7, 0.42)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  blobs.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;

    if (b.x - b.r < -100 || b.x + b.r > canvas.width + 100) b.vx *= -1;
    if (b.y - b.r < -100 || b.y + b.r > canvas.height + 100) b.vy *= -1;

    const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    grd.addColorStop(0, b.color);
    grd.addColorStop(1, "rgba(15, 23, 42, 0)");

    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();
