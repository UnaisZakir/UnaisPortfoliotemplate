// Background animated particles + gradient waves
const bg = document.getElementById('bg');
const ctx = bg.getContext('2d');
let w,h,particles=[]; function resize(){ w=bg.width=window.innerWidth; h=bg.height=window.innerHeight; }
window.addEventListener('resize', resize); resize();
function spawn(){
  particles = Array.from({length: 60}, ()=>({x:Math.random()*w, y:Math.random()*h, r:Math.random()*2+0.5, vx:(Math.random()-.5)*0.2, vy:(Math.random()-.5)*0.2, a:Math.random()*0.5+0.2}));
}
spawn();
function drawBG(){
  ctx.clearRect(0,0,w,h);
  // gradient waves
  const grad = ctx.createRadialGradient(w*0.1,h*0.1,0, w*0.1,h*0.1, Math.max(w,h)*0.8);
  grad.addColorStop(0,'rgba(212,175,55,0.08)');
  grad.addColorStop(1,'transparent');
  ctx.fillStyle = grad; ctx.fillRect(0,0,w,h);

  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(212,175,55,${p.a})`; ctx.fill();
  });
  requestAnimationFrame(drawBG);
}
drawBG();

// Scroll progress
const sp = document.getElementById('scrollProgress');
window.addEventListener('scroll', ()=>{
  const d = document.documentElement;
  const pct = (d.scrollTop/(d.scrollHeight - d.clientHeight))*100;
  sp.style.width = pct + '%';
});

// Custom cursor with ring
const dot = document.getElementById('cursor-dot'), ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e=>{
  dot.style.left = e.clientX+'px'; dot.style.top = e.clientY+'px';
  ring.style.left = e.clientX+'px'; ring.style.top = e.clientY+'px';
});
document.addEventListener('mousedown', ()=>{ ring.style.width='32px'; ring.style.height='32px'; ring.style.opacity='0.7'; });
document.addEventListener('mouseup', ()=>{ ring.style.width='44px'; ring.style.height='44px'; ring.style.opacity='1'; });

// Typewriter
const tw = document.querySelector('.typewriter');
const text = tw?.dataset.text || '';
let ti = 0; function type(){ tw.textContent = text.slice(0,ti++); if(ti<=text.length) setTimeout(type, 40); }
if(tw) type();

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); });
}, {threshold: .12});
document.querySelectorAll('.reveal, .panel').forEach(el=> io.observe(el));

// Skills progress animation
const io2 = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.querySelectorAll('.bar i').forEach(i=>{ i.style.width = getComputedStyle(i).getPropertyValue('--w') || '80%'; });
      io2.unobserve(e.target);
    }
  });
}, {threshold:.3});
document.querySelectorAll('#skills .panel').forEach(el=> io2.observe(el));

// Sidebar active link highlight + smooth scroll
document.querySelectorAll('.nav-item').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});
const sections = [...document.querySelectorAll('section')];
function setActive(){
  let idx = 0;
  const y = window.scrollY + 120;
  sections.forEach((s,i)=>{ if(s.offsetTop <= y) idx = i; });
  document.querySelectorAll('.nav-item').forEach((n,i)=> n.classList.toggle('active', i===idx));
}
window.addEventListener('scroll', setActive); setActive();

// 3D tilt
document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width, y = (e.clientY - r.top)/r.height;
    const rx = (y-0.5)*10, ry = (x-0.5)*-10;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', ()=> card.style.transform='none');
});

// Carousel autoplay with dots
document.querySelectorAll('.carousel').forEach(c=>{
  const cards = c.querySelector('.cards');
  const slides = c.querySelectorAll('.card');
  const dots = c.querySelector('.dots');
  let i=0;
  slides.forEach((_,idx)=>{
    const b = document.createElement('button');
    b.addEventListener('click', ()=>{ i=idx; update(); });
    dots.appendChild(b);
  });
  function update(){
    const w = slides[0].offsetWidth + 16;
    cards.style.transform = `translateX(${-i*w}px)`;
    [...dots.children].forEach((d,di)=> d.classList.toggle('active', di===i));
  }
  update();
  if(c.dataset.autoplay){
    setInterval(()=>{ i = (i+1) % slides.length; update(); }, 3000);
  }
  window.addEventListener('resize', update);
});

// Contact demo
document.getElementById('contactForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  document.getElementById('sent').hidden = false;
  e.target.reset();
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();
