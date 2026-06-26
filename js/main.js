/* ===================================================
   main.js — บทเรียนออนไลน์โรคเอดส์
   =================================================== */

// =================== CONFIG ===================
const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzUYmE6qyhbullJDTTdGUtcktmjuObGE1Y_Fr-8-yXoLG026BuQxXltJ5lbjHqI3IZo/exec";
const SHEET_ID         = "1EYDC6zkR3xW1gRksFKpf628qTbhgEeIYNrqNXD5d3Xk";
const TEMPLATE_SLIDE_ID = "12X6GKM79_Kj23Oe9KUvHworQF3kdjOSEFPqlbOORQnc";
const FOLDER_ID        = "1DzUhhAK9dfWg7_DdoGOyStZdr8xHRXQc";

// =================== QUESTION BANK (20 ข้อ) ===================
const QUESTIONS_ORIG = [
  { q: "ไวรัสที่ทำให้เกิดโรคเอดส์มีชื่อว่าอะไร?",
    choices: ["HBV", "HIV", "HPV", "HSV"], ans: 1 },
  { q: "AIDS ย่อมาจากอะไร?",
    choices: ["Acquired Immune Deficiency Syndrome", "Acute Infectious Disease Syndrome", "Autoimmune Disorder Syndrome", "Advanced Infection Disease System"], ans: 0 },
  { q: "เชื้อ HIV ทำลายเซลล์ใดของร่างกายเป็นหลัก?",
    choices: ["เม็ดเลือดแดง", "เม็ดเลือดขาว CD4", "เกล็ดเลือด", "เซลล์ตับ"], ans: 1 },
  { q: "ข้อใดไม่ใช่ทางแพร่กระจายของเชื้อ HIV?",
    choices: ["การมีเพศสัมพันธ์ไม่ป้องกัน", "การจับมือ", "การใช้เข็มฉีดยาร่วมกัน", "จากแม่สู่ลูก"], ans: 1 },
  { q: "ยาที่ใช้รักษา HIV เรียกว่าอะไร?",
    choices: ["ยาปฏิชีวนะ", "ยาต้านไวรัส (ARV)", "ยาลดไข้", "ยาสเตียรอยด์"], ans: 1 },
  { q: "ระยะแฝงของ HIV อาจยาวนานถึงกี่ปี?",
    choices: ["1 ปี", "5 ปี", "10 ปี", "20 ปี"], ans: 2 },
  { q: "ยา PrEP ใช้สำหรับอะไร?",
    choices: ["รักษา AIDS", "ป้องกันการติดเชื้อ HIV", "เพิ่มภูมิคุ้มกัน", "ลดไข้"], ans: 1 },
  { q: "U=U หมายความว่าอะไร?",
    choices: ["ไม่มีวัคซีน=ไม่มีทางรักษา", "ตรวจไม่พบ=ถ่ายทอดไม่ได้", "เชื้อไม่ดื้อยา", "รักษาได้ภายใน 1 ปี"], ans: 1 },
  { q: "อาการใดเกิดในระยะเริ่มติดเชื้อ HIV?",
    choices: ["เป็นมะเร็ง", "ปวดหัว มีไข้ เจ็บคอ คล้ายไข้หวัด", "ตาบอด", "หูหนวก"], ans: 1 },
  { q: "การตรวจนับ CD4 บอกอะไร?",
    choices: ["ปริมาณเชื้อในเลือด", "ระดับภูมิคุ้มกัน", "ระดับน้ำตาล", "การทำงานของตับ"], ans: 1 },
  { q: "โรคใดเป็น 'โรคติดเชื้อฉวยโอกาส' ที่พบบ่อยในผู้ป่วยเอดส์?",
    choices: ["ไข้หวัดใหญ่", "วัณโรค", "โรคหัด", "โรคคางทูม"], ans: 1 },
  { q: "ข้อใดถูกต้องเกี่ยวกับการป้องกัน HIV?",
    choices: ["ใช้ถุงยางอนามัยทุกครั้ง", "ดื่มน้ำมากๆ", "กินวิตามิน C", "ออกกำลังกาย"], ans: 0 },
  { q: "ผู้ติดเชื้อ HIV ควรพบแพทย์เพื่อตรวจอะไรเป็นประจำ?",
    choices: ["X-ray ทรวงอก", "Viral Load และ CD4", "เอ็กซ์เรย์กระดูก", "ตรวจสายตา"], ans: 1 },
  { q: "ถ้าหญิงตั้งครรภ์ติดเชื้อ HIV ควรทำอย่างไร?",
    choices: ["ไม่ต้องทำอะไร", "รับยาต้านไวรัสเพื่อป้องกันการถ่ายทอดสู่ลูก", "หยุดให้นมบุตรเท่านั้น", "ผ่าตัดตลอดชีพ"], ans: 1 },
  { q: "เชื้อ HIV สามารถอยู่ในของเหลวชนิดใด?",
    choices: ["น้ำลายปริมาณมาก", "เลือด น้ำอสุจิ น้ำนม", "เหงื่อ", "น้ำตา"], ans: 1 },
  { q: "ข้อใดไม่ถูกต้องเกี่ยวกับ HIV?",
    choices: ["ยังไม่มีวัคซีนป้องกัน", "ยา ARV ทำให้เชื้อหายได้", "ยา ARV ช่วยควบคุมเชื้อได้", "ผู้ติดเชื้อมีชีวิตยืนยาวได้"], ans: 1 },
  { q: "Viral Load คืออะไร?",
    choices: ["น้ำหนักผู้ป่วย", "ปริมาณเชื้อ HIV ในเลือด", "จำนวนเม็ดยาที่กิน", "ความดันโลหิต"], ans: 1 },
  { q: "ข้อใดควรทำเพื่อรู้สถานะการติดเชื้อ HIV ของตัวเอง?",
    choices: ["ดูสีผิว", "ตรวจเลือดหาเชื้อ HIV", "วัดอุณหภูมิ", "ชั่งน้ำหนัก"], ans: 1 },
  { q: "โรคเอดส์ถูกค้นพบครั้งแรกในช่วงปีใด?",
    choices: ["ทศวรรษ 1960", "ทศวรรษ 1980", "ทศวรรษ 2000", "ทศวรรษ 1950"], ans: 1 },
  { q: "หน่วยงานหลักด้านสาธารณสุขที่รณรงค์ต่อต้าน HIV ทั่วโลกคือ?",
    choices: ["UNICEF", "WHO (องค์การอนามัยโลก)", "UNESCO", "IMF"], ans: 1 },
];

