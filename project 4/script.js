const DEV = { name: "Your Name", email: "you@example.com" }; // edit these two lines
document.getElementById("devname").textContent = DEV.name;
document.getElementById("devmail").href =
  "mailto:" + DEV.email + "?subject=" + encodeURIComponent("Real estate website quote");

const H = [
  {
    id: 1,
    a: "12 Maple Lane",
    h: "Riverside",
    t: "House",
    p: 685000,
    bd: 4,
    ba: 3,
    sf: 2450,
    yr: 2012,
    col: "#2447f5",
    tag: "New",
    d: "Bright family home with an open kitchen and a fenced backyard, a short walk from the river trail.",
    f: ["Fenced yard", "Two-car garage", "Updated kitchen"],
  },
  {
    id: 2,
    a: "88 Harbor Street, Unit 6B",
    h: "Old Town",
    t: "Condo",
    p: 425000,
    bd: 2,
    ba: 2,
    sf: 1120,
    yr: 2018,
    col: "#0a8f7a",
    d: "Corner unit with floor-to-ceiling windows and a private balcony. Walk to cafés and the ferry.",
    f: ["Balcony", "In-unit laundry", "Gym in building"],
  },
  {
    id: 3,
    a: "5 Orchard Close",
    h: "Hillcrest",
    t: "Townhouse",
    p: 540000,
    bd: 3,
    ba: 2,
    sf: 1760,
    yr: 2015,
    col: "#9b4dca",
    tag: "Open house",
    d: "Three-level townhouse with a rooftop deck and low-maintenance living.",
    f: ["Rooftop deck", "Attached garage", "Pet friendly"],
  },
  {
    id: 4,
    a: "301 Lakeview Drive",
    h: "Lakeview",
    t: "House",
    p: 1240000,
    bd: 5,
    ba: 4,
    sf: 3900,
    yr: 2020,
    col: "#d9822b",
    d: "Modern lake-facing home with a chef’s kitchen, home office and a three-season porch.",
    f: ["Lake views", "Home office", "Heated floors"],
  },
  {
    id: 5,
    a: "47 Cedar Court",
    h: "Hillcrest",
    t: "House",
    p: 395000,
    bd: 3,
    ba: 1,
    sf: 1380,
    yr: 1978,
    col: "#4b6b3f",
    d: "Well-kept starter home on a quiet street. Great bones, ready for your own style.",
    f: ["New roof (2023)", "Big garden", "Near schools"],
  },
  {
    id: 6,
    a: "19 Foundry Row",
    h: "Old Town",
    t: "Townhouse",
    p: 610000,
    bd: 3,
    ba: 3,
    sf: 1900,
    yr: 2021,
    col: "#c2415c",
    tag: "New",
    d: "Converted warehouse townhouse with exposed brick and soaring ceilings.",
    f: ["Exposed brick", "Courtyard", "EV charger"],
  },
  {
    id: 7,
    a: "220 Riverside Walk, Unit 12",
    h: "Riverside",
    t: "Condo",
    p: 289000,
    bd: 1,
    ba: 1,
    sf: 760,
    yr: 2009,
    col: "#3f7fd0",
    d: "Sunny one-bedroom on the river path. A smart first home or rental investment.",
    f: ["River views", "Covered parking", "Low fees"],
  },
  {
    id: 8,
    a: "9 Birchwood Avenue",
    h: "Lakeview",
    t: "House",
    p: 815000,
    bd: 4,
    ba: 3,
    sf: 2800,
    yr: 2005,
    col: "#7a5a3a",
    d: "Sprawling home on a corner lot with a finished basement and a new deck.",
    f: ["Finished basement", "New deck", "Corner lot"],
  },
  {
    id: 9,
    a: "64 Station Road, Unit 3",
    h: "Riverside",
    t: "Condo",
    p: 349000,
    bd: 2,
    ba: 1,
    sf: 940,
    yr: 2014,
    col: "#0f7d8a",
    d: "Quiet two-bedroom steps from the train, with a bright open living area.",
    f: ["Near transit", "Storage locker", "Pet friendly"],
  },
];
const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const $id = (i) => document.getElementById(i);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
let saved = new Set();
try {
  saved = new Set(JSON.parse(localStorage.getItem("ng-saved") || "[]"));
} catch (e) {}
const saveS = () => {
  try {
    localStorage.setItem("ng-saved", JSON.stringify([...saved]));
  } catch (e) {}
};
const F = { q: "", t: "", bd: 0, mp: 1500000, so: "", sv: false };

