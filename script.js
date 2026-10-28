(() => {
  const $ = (id) => document.getElementById(id);
  const teddy = $("teddy");
  const messages = [
    "টেডি বলছে: শ্রেয়া, তোমার হাসিটা একদম ম্যাজিক! 💗",
    "একটা ভার্চুয়াল জড়িয়ে ধরা নাও! 🧸💞",
    "আজকে শুধু হাসি, কেক আর অনেক ভালোবাসা!",
    "টেডির গোপন কথা: তুমি খুব স্পেশাল! ✨"
  ];
  let messageIndex = 0;
  const wishes = [
    "তোমার প্রতিটা সকাল নতুন আশা নিয়ে আসুক, আর প্রতিটা রাত শান্তি আর খুশিতে ভরে উঠুক।",
    "তোমার স্বপ্নগুলো ডানা পাক, আর তুমি নিজের গতিতে সুন্দরভাবে এগিয়ে চলো। 🌈",
    "যেখানেই থাকো, তোমার চারপাশে যেন ভালোবাসা, হাসি আর ভালো মানুষ থাকে। 💗",
    "জীবনের ছোট ছোট মুহূর্তগুলোও যেন তোমার কাছে বড় উপহার হয়ে আসে। 🎁"
  ];
  let wishIndex = 0;

  function confetti(count = 90) {
    const layer = $("confetti-layer");
    const colors = ["#ff6fae", "#b29aff", "#ffd166", "#9be7d8", "#ff9b9b", "#fff"];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2.4 + Math.random() * 3.2) + "s";
      piece.style.setProperty("--drift", ((Math.random() - .5) * 260) + "px");
      piece.style.opacity = String(.65 + Math.random() * .35);
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      layer.appendChild(piece);
      setTimeout(() => piece.remove(), 6200);
    }
  }
  function heartsAt(x, y, count = 9) {
    const emojis = ["💗", "💖", "💕", "✨", "🌸"];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "pop-heart";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.setProperty("--x", ((Math.random() - .5) * 180) + "px");
      el.style.fontSize = (18 + Math.random() * 16) + "px";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1600);
    }
  }
  function teddyCelebrate() {
    const r = teddy.getBoundingClientRect();
    heartsAt(r.left + r.width / 2, r.top + r.height / 2, 10);
    $("teddy-message").textContent = messages[messageIndex % messages.length];
    messageIndex++;
    // Tiny friendly note: browser audio only starts after the visitor interacts.
    playChime();
  }
  teddy.addEventListener("click", teddyCelebrate);
  teddy.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); teddyCelebrate(); }
  });
  $("sprinkle").addEventListener("click", () => {
    confetti(115);
    const r = $("scene").getBoundingClientRect();
    heartsAt(r.left + r.width / 2, r.top + r.height / 2, 18);
    $("teddy-message").textContent = "ম্যাজিক! চারদিকে ভালোবাসা আর ঝিলমিল! ✨💖";
    playChime();
  });
  $("open-gift").addEventListener("click", () => {
    $("surprise").hidden = false;
    $("surprise").scrollIntoView({behavior: "smooth", block: "center"});
    confetti(125);
    playChime();
  });
  $("show-wish").addEventListener("click", () => {
    $("wish-card").hidden = false;
    $("wish-card").scrollIntoView({behavior: "smooth", block: "center"});
    confetti(65);
  });
  $("new-wish").addEventListener("click", () => {
    wishIndex = (wishIndex + 1) % wishes.length;
    $("wish-text").textContent = wishes[wishIndex];
    heartsAt(window.innerWidth / 2, window.innerHeight / 2, 8);
  });
  $("copy-wish").addEventListener("click", async () => {
    const text = "শুভ জন্মদিন, শ্রেয়া! 🎂💗\\nতোমার জীবন হাসি, ভালোবাসা, সুস্বাস্থ্য আর সুন্দর স্বপ্নে ভরে উঠুক। সবসময় হাসতে থেকো! 🌷";
    await copyText(text, $("copy-status"), "শুভেচ্ছা কপি হয়েছে! 💗");
  });

  const answer = Math.floor(Math.random() * 3);
  let solved = false;
  document.querySelectorAll(".heart-box").forEach(btn => {
    btn.addEventListener("click", () => {
      if (solved) return;
      const choice = Number(btn.dataset.box);
      if (choice === answer) {
        solved = true;
        btn.textContent = "💗";
        btn.classList.add("found");
        $("game-status").textContent = "ইয়েই! তুমি হার্টটা খুঁজে পেয়েছ! টেডি খুব খুশি! 🎉";
        confetti(70);
        playChime();
        document.querySelectorAll(".heart-box").forEach(b => { b.disabled = true; });
      } else {
        btn.textContent = "🌸";
        btn.classList.add("missed");
        btn.disabled = true;
        $("game-status").textContent = "এখানে ফুল ছিল! আরেকটা বাক্স চেষ্টা করো 🌸";
      }
    });
  });
  $("reset-game").addEventListener("click", () => {
    solved = false;
    const nextAnswer = Math.floor(Math.random() * 3);
    document.querySelectorAll(".heart-box").forEach((btn, i) => {
      btn.disabled = false; btn.className = "heart-box"; btn.textContent = "🎁";
      btn.dataset.box = String(i);
    });
    // Keep answer mutable for each round.
    gameAnswer = nextAnswer;
    $("game-status").textContent = "আবার চেষ্টা করো! এবার কোথায় হার্ট? 💕";
  });
  let gameAnswer = answer;
  // Replace the game click logic with the mutable answer used for replays.
  document.querySelectorAll(".heart-box").forEach(btn => {
    btn.replaceWith(btn.cloneNode(true));
  });
  document.querySelectorAll(".heart-box").forEach(btn => {
    btn.addEventListener("click", () => {
      if (solved) return;
      const choice = Number(btn.dataset.box);
      if (choice === gameAnswer) {
        solved = true; btn.textContent = "💗"; btn.classList.add("found");
        $("game-status").textContent = "ইয়েই! তুমি হার্টটা খুঁজে পেয়েছ! টেডি খুব খুশি! 🎉";
        confetti(70); playChime();
        document.querySelectorAll(".heart-box").forEach(b => { b.disabled = true; });
      } else {
        btn.textContent = "🌸"; btn.classList.add("missed"); btn.disabled = true;
        $("game-status").textContent = "এখানে ফুল ছিল! আরেকটা বাক্স চেষ্টা করো 🌸";
      }
    });
  });
  $("reset-game").addEventListener("click", () => {
    solved = false;
    gameAnswer = Math.floor(Math.random() * 3);
    document.querySelectorAll(".heart-box").forEach(btn => {
      btn.disabled = false; btn.className = "heart-box"; btn.textContent = "🎁";
    });
    $("game-status").textContent = "আবার চেষ্টা করো! এবার কোথায় হার্ট? 💕";
  });

  async function copyText(text, status, success) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "absolute"; ta.style.left = "-9999px";
        document.body.appendChild(ta); ta.select();
        const ok = document.execCommand("copy"); ta.remove();
        if (!ok) throw new Error("copy unavailable");
      }
      status.textContent = success;
    } catch {
      status.textContent = "কপি করা যায়নি—লেখাটা চেপে ধরে নিজে কপি করো।";
    }
  }
  $("copy-note").addEventListener("click", () => {
    const note = $("personal-note").value.trim();
    if (!note) { $("note-status").textContent = "আগে একটা বার্তা লিখে নাও 😊"; return; }
    copyText(note, $("note-status"), "তোমার বার্তা কপি হয়েছে! 📋");
  });
  $("save-note").addEventListener("click", () => {
    $("note-status").textContent = "এই পেজ খোলা থাকা পর্যন্ত বার্তাটি রাখা হয়েছে। 💾";
  });

  // Small interaction chime for buttons and surprise effects.
  let chimeContext = null;
  function playChime() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!chimeContext) chimeContext = new AudioContextClass();
      if (chimeContext.state === "suspended") chimeContext.resume();
      const now = chimeContext.currentTime;
      [783.99, 987.77].forEach((freq, i) => {
        const osc = chimeContext.createOscillator();
        const gain = chimeContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * .1);
        gain.gain.setValueAtTime(.0001, now + i * .1);
        gain.gain.exponentialRampToValueAtTime(.025, now + i * .1 + .03);
        gain.gain.exponentialRampToValueAtTime(.0001, now + i * .1 + .22);
        osc.connect(gain); gain.connect(chimeContext.destination);
        osc.start(now + i * .1); osc.stop(now + i * .1 + .24);
      });
    } catch (_) {}
  }

  // Online Happy Birthday instrumental with automatic looping.
  // Audible autoplay can be blocked by mobile browsers until the visitor taps.
  const birthdaySong = $("birthday-song");
  let songPlaying = false;

  async function startBirthdaySong() {
    if (!birthdaySong) return;
    try {
      birthdaySong.loop = true;
      birthdaySong.volume = 0.42;
      await birthdaySong.play();
      songPlaying = true;
      $("music-toggle").setAttribute("aria-pressed", "true");
      $("music-label").textContent = "গান বন্ধ করো";
    } catch (_) {
      songPlaying = false;
      $("music-toggle").setAttribute("aria-pressed", "false");
      $("music-label").textContent = "গান চালু করতে ট্যাপ করো";
    }
  }

  function stopBirthdaySong() {
    if (!birthdaySong) return;
    birthdaySong.pause();
    songPlaying = false;
    $("music-toggle").setAttribute("aria-pressed", "false");
    $("music-label").textContent = "জন্মদিনের গান চালাও";
  }

  $("music-toggle").addEventListener("click", async () => {
    if (songPlaying && birthdaySong && !birthdaySong.paused) {
      stopBirthdaySong();
    } else {
      await startBirthdaySong();
    }
  });

  window.addEventListener("load", startBirthdaySong, { once: true });
  ["pointerdown", "keydown", "touchstart"].forEach(eventName => {
    document.addEventListener(eventName, () => {
      if (!songPlaying && birthdaySong && birthdaySong.paused) startBirthdaySong();
    }, { once: true, passive: true });
  });
  if (birthdaySong) {
    birthdaySong.addEventListener("error", () => {
      $("music-label").textContent = "গান লোড হয়নি";
    });
  }
})();