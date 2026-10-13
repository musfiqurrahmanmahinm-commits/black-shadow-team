(function(){
  const mascot = document.getElementById('mascot');
  if (!mascot) return;

  const leftEye = mascot.querySelector('.eye-left');
  const rightEye = mascot.querySelector('.eye-right');
  const pupils = mascot.querySelectorAll('.pupil');
  const speech = document.getElementById('mascot-speech');
  const leftHand = mascot.querySelector('.hand-left');
  const rightHand = mascot.querySelector('.hand-right');

  setTimeout(() => speech.classList.add('show'), 500);
  setTimeout(() => speech.classList.remove('show'), 4200);

  setTimeout(() => {
    if (rightHand) rightHand.classList.add('wave');
    setTimeout(() => rightHand && rightHand.classList.remove('wave'), 1200);
  }, 800);

  function blink() {
    [leftEye, rightEye].forEach((e) => e && e.classList.add('blink'));
    setTimeout(() => [leftEye, rightEye].forEach((e) => e && e.classList.remove('blink')), 320);
  }

  setInterval(() => {
    if (Math.random() > 0.6) blink();
  }, 2800 + Math.random() * 2000);

  document.addEventListener('mousemove', (ev) => {
    const rect = mascot.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (ev.clientX - cx) / rect.width;
    const dy = (ev.clientY - cy) / rect.height;
    const max = 8;

    pupils.forEach((p) => {
      const tx = Math.max(-max, Math.min(max, dx * max * 1.6));
      const ty = Math.max(-max, Math.min(max, dy * max * 1.2));
      p.style.transform = `translate(${tx}px, ${ty}px)`;
    });
  });

  mascot.addEventListener('click', () => {
    if (speech) {
      speech.classList.add('show');
      setTimeout(() => speech.classList.remove('show'), 3000);
    }
    if (leftHand) leftHand.classList.add('wave');
    setTimeout(() => leftHand && leftHand.classList.remove('wave'), 1100);
  });
})();

const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const r = card.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    const y = (event.clientY - r.top) / r.height - 0.5;
    const rx = -y * 10;
    const ry = x * 10;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'none';
  });
});

const animate = (el, end, suffix = '') => {
  let start = 0;
  const dur = 1200;
  const t0 = performance.now();
  const frame = (t) => {
    const p = Math.min((t - t0) / dur, 1);
    const v = Math.round(start + (end - start) * (1 - Math.pow(1 - p, 3)));
    el.textContent = v + (suffix || '');
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

const s1 = document.getElementById('stat-1');
const s2 = document.getElementById('stat-2');
const s3 = document.getElementById('stat-3');
if (s1) animate(s1, 10, '+');
if (s2) animate(s2, 100, '+');
if (s3) animate(s3, 99, '%');

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  makeStars();
}
function makeStars() {
  const count = Math.max(80, Math.floor(innerWidth / 8));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.8 + 0.4,
    a: Math.random() * 0.8 + 0.2
  }));
}
function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const s of stars) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += 0.3;
    if (s.y > innerHeight) s.y = 0;
  }
}
resize();
draw();
setInterval(draw, 40);
window.addEventListener('resize', resize);
document.getElementById('year').textContent = new Date().getFullYear();