function pay(price, downPct, rate, yrs) {
  const L = price * (1 - downPct / 100),
    n = yrs * 12,
    r = rate / 1200;
  const m = r === 0 ? L / n : (L * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return { L, m, interest: m * n - L, total: m * n };
}
function art(h) {
  const c = h.col;
  let win = "";
  const shapes = {
    House: `<polygon points="30,56 80,22 130,56" fill="${c}"/><rect x="38" y="56" width="84" height="40" fill="#fff"/><rect x="72" y="70" width="16" height="26" fill="${c}"/><rect x="48" y="66" width="14" height="14" fill="${c}" opacity=".5"/><rect x="98" y="66" width="14" height="14" fill="${c}" opacity=".5"/>`,
    Condo: (() => {
      for (let r = 0; r < 5; r++)
        for (let k = 0; k < 3; k++)
          win += `<rect x="${56 + k * 20}" y="${22 + r * 14}" width="12" height="8" fill="#fff" opacity=".85"/>`;
      return `<rect x="48" y="14" width="64" height="82" fill="${c}"/>${win}`;
    })(),
    Townhouse: `<rect x="30" y="38" width="48" height="58" fill="${c}"/><rect x="82" y="50" width="48" height="46" fill="${c}" opacity=".72"/><rect x="40" y="48" width="12" height="12" fill="#fff" opacity=".85"/><rect x="58" y="48" width="12" height="12" fill="#fff" opacity=".85"/><rect x="92" y="60" width="12" height="12" fill="#fff" opacity=".85"/><rect x="110" y="60" width="12" height="12" fill="#fff" opacity=".85"/><rect x="48" y="76" width="14" height="20" fill="#fff" opacity=".85"/>`,
  };
  return `<svg viewBox="0 0 160 110" role="img" aria-label="${esc(h.t)} illustration"><rect width="160" height="110" fill="color-mix(in srgb,${c} 16%,#fff)"/><rect y="92" width="160" height="18" fill="color-mix(in srgb,${c} 30%,#cfd8d0)"/>${shapes[h.t]}</svg>`;
}
const specs = (h) => `${h.bd} bd, ${h.ba} ba, ${h.sf.toLocaleString()} sqft`;

function grid() {
  let l = H.filter(
    (h) =>
      (!F.t || h.t === F.t) &&
      h.bd >= F.bd &&
      h.p <= F.mp &&
      (!F.sv || saved.has(h.id)) &&
      (h.a + " " + h.h).toLowerCase().includes(F.q),
  );
  l.sort((a, b) => (F.so === "lo" ? a.p - b.p : F.so === "hi" ? b.p - a.p : b.id - a.id));
  $id("mpv").textContent = F.mp >= 1500000 ? "No limit" : fmt.format(F.mp);
  $id("rc").textContent = l.length + (l.length === 1 ? " home" : " homes");
  $id("sc").textContent = saved.size;
  $id("sv").setAttribute("aria-pressed", F.sv);
  $id("grid").innerHTML = l.length
    ? l
        .map(
          (h) =>
            `<div class="pc"><button class="art" data-v="${h.id}" aria-label="View ${esc(h.a)}">${art(h)}</button>${h.tag ? `<span class="badge">${h.tag}</span>` : ""}<button class="heart" data-s="${h.id}" aria-pressed="${saved.has(h.id)}" aria-label="Save ${esc(h.a)}">${saved.has(h.id) ? "♥" : "♡"}</button><div class="in"><div class="price">${fmt.format(h.p)}</div><p>${specs(h)}</p><p><b>${esc(h.a)}</b>, ${h.h}</p></div></div>`,
        )
        .join("")
    : `<p class="empty">No homes match those filters. Try a higher price or fewer bedrooms.</p>`;
}
function open(id) {
  const h = H.find((x) => x.id === id),
    e = pay(h.p, 20, 6.5, 30);
  $id("body").innerHTML =
    `<div class="top"><div><div class="price">${fmt.format(h.p)}</div><b>${esc(h.a)}</b>, ${h.h}</div><button class="x" data-x aria-label="Close">✕</button></div>
  <div style="border-radius:12px;overflow:hidden">${art(h)}</div>
  <div class="facts"><span>${h.t}</span><span>${specs(h)}</span><span>Built ${h.yr}</span></div>
  <p>${esc(h.d)}</p><div class="facts">${h.f.map((x) => `<span>${x}</span>`).join("")}</div>
  <p class="note">Estimated ${fmt.format(e.m)}/month with 20% down at 6.5% for 30 years. <a href="#calc" data-calc="${h.id}">Open in calculator</a></p>
  <form id="enq"><div class="f"><label for="nm">Your name</label><input id="nm" required maxlength="50" autocomplete="name"></div><div class="f"><label for="em">Email</label><input id="em" type="email" required autocomplete="email"></div><div class="f"><label for="ms">Message</label><textarea id="ms" rows="2">Hi Avery, I’d like to tour ${esc(h.a)}.</textarea></div><button class="btn" style="width:100%">Request a tour</button></form>`;
  $id("dlg").showModal();
}
function calc() {
  const p = +$id("cp").value || 0,
    d = +$id("cd").value,
    r = +$id("cr").value || 0,
    y = +$id("ct").value,
    e = pay(p, d, r, y);
  $id("cdv").textContent = d + "% (" + fmt.format((p * d) / 100) + ")";
  $id("cm").textContent = fmt.format(e.m);
  $id("cb").innerHTML =
    `<div class="row"><span>Loan amount</span><b>${fmt.format(e.L)}</b></div><div class="row"><span>Total interest</span><b>${fmt.format(e.interest)}</b></div><div class="row"><span>Total paid over ${y} years</span><b>${fmt.format(e.total)}</b></div>`;
}

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.tagName === "DIALOG") return t.close();
  const a = t.closest("[data-v],[data-s],[data-x],[data-calc],#sv");
  if (!a) return;
  if (a.dataset.v) open(+a.dataset.v);
  else if (a.dataset.s) {
    const id = +a.dataset.s;
    saved.has(id) ? saved.delete(id) : saved.add(id);
    saveS();
    grid();
  } else if (a.dataset.x !== undefined) $id("dlg").close();
  else if (a.dataset.calc) {
    $id("cp").value = H.find((x) => x.id === +a.dataset.calc).p;
    calc();
    $id("dlg").close();
  } else if (a.id === "sv") {
    F.sv = !F.sv;
    grid();
  }
});
$id("q").oninput = (e) => {
  F.q = e.target.value.trim().toLowerCase();
  grid();
};
$id("ty").onchange = (e) => {
  F.t = e.target.value;
  grid();
};
$id("bd").onchange = (e) => {
  F.bd = +e.target.value;
  grid();
};
$id("mp").oninput = (e) => {
  F.mp = +e.target.value;
  grid();
};
$id("so").onchange = (e) => {
  F.so = e.target.value;
  grid();
};
["cp", "cd", "cr", "ct"].forEach((i) => $id(i).addEventListener("input", calc));
document.addEventListener("submit", (e) => {
  if (e.target.id !== "enq") return;
  e.preventDefault();
  e.target.outerHTML = `<div class="ok" role="status">Thanks, ${esc($id("nm").value)}! Avery will email you within one business day to set up a tour. (Demo: no message was sent.)</div>`;
});
grid();
calc();