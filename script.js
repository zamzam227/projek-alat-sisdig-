const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

// Mobile navigation
const menuToggle = $('#menuToggle');
const mainNav = $('#mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
$$('#mainNav a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.textContent = '☰';
}));

// Reading progress and back-to-top
const progressBar = $('#progressBar');
const backTop = $('#backTop');
function updateScrollUI(){
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = (max > 0 ? scrollY/max*100 : 0) + '%';
  backTop.classList.toggle('visible', scrollY > 550);
}
addEventListener('scroll', updateScrollUI, {passive:true});
updateScrollUI();
backTop.addEventListener('click', () => scrollTo({top:0,behavior:'smooth'}));

// Reveal animations
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

// Component filters
const filterButtons = $$('.filter-btn');
const componentCards = $$('.component-card');
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.toggle('active', b === btn));
  const filter = btn.dataset.filter;
  let count = 0;
  componentCards.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hidden', !show);
    if(show) count++;
  });
  $('#componentCount').textContent = count;
}));

// Interactive obstacle detection simulator
const slider = $('#distanceSlider');
const distanceValue = $('#distanceValue');
const distanceStatus = $('#distanceStatus');
const decisionTitle = $('#decisionTitle');
const decisionText = $('#decisionText');
const stageStatus = $('#stageStatus');
const robot = $('#miniRobot');
const obstacle = $('#obstacle');
const beam = $('#sensorBeam');
let simulationTimer;
function updateDistance(){
  const d = Number(slider.value);
  distanceValue.textContent = d;
  const safe = d > 20;
  distanceStatus.textContent = safe ? 'JALUR AMAN' : 'HALANGAN TERDETEKSI';
  distanceStatus.style.color = safe ? '#37d9b7' : '#ffc45a';
  obstacle.style.opacity = d > 70 ? '.45' : '1';
  beam.style.width = Math.max(10, Math.min(65, d*.65)) + '%';
  if(!simulationTimer){
    decisionTitle.textContent = safe ? 'Jarak aman' : 'Objek terlalu dekat';
    decisionText.textContent = safe ? 'Jarak lebih dari 20 cm. Robot dapat bergerak maju.' : 'Jarak 20 cm atau kurang. Robot perlu berhenti dan menghindar.';
    stageStatus.textContent = safe ? 'OBSTACLE CLEAR' : 'OBSTACLE DETECTED';
  }
}
slider.addEventListener('input', updateDistance);
function runSimulation(){
  clearTimeout(simulationTimer);
  const safe = Number(slider.value) > 20;
  const btn = $('#simulateBtn');
  btn.disabled = true;
  btn.textContent = 'SIMULASI BERJALAN…';
  if(safe){
    decisionTitle.textContent = 'Robot bergerak maju';
    decisionText.textContent = 'Pompa ON selama 300 ms, lalu OFF selama 700 ms. Sensor dibaca kembali.';
    stageStatus.textContent = 'FORWARD • PUMP CYCLE';
    robot.style.left = '38%';
    robot.style.transform = 'translateX(0)';
  }else{
    decisionTitle.textContent = 'Robot menghindari halangan';
    decisionText.textContent = 'Urutan: berhenti → pompa OFF → mundur 500 ms → belok kanan 700 ms.';
    stageStatus.textContent = 'STOP • REVERSE • TURN RIGHT';
    robot.style.left = '10%';
    robot.style.transform = 'rotate(-12deg)';
  }
  simulationTimer = setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Jalankan simulasi ↗';
    simulationTimer = null;
    robot.style.left = '18%';
    robot.style.transform = 'none';
    updateDistance();
  }, 2600);
}
$('#simulateBtn').addEventListener('click', runSimulation);
$('#resetSim').addEventListener('click', () => {
  clearTimeout(simulationTimer); simulationTimer = null;
  slider.value = 45; robot.style.left = '18%'; robot.style.transform = 'none';
  $('#simulateBtn').disabled = false; $('#simulateBtn').textContent = 'Jalankan simulasi ↗';
  updateDistance();
});
updateDistance();

// Poster lightbox
const posterModal = $('#posterModal');
function closeModal(){ posterModal.classList.remove('open'); posterModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
$('#openPoster').addEventListener('click', () => {
  posterModal.classList.add('open'); posterModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
});
$('#closePoster').addEventListener('click', closeModal);
posterModal.addEventListener('click', e => { if(e.target === posterModal) closeModal(); });
addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

// Demo checklist progress
const checks = $$('.check-item input');
function updateChecklist(){
  const done = checks.filter(c => c.checked).length;
  $('#checkProgress').textContent = `${done} / ${checks.length}`;
  $('#checkBar').style.width = (done/checks.length*100) + '%';
}
checks.forEach(c => c.addEventListener('change', updateChecklist));
