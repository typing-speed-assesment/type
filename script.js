(() => {
  const PASSAGES = [
    "The quick brown fox jumps over the lazy dog. Practice every day to build speed and accuracy.",
    "Typing tests measure how quickly and accurately you can transcribe text. Keep your posture straight and fingers light.",
    "Small, daily practice sessions are better than occasional long marathons. Focus on accuracy first, speed will follow.",
    "Consistency beats intensity. Keep practicing, track progress, and aim for small improvements each session."
  ];

  const passageEl = document.getElementById('passage');
  const inputEl = document.getElementById('input');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const nextBtn = document.getElementById('nextBtn');
  const durationSel = document.getElementById('duration');

  const timeEl = document.getElementById('time');
  const wpmEl = document.getElementById('wpm');
  const accEl = document.getElementById('acc');
  const typedEl = document.getElementById('typed');
  const mistakesEl = document.getElementById('mistakes');
  const bestEl = document.getElementById('best');

  let passageIndex = 0;
  let chars = [];
  let started = false;
  let startTime = null;
  let timerId = null;
  let timeLeft = 0;
  let duration = parseInt(durationSel.value, 10);

  let totalTyped = 0;
  let mistakes = 0;

  const BEST_KEY = 'typing_best_wpm_v1';
  function loadBest(){ const b = localStorage.getItem(BEST_KEY); bestEl.textContent = b ? Math.round(Number(b)) : '--'; }
  loadBest();

  function loadPassage(index){
    passageEl.innerHTML = '';
    const text = PASSAGES[index % PASSAGES.length];
    chars = text.split('');
    chars.forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch;
      span.dataset.index = i;
      passageEl.appendChild(span);
    });
    setCurrentChar(0);
  }

  function setCurrentChar(i){
    passageEl.querySelectorAll('.char.current').forEach(el => el.classList.remove('current'));
    const el = passageEl.querySelector(`.char[data-index="${i}"]`);
    if(el) el.classList.add('current');
    if(el) el.scrollIntoView({behavior:'smooth', block:'nearest', inline:'nearest'});
  }

  function resetStats(){
    started = false;
    startTime = null;
    if(timerId) { clearInterval(timerId); timerId = null; }
    duration = parseInt(durationSel.value, 10);
    timeLeft = duration;
    totalTyped = 0; mistakes = 0;
    updateDisplay(0, 100);
    timeEl.textContent = formatTime(timeLeft);
    typedEl.textContent = '0';
    mistakesEl.textContent = '0';
    inputEl.value = '';
    passageEl.querySelectorAll('.char').forEach(span => {
      span.classList.remove('correct','wrong','current');
    });
    setCurrentChar(0);
    startBtn.textContent = 'Start';
    startBtn.setAttribute('aria-pressed','false');
  }

  function formatTime(sec){
    return (sec>=60) ? Math.floor(sec/60)+':' + String(sec%60).padStart(2,'0') : sec + 's';
  }

  function updateDisplay(wpm, accuracy){
    wpmEl.textContent = Math.round(wpm);
    accEl.textContent = Math.round(accuracy) + '%';
  }

  function finishTest(){
    started = false;
    if(timerId) { clearInterval(timerId); timerId = null; }
    startBtn.textContent = 'Start';
    startBtn.setAttribute('aria-pressed','false');
    const finalWPM = Number(wpmEl.textContent) || 0;
    const prev = Number(localStorage.getItem(BEST_KEY) || 0);
    if(finalWPM > prev){
      localStorage.setItem(BEST_KEY, String(finalWPM));
      loadBest();
    }
    inputEl.blur();
  }

  function tick(){
    if(timeLeft <= 0){
      finishTest();
      timeEl.textContent = formatTime(0);
      return;
    }
    timeLeft--;
    timeEl.textContent = formatTime(timeLeft);
    computeStats();
    if(timeLeft <= 0) finishTest();
  }

  function computeStats(){
    const typed = inputEl.value;
    totalTyped = typed.length;
    let correctChars = 0;
    let localMistakes = 0;
    for(let i=0;i<chars.length;i++){
      const span = passageEl.querySelector(`.char[data-index="${i}"]`);
      const typedCh = typed[i];
      span.classList.remove('correct','wrong','current');
      if(typedCh == null){
      } else if(typedCh === chars[i]){
        span.classList.add('correct');
        correctChars++;
      } else {
        span.classList.add('wrong');
        localMistakes++;
      }
    }
    mistakes = localMistakes;
    mistakesEl.textContent = String(mistakes);
    typedEl.textContent = String(totalTyped);

    const elapsed = started ? (duration - timeLeft) : 0;
    let wpm = 0;
    if(elapsed > 0){
      wpm = (correctChars * 60) / (5 * elapsed);
    } else {
      wpm = 0;
    }

    let accuracy = totalTyped > 0 ? (correctChars / totalTyped) * 100 : 100;

    updateDisplay(wpm, accuracy);

    setCurrentChar(totalTyped);
  }

  startBtn.addEventListener('click', () => {
    if(!started){
      duration = parseInt(durationSel.value, 10);
      timeLeft = duration;
      started = true;
      startTime = Date.now();
      startBtn.textContent = 'Running...';
      startBtn.setAttribute('aria-pressed','true');
      inputEl.focus();
      if(timerId) clearInterval(timerId);
      timerId = setInterval(tick, 1000);
    } else {
      finishTest();
    }
  });

  resetBtn.addEventListener('click', () => {
    resetStats();
  });

  nextBtn.addEventListener('click', () => {
    passageIndex = (passageIndex + 1) % PASSAGES.length;
    loadPassage(passageIndex);
    resetStats();
  });

  durationSel.addEventListener('change', () => {
    duration = parseInt(durationSel.value, 10);
    timeLeft = duration;
    timeEl.textContent = formatTime(timeLeft);
  });

  inputEl.addEventListener('input', () => {
    computeStats();
  });

  inputEl.addEventListener('paste', (e) => {
    e.preventDefault();
  });

  passageEl.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      startBtn.click();
    }
  });

  loadPassage(passageIndex);
  resetStats();

  passageEl.addEventListener('click', () => inputEl.focus());

  setInterval(() => {
    if(started) computeStats();
  }, 150);

})();