// =================== MATCHING PAIRS (เกม) ===================
const MATCH_PAIRS = [
  { left: "HIV",          right: "ไวรัสที่ทำให้เกิดเอดส์" },
  { left: "AIDS",         right: "กลุ่มอาการภูมิคุ้มกันบกพร่อง" },
  { left: "CD4",          right: "เซลล์ภูมิคุ้มกันหลัก" },
  { left: "ARV",          right: "ยาต้านไวรัส" },
  { left: "PrEP",         right: "ยาป้องกันก่อนสัมผัสเชื้อ" },
  { left: "Viral Load",   right: "ปริมาณเชื้อในเลือด" },
  { left: "U=U",          right: "ตรวจไม่พบ=ถ่ายทอดไม่ได้" },
  { left: "วัณโรค",       right: "โรคติดเชื้อฉวยโอกาสที่พบบ่อย" },
];

// =================== STATE ===================
let userName     = "";
let preAnswers   = [];
let postAnswers  = [];
let preScore     = -1;
let postScore    = -1;
let preQuestions  = [];
let postQuestions = [];
let currentQ      = 0;
let timerInterval = null;
let timeLeft      = 20;
let isPost        = false;
let certId        = "";
let matchLeftEl   = null;
let matchRightEl  = null;
let matchScore    = 0;

// =================== UTILS ===================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showLoading(visible) {
  document.getElementById("loading-overlay").style.display = visible ? "flex" : "none";
}

function goPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setCardLock(ids, locked) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.pointerEvents = locked ? "none" : "";
    el.style.opacity       = locked ? "0.5" : "";
  });
}

// =================== LOGIN ===================
function doLogin() {
  const name = document.getElementById("input-name").value.trim();
  if (!name) {
    Swal.fire({ icon: "warning", title: "กรุณากรอกชื่อ", text: "กรุณากรอกชื่อ-นามสกุลของคุณ", confirmButtonColor: "#0ea5e9" });
    return;
  }
  userName = name;
  document.getElementById("header-info").textContent = name + " | ม.2 | นวัตกรรมสุขภาพ";
  document.getElementById("header-info").style.display = "";
  document.getElementById("btn-logout").style.display  = "";
  goPage("page-menu");
}

