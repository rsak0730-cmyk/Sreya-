# শ্রেয়ার ম্যাজিক্যাল জন্মদিন 🧸💗

একটি Bengali interactive birthday surprise website — Teddy bear animation, floating balloons/hearts, confetti, surprise letter, mini-game এবং online birthday background song-সহ।

## ফাইল
- `index.html` — পেজের লেখা ও উপাদান
- `style.css` — ডিজাইন, অ্যানিমেশন ও responsive layout
- `script.js` — ইন্টারঅ্যাকশন, মিনি-গেম, কনফেটি এবং online music controls
- `.github/workflows/deploy.yml` — GitHub Pages auto-deploy

## GitHub Pages-এ প্রকাশ
1. ZIP unzip করো।
2. ভিতরের `Sreya_Birthday_Interactive_Magic` ফোল্ডারের সব ফাইল GitHub repository-র root-এ upload করো (hidden `.github` folder-টিও রাখতে হবে)।
3. GitHub → **Settings → Pages**-এ গিয়ে **Source: GitHub Actions** নির্বাচন করো।
4. `main` branch-এ push/upload করলে workflow website publish করবে।
5. Actions tab-এ workflow success হলে Pages link পাবে।

## Online background song
সাইটটি online birthday instrumental song-এর YouTube embed ব্যবহার করে। পেজ খোলার সঙ্গে সঙ্গে autoplay চেষ্টা করবে এবং লুপে চালানোর জন্য সেট করা আছে। তবে Chrome/Android/Safari-এর autoplay policy অনুযায়ী, কিছু ব্রাউজার শব্দসহ অটোপ্লে ব্লক করতে পারে। সে ক্ষেত্রে শ্রেয়া প্রথমবার পেজে ট্যাপ করলে গান শুরু হওয়ার জন্য আবার চেষ্টা হবে; উপরের গান বোতাম দিয়ে বন্ধ/চালু করা যাবে.

গানটি Liborio Conti-এর Happy Birthday background music: https://www.youtube.com/watch?v=zcWrDar0Mkk

## নোট
YouTube-এর online playback-এর জন্য ইন্টারনেট লাগবে। Personal message লেখার বাক্সটি স্থায়ীভাবে সংরক্ষণ করে না; কপি করে রাখতে পারো।


## অনলাইন জন্মদিনের গান
ওয়েবসাইট খোলার সময় `Happy Birthday Instrumental` MP3 অটো-প্লে করার চেষ্টা করে এবং গানটি `loop`-এ বারবার বাজে। মোবাইল ব্রাউজার শব্দসহ autoplay আটকাতে পারে; সে ক্ষেত্রে প্রথমবার পেজে ট্যাপ করলেই গান চালু হবে। গানটি Alexander-এর Orange Free Sounds থেকে:
- ট্র্যাক: https://orangefreesounds.com/happy-birthday-instrumental/
- লাইসেন্স: Creative Commons Attribution 4.0 (CC BY 4.0); attribution: “Happy Birthday Instrumental” by Alexander.
