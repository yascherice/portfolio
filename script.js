// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  links.classList.toggle('open');
});

// Close mobile nav on link click
links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    links.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => {
  if (section.id && section.id !== 'top') {
    observer.observe(section);
  }
});

// Easter egg: berry ASMR animation → page flip
const berryImg = document.querySelector('.nav-brand img');
const front = document.getElementById('page-front');
const back  = document.getElementById('page-back');

berryImg.addEventListener('click', e => {
  e.preventDefault();
  if (document.body.dataset.side === 'back') return;
  berryImg.classList.add('berry-popping');
  berryImg.addEventListener('animationend', () => {
    berryImg.classList.remove('berry-popping');
    flipTo('back');
  }, { once: true });
});

document.getElementById('btn-flip-back').addEventListener('click', () => {
  flipTo('front');
});

// ── Star trail ──────────────────────────────────────────────

const trailColors = ['#ff69b4','#00ffff','#ffff00','#ff4500','#7fff00','#ff00ff','#00ff7f','#ffa500'];
let trailListener = null;

function startStarTrail() {
  trailListener = (e) => {
    const star = document.createElement('span');
    star.className = 'star-trail';
    star.textContent = '★';
    star.style.left = e.clientX + 'px';
    star.style.top  = e.clientY + 'px';
    star.style.color = trailColors[Math.floor(Math.random() * trailColors.length)];
    document.body.appendChild(star);
    star.addEventListener('animationend', () => star.remove());
  };
  document.addEventListener('mousemove', trailListener);
}

function stopStarTrail() {
  if (trailListener) {
    document.removeEventListener('mousemove', trailListener);
    trailListener = null;
  }
  document.querySelectorAll('.star-trail').forEach(el => el.remove());
}

// ── Win95 Popup ──────────────────────────────────────────────

const win95Popup = document.getElementById('win95-popup');

function showWin95Popup() {
  win95Popup.classList.add('open');
}

function closeWin95Popup() {
  win95Popup.classList.remove('open');
}

document.getElementById('win95-x').addEventListener('click', closeWin95Popup);
document.getElementById('win95-ok').addEventListener('click', closeWin95Popup);

// ── MIDI Player ───────────────────────────────────────────────

const midiPlayer = document.getElementById('midi-player');

function midiAutoPlay() {
  midiPlayer.classList.add('playing');
}

document.getElementById('midi-play-btn').addEventListener('click', () => {
  midiPlayer.classList.add('playing');
});

document.getElementById('midi-stop-btn').addEventListener('click', () => {
  midiPlayer.classList.remove('playing');
});

document.querySelector('.midi-close').addEventListener('click', () => {
  midiPlayer.classList.remove('playing');
});

// ── Page flip ────────────────────────────────────────────────

function flipTo(side) {
  document.body.classList.add('flipping-out');
  setTimeout(() => {
    if (side === 'back') {
      front.style.display = 'none';
      back.style.display  = 'block';
      document.body.dataset.side = 'back';
      startStarTrail();
      setTimeout(showWin95Popup, 300);
      setTimeout(midiAutoPlay, 600);
    } else {
      back.style.display  = 'none';
      front.style.display = 'block';
      document.body.dataset.side = 'front';
      stopStarTrail();
      closeWin95Popup();
      midiPlayer.classList.remove('playing');
    }
    document.body.classList.remove('flipping-out');
    document.body.classList.add('flipping-in');
    window.scrollTo(0, 0);
    document.body.addEventListener('animationend', () => {
      document.body.classList.remove('flipping-in');
    }, { once: true });
  }, 450);
}