function logout() {
  Swal.fire({
    title: "ออกจากระบบ?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ออก",
    cancelButtonText: "ยกเลิก",
    confirmButtonColor: "#ef4444",
  }).then(r => {
    if (!r.isConfirmed) return;
    userName = ""; preAnswers = []; postAnswers = []; preScore = -1; postScore = -1;
    document.getElementById("header-info").style.display = "none";
    document.getElementById("btn-logout").style.display  = "none";
    document.getElementById("input-name").value = "";
    setCardLock(["card-content", "card-post", "card-game", "card-score", "card-cert"], true);
    goPage("page-login");
  });
}

// =================== MENU NAVIGATION ===================
function gotoPreTest() {
  if (preScore >= 0) {
    Swal.fire({ icon: "info", title: "ทำแล้ว", text: "คุณทำแบบทดสอบก่อนเรียนไปแล้ว", confirmButtonColor: "#0ea5e9" });
    return;
  }
  preQuestions = shuffle(QUESTIONS_ORIG);
  currentQ = 0; preAnswers = []; isPost = false;
  goPage("page-pretest");
  loadQuestion();
}

function gotoContent() { goPage("page-content"); }

function gotoPostTest() {
  if (preScore < 0) {
    Swal.fire({ icon: "warning", title: "ยังไม่ได้ทำ", text: "กรุณาทำแบบทดสอบก่อนเรียนและเรียนเนื้อหาก่อน", confirmButtonColor: "#0ea5e9" });
    return;
  }
  if (postScore >= 0) {
    Swal.fire({ icon: "info", title: "ทำแล้ว", text: "คุณทำแบบทดสอบหลังเรียนไปแล้ว", confirmButtonColor: "#0ea5e9" });
    return;
  }
  postQuestions = shuffle(QUESTIONS_ORIG);
  currentQ = 0; postAnswers = []; isPost = true;
  goPage("page-posttest");
  loadQuestion();
}

function gotoGame()  { setupGame(); goPage("page-game"); }
function gotoScore() { renderScore(); goPage("page-score"); }
function gotoCert()  { renderCert(); goPage("page-cert"); }

function unlockAndGoContent() {
  setCardLock(["card-content"], false);
  setCardLock(["card-post"], false);
  setCardLock(["card-game"], false);
  goPage("page-content");
}

// =================== QUIZ ENGINE ===================
function loadQuestion() {
  clearInterval(timerInterval);
  timeLeft = 20;

  const qs     = isPost ? postQuestions : preQuestions;
  const q      = qs[currentQ];
  const prefix = isPost ? "post" : "pre";

  document.getElementById(prefix + "-qnum").textContent  = currentQ + 1;
  document.getElementById(prefix + "-qnum2").textContent = currentQ + 1;
  document.getElementById(prefix + "-question").textContent = q.q;
  document.getElementById(prefix + "-timer").textContent    = timeLeft;
  document.getElementById(prefix + "-progress").style.width = ((currentQ / 20) * 100) + "%";

  const choicesEl = document.getElementById(prefix + "-choices");
  choicesEl.innerHTML = "";
  const letters = ["ก", "ข", "ค", "ง"];

  q.choices.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerHTML = `<span class="choice-letter">${letters[i]}</span>${c}`;
    btn.onclick = () => selectAnswer(i, q.ans, choicesEl);
    choicesEl.appendChild(btn);
  });

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById(prefix + "-timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      recordAnswer(-1, q.ans, choicesEl);
    }
  }, 1000);
}

function selectAnswer(chosen, correct, choicesEl) {
  clearInterval(timerInterval);
  recordAnswer(chosen, correct, choicesEl);
}

function recordAnswer(chosen, correct, choicesEl) {
  const btns = choicesEl.querySelectorAll(".choice-btn");
  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === correct)                      b.classList.add("correct");
    else if (i === chosen && chosen !== correct) b.classList.add("wrong");
  });

  const arr = isPost ? postAnswers : preAnswers;
  arr.push(chosen === correct ? 1 : 0);

  setTimeout(() => nextQuestion(), 900);
}

function nextQuestion() {
  currentQ++;
  if (currentQ >= 20) finishQuiz();
  else loadQuestion();
}

