/* ===== State ===== */
const state = {
  location: null,
  time: null,
  color: null,
  food: null,
  vehicle: null
};

/* ===== Notification System ===== */
function showNotification(icon, title, text, type = 'info', duration = 3000) {
  const container = document.getElementById('notificationContainer');
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.innerHTML = `
    <div class="notif-icon">${icon}</div>
    <div class="notif-content">
      <div class="notif-title ${type}">${title}</div>
      <div class="notif-text">${text}</div>
    </div>
    <button class="notif-close" onclick="this.parentElement.remove()">✕</button>
  `;
  container.appendChild(notif);
  setTimeout(() => {
    notif.classList.add('hide');
    setTimeout(() => notif.remove(), 400);
  }, duration);
}

/* ===== Navigation ===== */
function switchStep(currentId, nextId) {
  const current = document.getElementById(currentId);
  const next = document.getElementById(nextId);
  current.classList.add('leaving');
  setTimeout(() => {
    current.classList.remove('active', 'leaving');
    next.classList.add('active');
  }, 400);
}

function goToStep2() {
  switchStep('step1', 'step2');
  showNotification('💪', 'آفرین!', 'میدونستم جوابت مثبته!', 'success');
}

/* ===== No Button (fixed bug) ===== */
let noClickCount = 0;

function handleNoClick() {
  const noBtn = document.getElementById('btnNo1');
  const yesBtn = document.getElementById('btnYes1');

  noClickCount++;

  if (noClickCount === 1) {
    noBtn.textContent = 'جدی؟ 😢';
    noBtn.className = 'btn btn-no shrink-1';
    yesBtn.className = 'btn btn-yes grow-1';
    showNotification('😅', 'نه؟', 'مگه میشه؟ یه بار دیگه فکر کن!', 'info', 2000);
  } else if (noClickCount === 2) {
    noBtn.textContent = 'مطمئنی؟ 😢';
    noBtn.className = 'btn btn-no shrink-2';
    yesBtn.className = 'btn btn-yes grow-2';
    showNotification('🥺', 'وای نه!', 'دلت میاد؟', 'error', 2000);
  } else if (noClickCount >= 3) {
    noBtn.className = 'btn btn-no shrink-3';
    noBtn.disabled = true;
    yesBtn.className = 'btn btn-yes grow-3';
    setTimeout(() => {
      yesBtn.style.transform = 'scale(2.3)';
    }, 200);
    showNotification('😍', 'آخه نه دیگه!', 'بذار ببرمت قرار!', 'success', 2500);
  }

  const card = document.querySelector('#step1 .glass-card');
  card.classList.remove('shake');
  void card.offsetWidth;
  card.classList.add('shake');
}

/* ===== Location ===== */
function handleLocation(btn) {
  const loc = btn.dataset.location;
  if (loc === 'دریا') {
    state.location = loc;
    btn.classList.add('selected');
    showNotification('🌊', 'بهترین انتخاب!', 'دریا همیشه حال میده!', 'success');
    setTimeout(() => switchStep('step2', 'step3'), 700);
  } else {
    const msgs = {
      'جنگل': 'وای نه اونجا پشه زیاده! 🦟',
      'کافه': 'کافه؟ نه بابا! اونجا فقط قهوه داره 😬',
      'سینما': 'فیلم‌های جدید زیاد خوب نیستن! 🙈',
      'رستوران': 'رستوران؟ چی بخوریم آخه؟ گرون هم هست تازه.! 🥴',
      'شهربازی': ' آلان حوصله شهربازی رو ندارم... 😫',

    };
    showNotification('🤪', 'نه بابا!', msgs[loc] || 'این گزینه رو دوست ندارم!', 'error', 2500);
    btn.classList.add('locked', 'shake');
    setTimeout(() => btn.classList.remove('shake'), 500);
  }
}

/* ===== Time (both correct) ===== */
function handleTime(btn) {
  state.time = btn.dataset.time;
  btn.classList.add('selected');
  const msg = state.time === 'امروز' ? 'عاشق برنامه‌ریزی لحظه آخری‌ام! ⏰' : 'صبر کردن سخته ولی ارزشش رو داره! 🌙';
  showNotification('🕒', 'زمان عالی!', msg, 'success');
  setTimeout(() => switchStep('step3', 'step4'), 700);
}

