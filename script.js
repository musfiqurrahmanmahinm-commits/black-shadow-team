// tilt interaction, stats, and stars (kept lightweight)
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width - 0.5;
    const y=(e.clientY-r.top)/r.height - 0.5;
    const rx = (-y)*10;
    const ry = x*10;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='none'});
});

// stats animation
const animate = (el, end, suffix='')=>{
  let start=0;const dur=1200;const t0 = performance.now();
  const frame = (t)=>{
    const p = Math.min((t-t0)/dur,1);
    const v = Math.round(start + (end-start)*(1-Math.pow(1-p,3)));
    el.textContent = v + (suffix||'');
    if(p<1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
const s1=document.getElementById('stat-1');const s2=document.getElementById('stat-2');const s3=document.getElementById('stat-3');
if(s1) animate(s1,10,'+'); if(s2) animate(s2,100,'+'); if(s3) animate(s3,99,'%');

// stars background
const canvas=document.getElementById('stars');const ctx = canvas.getContext('2d');
let stars=[];function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);makeStars();}
function makeStars(){const count=Math.max(80,Math.floor(innerWidth/8));stars=Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.8+0.4,a:Math.random()*0.8+0.2}));}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const s of stars){ctx.beginPath();ctx.fillStyle=`rgba(255,255,255,${s.a})`;ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();s.y+=0.3; if(s.y>innerHeight) s.y=0;}}
resize();draw();setInterval(draw,40);addEventListener('resize',resize);

// footer year
document.getElementById('year').textContent = new Date().getFullYear();