function finishQuiz() {
  clearInterval(timerInterval);
  const score = (isPost ? postAnswers : preAnswers).reduce((a, b) => a + b, 0);

  if (isPost) {
    postScore = score;
    setCardLock(["card-game", "card-score", "card-cert"], false);
    saveToSheet();
    showResultPopup(score, true);
  } else {
    preScore = score;
    setCardLock(["card-content", "card-post", "card-game"], false);
    showResultPopup(score, false);
  }
}

function showResultPopup(score, isPostTest) {
  const pct   = Math.round(score / 20 * 100);
  const grade = pct >= 80 ? "ดีเยี่ยม" : pct >= 60 ? "ผ่านเกณฑ์" : "ต้องพัฒนา";
  const color = pct >= 80 ? "#22c55e"  : pct >= 60 ? "#0ea5e9"   : "#f59e0b";
  const emoji = pct >= 80 ? "🌟"       : pct >= 60 ? "👍"        : "📚";

  Swal.fire({
    title: `${emoji} ผลคะแนน`,
    html: `<div style="font-family:Sarabun,sans-serif;font-size:18px;">
      ${isPostTest ? "หลังเรียน" : "ก่อนเรียน"}<br>
      <span style="font-size:48px;font-weight:800;color:${color};">${score}<small style="font-size:20px;">/20</small></span><br>
      <span style="font-size:20px;color:${color};font-weight:700;">${pct}% • ${grade}</span>
    </div>`,
    confirmButtonText: isPostTest ? "ดูผลเปรียบเทียบ" : "เรียนเนื้อหา",
    confirmButtonColor: "#0ea5e9",
    allowOutsideClick: false,
  }).then(() => {
    if (isPostTest) { renderScore(); goPage("page-score"); }
    else            { goPage("page-content"); }
  });
}