/* ===== Color ===== */
function handleColor(btn) {
  const col = btn.dataset.color;
  if (col === 'کرم') {
    state.color = col;
    btn.classList.add('selected');
    showNotification('✨', 'چه انتخاب شیکی!', 'کرم همیشه با‌کلاسه!', 'success');
    setTimeout(() => switchStep('step4', 'step5'), 700);
  } else {
    const msgs = {
      'قهوه‌ای': 'قهوه‌ای؟ مگه میخوا با درختا ست کنی؟ 😄',
      'آبی': 'آبی قشنگه ولی نه برای امروز... 🙃',
      'مشکی': 'مشکی تو این گرما؟ نه عزیزم! ☺️'
    };
    showNotification('🙅', 'نه اینو دوست ندارم!', msgs[col] || 'رنگ دیگه‌ای انتخاب کن!', 'error', 2500);
    btn.classList.add('locked', 'shake');
    setTimeout(() => btn.classList.remove('shake'), 500);
  }
}

/* ===== Food ===== */
function handleFood(btn) {
  const food = btn.dataset.food;
  if (food === 'بستنی') {
    state.food = food;
    btn.classList.add('selected');
    showNotification('🍦', 'چه انتخاب خوشمزه‌ای!', 'بستنی همیشه عالیه!', 'success');
    setTimeout(() => switchStep('step5', 'step6'), 700);
  } else {
    const msgs = {
      'ذرت مکزیکی': 'ذرت مکزیکی؟ نه ، الان حسش نیست... 🌽',
      'اسکمو': 'اسکمو؟ یه چیز جدی‌تر میخوام 🍧',
      'لواشک': 'لواشک؟ مگه زنگ تفریح مدرسه‌ست 🍬',
      'کیک': 'کیک برای عصرونه خوبه، نه برای قرار عاشقانه! 🍰',
      'خوراکی': 'خوراکی یعنی چی؟ دقیق بگو! 🍱'
    };
    showNotification('🙄', 'نه اینو دوست ندارم!', msgs[food] || 'یکم خلاقیت به خرج بده!', 'error', 2500);
    btn.classList.add('locked', 'shake');
    setTimeout(() => btn.classList.remove('shake'), 500);
  }
}

/* ===== Vehicle ===== */
function handleVehicle(btn) {
  const veh = btn.dataset.vehicle;
  if (veh === 'ماشین تو') {
    state.vehicle = veh;
    btn.classList.add('selected');
    showNotification('🚗', 'چه عالی!', 'با ماشین خودت خیلی شیک‌تره!', 'success');
    setTimeout(() => goToFinal(), 700);
  } else {
    showNotification('🏍️', 'نه بابا!', 'با موتور من؟ نه، من که هنوز موتور نخریدم... 😢', 'error', 2500);
    btn.classList.add('locked', 'shake');
    setTimeout(() => btn.classList.remove('shake'), 500);
  }
}

/* ===== Final ===== */
function goToFinal() {
  switchStep('step6', 'step7');
  const finalDate = document.getElementById('finalDate');
  const timeText = state.time === 'امروز' ? 'امروز ساعت ۱۷' : 'فردا ساعت ۲۰';
  finalDate.textContent = timeText;
  launchConfetti();
  showNotification('🎉', 'تموم شد!', 'بهترین قرار تاریخ!', 'success', 4000);
}

/* ===== Confetti ===== */
function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#b87aff', '#f062b5', '#ffd54f', '#fb7185', '#f472b6', '#c084fc', '#facc15', '#fda4af'];
  for (let i = 0; i < 90; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.left = Math.random() * 100 + '%';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width = (Math.random() * 8 + 5) + 'px';
    el.style.height = (Math.random() * 8 + 5) + 'px';
    el.style.setProperty('--fall-dur', (Math.random() * 2.5 + 2) + 's');
    el.style.setProperty('--fall-delay', (Math.random() * 2) + 's');
    el.style.setProperty('--drift', (Math.random() * 240 - 120) + 'px');
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
}

/* ===== Keyboard & Misc ===== */
document.addEventListener('keydown', (e) => {
  const step1 = document.getElementById('step1');
  if (step1.classList.contains('active') && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    goToStep2();
  }
});

document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - (document.lastTouch || 0) < 500) e.preventDefault();
  document.lastTouch = now;
}, { passive: false });