// =================== CONTENT TABS ===================
function switchTab(id, btn) {
  document.querySelectorAll(".content-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  btn.classList.add("active");
}

// =================== GAME ===================
function setupGame() {
  matchLeftEl = null; matchRightEl = null; matchScore = 0;
  document.getElementById("game-score").textContent = "0";
  document.getElementById("game-result").style.display = "none";

  const pairs  = shuffle(MATCH_PAIRS);
  const lefts  = pairs.map(p => p.left);
  const rights = shuffle(pairs.map(p => p.right));

  const lEl = document.getElementById("match-left");
  const rEl = document.getElementById("match-right");
  lEl.innerHTML = "";
  rEl.innerHTML = "";

  lefts.forEach(l => {
    const d = document.createElement("div");
    d.className = "match-item";
    d.textContent = l;
    d.dataset.val = l;
    d.onclick = () => selectMatch(d, "left");
    lEl.appendChild(d);
  });

  rights.forEach(r => {
    const d = document.createElement("div");
    d.className = "match-item";
    d.textContent = r;
    d.dataset.val = r;
    d.onclick = () => selectMatch(d, "right");
    rEl.appendChild(d);
  });
}

function selectMatch(el, side) {
  if (el.classList.contains("matched")) return;

  if (side === "left") {
    document.querySelectorAll("#match-left .match-item").forEach(e => e.classList.remove("selected"));
    el.classList.add("selected");
    matchLeftEl = el;
  } else {
    document.querySelectorAll("#match-right .match-item").forEach(e => e.classList.remove("selected"));
    el.classList.add("selected");
    matchRightEl = el;
  }

  if (matchLeftEl && matchRightEl) checkMatch();
}

function checkMatch() {
  const lv = matchLeftEl.dataset.val;
  const rv = matchRightEl.dataset.val;
  const ok = MATCH_PAIRS.find(p => p.left === lv && p.right === rv);

  if (ok) {
    matchLeftEl.classList.remove("selected"); matchLeftEl.classList.add("matched");
    matchRightEl.classList.remove("selected"); matchRightEl.classList.add("matched");
    matchScore++;
    document.getElementById("game-score").textContent = matchScore;
    if (matchScore === MATCH_PAIRS.length)
      setTimeout(() => { document.getElementById("game-result").style.display = "block"; }, 400);
  } else {
    matchLeftEl.classList.add("wrong-flash"); matchRightEl.classList.add("wrong-flash");
    setTimeout(() => {
      matchLeftEl.classList.remove("selected", "wrong-flash");
      matchRightEl.classList.remove("selected", "wrong-flash");
    }, 600);
  }
  matchLeftEl = null; matchRightEl = null;
}

function restartGame() { setupGame(); }

// =================== SCORE PAGE ===================
function renderScore() {
  const el = document.getElementById("score-content");
  if (preScore < 0) {
    el.innerHTML = '<div class="content-card"><p>ยังไม่ได้ทำแบบทดสอบ</p></div>';
    return;
  }
  const prePct  = Math.round(preScore / 20 * 100);
  const postPct = postScore >= 0 ? Math.round(postScore / 20 * 100) : null;
  const grade   = s => s >= 80 ? "🌟 ดีเยี่ยม" : s >= 60 ? "👍 ผ่านเกณฑ์" : "📚 ต้องพัฒนา";
  const diff    = postPct !== null ? postPct - prePct : null;

  el.innerHTML = `
    <div class="compare-grid">
      <div class="compare-box compare-before">
        <h4>📝 ก่อนเรียน</h4>
        <div style="font-size:36px;font-weight:800;color:#92400e;">${preScore}<small style="font-size:16px;">/20</small></div>
        <div style="font-size:18px;font-weight:700;color:#92400e;">${prePct}%</div>
        <div style="font-size:13px;margin-top:4px;">${grade(prePct)}</div>
        <div class="score-bar-wrap"><div class="score-bar score-bar-before" style="width:${prePct}%"></div></div>
      </div>
      ${postScore >= 0 ? `
      <div class="compare-box compare-after">
        <h4>✅ หลังเรียน</h4>
        <div style="font-size:36px;font-weight:800;color:#065f46;">${postScore}<small style="font-size:16px;">/20</small></div>
        <div style="font-size:18px;font-weight:700;color:#065f46;">${postPct}%</div>
        <div style="font-size:13px;margin-top:4px;">${grade(postPct)}</div>
        <div class="score-bar-wrap"><div class="score-bar score-bar-after" style="width:${postPct}%"></div></div>
      </div>` : `
      <div class="compare-box" style="background:#f1f5f9;border:2px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;">
        <p style="color:var(--muted);text-align:center;">ยังไม่ได้ทำ<br>แบบทดสอบหลังเรียน</p>
      </div>`}
    </div>
    ${diff !== null ? `
    <div class="content-card" style="margin-top:20px;text-align:center;">
      <div style="font-size:14px;color:var(--muted);">พัฒนาได้</div>
      <div style="font-size:36px;font-weight:800;color:${diff>=0?"#22c55e":"#ef4444"};">${diff >= 0 ? "+" : ""}${diff}%</div>
      <div style="font-size:14px;color:var(--muted);">คะแนนหลังเรียนเทียบกับก่อนเรียน</div>
    </div>` : ""}
  `;
}

// =================== CERT PAGE ===================
function renderCert() {
  const statusEl = document.getElementById("cert-status");
  const formEl   = document.getElementById("cert-form");
  const resultEl = document.getElementById("cert-result");

  // reset
  resultEl.style.display = "none";
  document.getElementById("cert-search-result").innerHTML = "";

  if (postScore < 0) {
    statusEl.innerHTML = `<div class="content-card" style="text-align:center;padding:32px;">
      <div style="font-size:48px;margin-bottom:12px;">📝</div>
      <p style="color:var(--muted);">กรุณาทำแบบทดสอบหลังเรียนก่อน</p>
    </div>`;
    formEl.style.display = "none";
    return;
  }

  const pct = Math.round(postScore / 20 * 100);

  if (pct >= 80) {
    statusEl.innerHTML = `<div style="margin-bottom:16px;">
      <span style="display:inline-flex;align-items:center;gap:8px;background:#f0fdf4;border:2px solid #22c55e;border-radius:12px;padding:10px 20px;font-size:16px;font-weight:700;color:#15803d;">
        ✅ ผ่านเกณฑ์! (${pct}%)
      </span>
    </div>`;
    // ใส่ชื่อจาก login ไว้ให้เลย
    document.getElementById("cert-name-input").value = userName;
    document.getElementById("cert-position-input").value = "นักเรียน ม.2";
    formEl.style.display = "block";
  } else {
    statusEl.innerHTML = `<div class="result-card">
      <div style="font-size:64px;margin-bottom:16px;">😔</div>
      <h3 style="font-size:22px;font-weight:800;color:var(--primary-dark);margin-bottom:8px;">คะแนนไม่ถึง 80%</h3>
      <p style="color:var(--muted);">คุณได้ ${pct}% กรุณาทบทวนเนื้อหาและลองอีกครั้ง</p>
    </div>`;
    formEl.style.display = "none";
  }
}

// =================== CREATE CERT ===================
async function createCert() {
  const nameVal = document.getElementById("cert-name-input").value.trim();
  const posVal  = document.getElementById("cert-position-input").value.trim();

  if (!nameVal) {
    Swal.fire({ icon: "warning", title: "กรุณากรอกชื่อ", confirmButtonColor: "#0ea5e9" });
    return;
  }

  const btn = document.getElementById("btn-create-cert");
  btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i> กำลังสร้าง...`;
  btn.disabled = true;

  const now     = new Date();
  const dateStr = now.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("th-TH");
  const pct     = Math.round(postScore / 20 * 100);

  try {
    const body = new URLSearchParams({
      name:      nameVal,
      position:  posVal || "นักเรียน ม.2",
      score:     postScore + "/20 (" + pct + "%)",
      date:      dateStr,
      timestamp: timeStr,
    });

    const res  = await fetch(APP_SCRIPT_URL, {
      method:  "POST",
      body:    body.toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = await res.json();

    // แสดง popup สำเร็จ
    await Swal.fire({
      icon: "success",
      title: "สำเร็จ!",
      text: "สร้างเกียรติบัตรเรียบร้อยแล้ว",
      confirmButtonColor: "#5b5bd6",
    });

    // แสดงผลลัพธ์
    const resultEl = document.getElementById("cert-result");
    document.getElementById("cert-result-id").textContent = data.id || "-";
    const dlBtn = document.getElementById("cert-download-btn");
    dlBtn.href   = data.url || `https://drive.google.com/file/d/${TEMPLATE_SLIDE_ID}/view`;
    dlBtn.target = "_blank";
    resultEl.style.display = "block";

  } catch (err) {
    console.warn("createCert failed:", err);
    Swal.fire({ icon: "error", title: "เกิดข้อผิดพลาด", text: "ไม่สามารถสร้างเกียรติบัตรได้ กรุณาลองใหม่", confirmButtonColor: "#0ea5e9" });
  } finally {
    btn.innerHTML = `<i class="fa fa-certificate"></i> สร้างเกียรติบัตร`;
    btn.disabled  = false;
  }
}

// =================== SEARCH CERT ===================
async function searchCert() {
  const q   = document.getElementById("cert-search-input").value.trim();
  const el  = document.getElementById("cert-search-result");
  if (!q) return;

  el.innerHTML = `<p style="color:var(--muted);font-size:13px;"><i class="fa fa-spinner fa-spin"></i> กำลังค้นหา...</p>`;

  try {
    const res  = await fetch(APP_SCRIPT_URL + "?action=search&q=" + encodeURIComponent(q));
    const data = await res.json();

    if (data && data.length > 0) {
      el.innerHTML = data.map(r => `
        <div style="background:#f0fdf4;border:1.5px solid #22c55e;border-radius:12px;padding:14px 16px;margin-bottom:8px;">
          <div style="font-weight:700;color:#15803d;">ID: ${r.id} — ${r.name}</div>
          <div style="font-size:13px;color:var(--muted);">${r.position} | คะแนน ${r.score} | ${r.timestamp}</div>
          ${r.url ? `<a href="${r.url}" target="_blank" class="btn btn-success" style="margin-top:8px;padding:6px 16px;font-size:13px;">
            <i class="fa fa-download"></i> ดาวน์โหลด
          </a>` : ""}
        </div>`).join("");
    } else {
      el.innerHTML = `<p style="color:var(--muted);font-size:13px;">ไม่พบข้อมูล</p>`;
    }
  } catch (err) {
    el.innerHTML = `<p style="color:#ef4444;font-size:13px;">ไม่สามารถค้นหาได้</p>`;
  }
}

// =================== SAVE TO GOOGLE SHEET ===================
async function saveToSheet() {
  try {
    const body = new URLSearchParams({
      name:      userName,
      position:  "นักเรียน ม.2",
      score:     postScore,
      preScore:  preScore,
      timestamp: new Date().toLocaleString("th-TH"),
    });
    await fetch(APP_SCRIPT_URL, {
      method: "POST",
      body: body.toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } catch (err) {
    console.warn("saveToSheet failed:", err);
  }
}

// =================== INIT ===================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input-name").addEventListener("keydown", e => {
    if (e.key === "Enter") doLogin();
  });
});
