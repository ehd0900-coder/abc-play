(function () {
  "use strict";
  var C = window.CONTENT, EBS = C.EBS, CHANT = C.CHANT, PIC = C.PIC, DAYS = C.DAYS, UP = C.UP, LOW = C.LOW, ML = C.ML, MR = C.MR, DICT = C.DICT, FIRST = C.FIRST, REVIEW = C.REVIEW, CVC = C.CVC, SIGHT = C.SIGHT, STEPS = C.STEPS;
  var URL0 = "https://claude.ai/artifact/1sgjHBjBPGhcN2Es7tNcj9";

  var mem = { done: {}, diag: null, stars: 0 };
  try { var raw = localStorage.getItem("haeun-eng"); if (raw) mem = Object.assign(mem, JSON.parse(raw)); } catch (e) {}
  function save() { try { localStorage.setItem("haeun-eng", JSON.stringify(mem)); } catch (e) {} }

  var app = document.getElementById("app");
  var ui = { view: "home", day: pickDay(), sub: null };
  function pickDay() {
    var n = new Date(), k = ("0" + (n.getMonth() + 1)).slice(-2) + "-" + ("0" + n.getDate()).slice(-2);
    for (var i = 0; i < DAYS.length; i++) if (DAYS[i].k === k) return i;
    for (var j = 0; j < DAYS.length; j++) if (!allDone(j)) return j;
    return 0;
  }
  function allDone(i) { var d = mem.done[DAYS[i].k] || []; return DAYS[i].steps.every(function (_, s) { return d[s]; }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function speak(w) { try { var u = new SpeechSynthesisUtterance(w); u.lang = "en-US"; u.rate = 0.75; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} }
  function sndInfo() {
    var ua = navigator.userAgent || "", inapp = /KAKAOTALK|NAVER\(|Instagram|FBAN|FBAV|Line\//i.test(ua);
    var has = ("speechSynthesis" in window) && typeof SpeechSynthesisUtterance !== "undefined", vs = [];
    try { vs = has ? speechSynthesis.getVoices() : []; } catch (e) {}
    return { inapp: inapp, has: has, n: vs.length, en: vs.filter(function (v) { return /^en/i.test(v.lang); }).length };
  }
  function sndText() {
    var i = sndInfo(), t;
    if (!i.has) t = "이 화면에는 소리 내기 기능이 없습니다." + (i.inapp ? " 카카오톡 같은 앱 안에서 열린 화면이라 그렇습니다. 크롬이나 삼성 인터넷에서 열어 주세요." : " 크롬이나 삼성 인터넷에서 열어 주세요.");
    else if (i.n === 0) t = "소리 기능은 있는데 음성이 0개로 잡힙니다. 한 번 더 눌러 보세요. 계속 0개면 태블릿의 음성 읽기 기능이 꺼져 있거나 음성이 설치되지 않은 것입니다." + (i.inapp ? " 앱 안에서 열린 화면이면 크롬에서 먼저 열어 보세요." : "");
    else if (i.en === 0) t = "음성 " + i.n + "개 중 영어 음성이 없습니다. 태블릿에 영어 음성을 설치해야 합니다.";
    else t = "정상입니다. 영어 음성 " + i.en + "개. 지금 “apple” 소리가 나야 합니다. 안 들리면 태블릿 미디어 음량을 확인하세요.";
    return t + " (기능 " + (i.has ? "있음" : "없음") + " · 음성 " + i.n + "개 · 영어 " + i.en + "개 · 앱 안 화면 " + (i.inapp ? "예" : "아니오") + ")";
  }
  function go(v) { ui.view = v; ui.sub = null; try { location.hash = v === "home" ? "" : v; } catch (e) {} render(); }
  function top(title, right) { return '<div class="top"><h1>' + title + "</h1>" + (right || "") + "</div>"; }
  var HOMEBTN = '<button class="pill" data-a="home">처음으로</button>';

  /* ---------- 홈 ---------- */
  function home() {
    var D = DAYS[ui.day], done = mem.done[D.k] || [];
    var week = DAYS.map(function (d, i) { return '<button class="day' + (i === ui.day ? " on" : "") + (allDone(i) ? " done" : "") + '" data-a="day" data-i="' + i + '"><b>' + d.d + "</b><span>" + d.n + "</span></button>"; }).join("");
    var steps = D.steps.map(function (s, i) {
      var btn = s.link ? '<a class="do" href="' + s.link + '" target="_blank" rel="noopener">열기</a>' : s.act ? '<button class="do" data-a="' + s.act + '">시작</button>' : "";
      return '<div class="step' + (done[i] ? " done" : "") + '"><button class="chk" data-a="chk" data-i="' + i + '" aria-label="' + esc(s.t) + ' 완료 표시">' + (done[i] ? "✓" : i + 1) + '</button><div class="txt"><b>' + s.t + "</b><span>" + s.m + "</span></div>" + btn + "</div>";
    }).join("");
    var si = sndInfo(), warn = (si.inapp || !si.has) ? '<div class="warnbox"><b>소리가 안 나오는 화면입니다.</b> 카카오톡 같은 앱 안에서 열면 소리가 막힙니다. 주소를 복사해 크롬이나 삼성 인터넷에 붙여 열어 주세요. <button class="small" data-a="cplink">주소 복사</button> <span class="abc" style="font-size:13px;word-break:break-all">' + URL0 + "</span></div>" : "";
    var sndRow = '<p class="hint"><button class="small" data-a="snd">소리 점검</button> ' + (ui.snd ? esc(ui.snd) : "눌러서 이 태블릿에서 영어 소리가 나오는지 확인해요.") + "</p>";
    return top("하은이의 영어 놀이", '<span class="pill">이번 주 글자 <span class="letters">' + D.L.toUpperCase().split("").join(" ") + "</span></span>") +
      warn + '<div class="week">' + week + '</div><div class="stage"><div class="pad"><div class="steps">' + steps + (allDone(ui.day) ? '<div class="stamp">참 잘했어요!</div>' : "") +
      '</div><p class="hint">다 한 것은 동그라미를 눌러 표시해요. 강의는 EBS 화면이 새로 열려요. 로그인한 뒤 강의목록에서 오늘 강의의 “강의보기”를 눌러 주세요.</p>' + sndRow + "</div></div>";
  }

  /* ---------- 진단 ---------- */
  function newDiag() { mem.diag = { s: 0, i: -1, res: {}, done: false }; save(); }
  function diag() {
    var g = mem.diag;
    if (!g) return top("글자 탐험", HOMEBTN) + '<div class="stage"><div class="center"><p style="font-family:var(--f-display);font-size:30px;margin:0">글자를 얼마나 아는지 같이 볼까요?</p><p class="hint">15~20분 · 부모님이 옆에서 버튼을 눌러 줍니다.<br>힌트 없이, 틀려도 고쳐주지 않고, 3초 기다려 답이 없으면 넘어갑니다.<br>지치면 “오늘은 여기까지”를 누르세요. 다음에 이어서 할 수 있습니다.</p></div><div class="bar"><button class="big sun" data-a="dstart">시작하기</button></div></div>';
    if (g.done) return result();
    var S = STEPS[g.s], dots = '<div class="dots">' + STEPS.map(function (_, i) { return '<i class="' + (i < g.s ? "ok" : i === g.s ? "on" : "") + '"></i>'; }).join("") + "</div>";
    var head = top(S.t, dots + '<button class="pill" data-a="dpause">오늘은 여기까지</button>');
    if (g.i < 0) return head + '<div class="stage"><div class="center"><p class="parent">부모님께</p><p style="font-size:22px;max-width:30em;margin:0">' + S.say + '</p></div><div class="bar">' + (g.s > 0 ? "" : "") + '<button class="big sun" data-a="dgo">' + S.t + " 시작</button></div></div>";
    var r = g.res[S.id] || (g.res[S.id] = []);
    if (S.type === "judge") {
      var miss = 0; for (var k = g.i - 1; k >= 0 && r[k] === false; k--) miss++;
      return head + '<div class="stage"><div class="center"><div class="abc ' + (S.word ? "wordbig" : "giant") + '">' + S.items[g.i] + '</div><div class="hint">' + (g.i + 1) + " / " + S.items.length + "</div></div>" +
        '<div class="bar"><span class="parent">부모님 버튼</span><button class="big no" data-a="j" data-v="0">✕ 모름</button><button class="big yes" data-a="j" data-v="1">○ 맞음</button>' +
        (g.i > 0 ? '<button class="small" data-a="jback">하나 뒤로</button>' : "") + '<button class="small' + (miss >= 5 ? " warn" : "") + '" data-a="dskip">' + (miss >= 5 ? "연속 5개 모름 · 다음 활동으로" : "이 활동 건너뛰기") + "</button></div></div>";
    }
    if (S.type === "match") {
      var m = ui.sub || (ui.sub = { pairs: {}, sel: null });
      var usedR = {}; Object.keys(m.pairs).forEach(function (l, n) { usedR[m.pairs[l]] = n + 1; });
      var col = function (arr, side) { return '<div class="mcol">' + arr.map(function (c) {
        var n = side === "L" ? (m.pairs[c] ? Object.keys(m.pairs).indexOf(c) + 1 : 0) : (usedR[c] || 0);
        return '<button class="mbtn' + (n ? " used" : "") + (side === "L" && m.sel === c ? " sel" : "") + '" data-a="m' + side + '" data-c="' + c + '"' + (n ? " disabled" : "") + ">" + c + (n ? "<em>" + n + "</em>" : "") + "</button>"; }).join("") + "</div>"; };
      var full = Object.keys(m.pairs).length === ML.length;
      return head + '<div class="stage"><div class="match">' + col(ML, "L") + col(MR, "R") + '</div><div class="bar"><span class="hint">큰 글자를 먼저 누르고, 같은 작은 글자를 눌러요.</span><button class="small" data-a="mreset">처음부터 다시</button><button class="big ' + (full ? "sun" : "") + '" data-a="mdone">' + (full ? "다 했어요" : "여기까지만 하고 다음") + "</button></div></div>";
    }
    if (S.type === "write") {
      var it = S.items[g.i];
      return head + '<div class="stage"><div class="center"><button class="peek" data-peek="‘' + it[1] + "’ (" + it[0] + ')">부모님: 누르고 있으면 불러 줄 글자가 보여요</button><canvas id="cv" width="1040" height="720" aria-label="글자 쓰는 칸"></canvas><div class="hint">' + (g.i + 1) + " / " + S.items.length + ' · 손가락이나 펜으로 써요</div></div><div class="bar"><span class="parent">부모님 버튼</span><button class="small" data-a="clr">지우기</button><button class="big no" data-a="j" data-v="0">✕ 못 씀</button><button class="big yes" data-a="j" data-v="1">○ 맞게 씀</button><button class="small" data-a="dskip">이 활동 건너뛰기</button></div></div>';
    }
    if (S.type === "first") {
      var f = S.items[g.i];
      return head + '<div class="stage"><div class="center"><div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center"><button class="big sun" style="flex:none;padding:0 28px" data-a="say" data-w="' + f[0] + '">소리 듣기</button><button class="peek" data-peek="' + f[0] + '">부모님: 소리가 안 나오면 누르고 확인</button></div><div class="choices">' + f[1].split("").map(function (c) { return '<button class="choice" data-a="fc" data-c="' + c + '">' + c + "</button>"; }).join("") + '</div><div class="hint">' + (g.i + 1) + " / " + S.items.length + ' · 처음에 나는 소리 글자를 눌러요</div></div><div class="bar"><button class="small" data-a="fskip">모르겠어요</button><button class="small" data-a="dskip">이 활동 건너뛰기</button></div></div>';
    }
    return "";
  }
  function nextItem() { var g = mem.diag, S = STEPS[g.s]; g.i++; if (g.i >= S.items.length) nextStep(); else { save(); render(); } }
  function nextStep() { var g = mem.diag; g.s++; g.i = -1; ui.sub = null; if (g.s >= STEPS.length) { g.done = true; g.when = new Date().toISOString().slice(0, 10); } save(); render(); }
  function score(id) { return (mem.diag.res[id] || []).filter(function (v) { return v === true; }).length; }
  function missed(id, items) { var r = mem.diag.res[id] || []; return items.filter(function (_, i) { return r[i] !== true; }); }
  function result() {
    var g = mem.diag, S = {}; STEPS.forEach(function (s) { S[s.id] = score(s.id); });
    var tried = function (id) { return (g.res[id] || []).length > 0; };
    var card = function (id, label, total, items) {
      if (!tried(id)) return '<div class="rc"><small>' + label + "</small><b>안 함</b></div>";
      var ms = items ? missed(id, items).map(function (x) { return Array.isArray(x) ? x[0] : x; }) : [];
      return '<div class="rc"><small>' + label + "</small><b>" + S[id] + " / " + total + "</b>" + (ms.length ? '<div class="miss">' + ms.join(" ") + "</div>" : "") + "</div>"; };
    var adv = [];
    if (tried("up") && tried("lown")) adv.push(S.up >= 24 && S.lown >= 24 ? "글자 이름은 끝났습니다. 소리 단계로 갑니다." : "이름을 틀린 글자만 카드로 매일 복습하면서 소리 단계를 함께 갑니다.");
    if (tried("lows")) adv.push(S.lows >= 20 ? "소리를 20개 이상 압니다. 알파벳 강의(1~14강)는 빠르게 지나가도 됩니다." : S.lows >= 10 ? "소리를 절반쯤 압니다. 모르는 소리 위주로 1~14강을 봅니다 (약 2~3주)." : "소리는 처음부터 시작합니다. 가장 흔한 경우이고, 계획한 속도 그대로 가면 됩니다.");
    if (tried("match") && S.match <= 8 || tried("write") && S.write <= 8) adv.push("짝 찾기나 쓰기에서 틀린 글자는 카드 만들기 때 한 번 더 씁니다. b·d·p·q 혼동은 이 나이에 흔합니다.");
    if (tried("first") && S.first <= 5) adv.push("첫소리 듣기가 아직 어렵습니다. 카드놀이에서 “첫소리 찾기”를 자주 합니다.");
    if (tried("cvc")) adv.push(S.cvc >= 7 ? "짧은 단어를 이미 읽습니다. 단어 읽기 구간(19~31강)을 빠르게 지나갑니다." : "단어 읽기는 아직 안 되는 것이 정상입니다. 19강부터 배웁니다.");
    var txt = "하은 영어 진단 결과 (" + (g.when || "") + ")\n" + [["up", "대문자 이름", 26, UP], ["lown", "소문자 이름", 26, LOW], ["lows", "소문자 소리", 26, LOW], ["match", "짝 찾기", 10, ML], ["write", "듣고 쓰기", 10, DICT], ["first", "첫소리", 8, FIRST], ["cvc", "짧은 단어", 10, CVC], ["sight", "자주 쓰는 단어", 5, SIGHT]].map(function (x) {
      if (!tried(x[0])) return x[1] + ": 안 함";
      var ms = missed(x[0], x[3]).map(function (y) { return Array.isArray(y) ? y[0] : y; });
      return x[1] + ": " + S[x[0]] + "/" + x[2] + (ms.length ? " (틀림: " + ms.join(" ") + ")" : ""); }).join("\n");
    return top("글자 탐험 결과", HOMEBTN) + '<div class="stage"><div class="pad"><p class="parent">부모님용 · 빨간 글자는 틀렸거나 모른 것</p><div class="result">' +
      card("up", "큰 글자 이름", 26, UP) + card("lown", "작은 글자 이름", 26, LOW) + card("lows", "작은 글자 소리", 26, LOW) + card("match", "짝 찾기", 10, ML) + card("write", "듣고 쓰기", 10, DICT) + card("first", "첫소리 고르기", 8, FIRST) + card("cvc", "짧은 단어 읽기", 10, CVC) + card("sight", "자주 쓰는 단어", 5, SIGHT) +
      '</div><div class="advice"><b style="font-family:var(--f-display);font-weight:400;font-size:22px">어디서 시작할까요</b><ul>' + adv.map(function (a) { return "<li>" + a + "</li>"; }).join("") + '</ul></div><label for="rtxt" class="parent">아래 내용을 복사해 Claude에게 보내면 진도표를 맞춰 드립니다.</label><textarea id="rtxt" readonly>' + esc(txt) + '</textarea></div><div class="bar"><button class="big sun" data-a="copy">결과 복사</button><button class="small" data-a="dredo">처음부터 다시 하기</button></div></div>';
  }

  /* ---------- 놀이 ---------- */
  function play() {
    var L = DAYS[ui.day].L.split(""), p = ui.sub;
    if (!p) return top("카드놀이", '<span class="stars">★ ' + mem.stars + "</span>" + HOMEBTN) + '<div class="stage"><div class="pad"><p class="hint" style="margin-top:0">오늘 글자: <span class="letters">' + L.join(" ").toUpperCase() + '</span> · 하고 싶은 놀이를 하은이가 골라요.</p><div class="games">' +
      '<button class="game" data-a="g" data-g="mem"><b>짝 찾기</b><span>카드를 뒤집어 큰 글자와 작은 글자 짝을 찾아요.</span></button>' +
      '<button class="game" data-a="g" data-g="first"><b>첫소리 찾기</b><span>단어를 듣고 처음에 나는 소리 글자를 눌러요.</span></button>' +
      '<button class="game" data-a="g" data-g="teach"><b>선생님 놀이</b><span>하은이가 글자 소리를 내고, 엄마 아빠가 따라 해요.</span></button>' +
      '<button class="game" data-a="g" data-g="rev"><b>복습 글자</b><span>이름이 헷갈렸던 글자 10개를 다시 만나요.</span></button></div></div></div>';
    var back = '<span class="stars">★ ' + mem.stars + '</span><button class="pill" data-a="play">놀이 고르기</button>';
    if (p.g === "mem") {
      var cols = p.cards.length <= 4 ? 2 : p.cards.length <= 8 ? 4 : p.cards.length <= 12 ? 4 : 4;
      var all = p.cards.every(function (c) { return c.ok; });
      return top("짝 찾기", back) + '<div class="stage"><div class="mem" style="grid-template-columns:repeat(' + cols + ',auto)">' + p.cards.map(function (c, i) { return '<button class="mc' + (c.ok ? " ok" : c.up ? " up" : "") + '" data-a="mc" data-i="' + i + '" aria-label="카드 ' + (i + 1) + '">' + c.ch + "</button>"; }).join("") + "</div>" + (all ? '<div class="bar"><span class="stamp" style="margin:0">다 찾았어요!</span><button class="big sun" data-a="g" data-g="mem">한 번 더</button></div>' : "") + "</div>";
    }
    if (p.g === "first") {
      var q = p.q;
      return top("첫소리 찾기", back) + '<div class="stage"><div class="center"><div class="pic" aria-hidden="true">' + PIC[q.ans][1] + '</div><button class="big sun" style="flex:none;padding:0 28px" data-a="say" data-w="' + PIC[q.ans][0] + '">소리 듣기</button><div class="choices">' + q.opts.map(function (c) { return '<button class="choice' + (q.hit === c ? " pop" : q.bad === c ? " shake" : "") + '" data-a="pf" data-c="' + c + '">' + c + "</button>"; }).join("") + '</div><div class="hint">소리가 안 나오면 엄마 아빠가 읽어 주세요: <span class="abc">' + PIC[q.ans][0] + "</span></div></div></div>";
    }
    if (p.g === "teach") return top("선생님 놀이", back) + '<div class="stage"><div class="center"><div class="abc giant">' + p.ch + '</div><div class="hint">하은 선생님이 소리를 내면, 엄마 아빠가 따라 해요. 가끔 일부러 틀려 보세요.</div></div><div class="bar"><button class="big sun" data-a="tn">다음 글자</button></div></div>';
    if (p.g === "rev") {
      if (!p.q.length) return top("복습 글자", back) + '<div class="stage"><div class="center"><span class="stamp">다 알아요!</span></div><div class="bar"><button class="big sun" data-a="g" data-g="rev">한 번 더</button></div></div>';
      var c = p.q[0];
      return top("복습 글자", back) + '<div class="stage"><div class="center"><div class="abc giant">' + c[0] + '</div><div style="font-family:var(--f-display);font-size:34px;min-height:1.5em">' + (p.show ? c[1] : "") + '</div><div class="hint">남은 글자 ' + p.q.length + "개 · 하은이가 이름을 말한 다음 정답을 확인해요.</div></div>" +
        '<div class="bar">' + (p.show ? '<button class="big no" data-a="ra">다음에 또</button><button class="big yes" data-a="rk">알았어요</button>' : '<button class="big sun" data-a="rv">정답 보기</button>') + "</div></div>";
    }
    return "";
  }
  function startGame(g) {
    var L = DAYS[ui.day].L.split("");
    if (g === "mem") { var set = shuffle(L).slice(0, 6); ui.sub = { g: g, open: [], lock: false, cards: shuffle(set.map(function (c) { return { ch: c.toUpperCase(), k: c }; }).concat(set.map(function (c) { return { ch: c, k: c }; }))) }; }
    if (g === "first") { ui.sub = { g: g, last: null }; newQ(); }
    if (g === "teach") { ui.sub = { g: g, ch: "" }; nextT(); }
    if (g === "rev") ui.sub = { g: g, q: shuffle(REVIEW), show: false };
  }
  function newQ() { var L = DAYS[ui.day].L.split(""), p = ui.sub, a; do { a = L[Math.floor(Math.random() * L.length)]; } while (L.length > 1 && a === p.last); p.last = a;
    var others = shuffle(L.filter(function (c) { return c !== a; })).slice(0, 3); p.q = { ans: a, opts: shuffle([a].concat(others)), hit: null, bad: null }; }
  function nextT() { var L = DAYS[ui.day].L.split(""), p = ui.sub, c; do { c = L[Math.floor(Math.random() * L.length)]; c = Math.random() < 0.5 ? c.toUpperCase() : c; } while (c === p.ch); p.ch = c; }

  /* ---------- 그리기 ---------- */
  function render() {
    app.innerHTML = ui.view === "check" ? diag() : ui.view === "play" ? play() : home();
    var cv = document.getElementById("cv"); if (cv) draw(cv);
  }
  function draw(cv) {
    var x = cv.getContext("2d"), on = false; x.lineWidth = 12; x.lineCap = "round"; x.lineJoin = "round"; x.strokeStyle = "#14274a";
    function pt(e) { var r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height]; }
    cv.addEventListener("pointerdown", function (e) { on = true; var p = pt(e); x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(p[0] + 0.1, p[1]); x.stroke(); e.preventDefault(); });
    cv.addEventListener("pointermove", function (e) { if (!on) return; var p = pt(e); x.lineTo(p[0], p[1]); x.stroke(); e.preventDefault(); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (n) { cv.addEventListener(n, function () { on = false; }); });
  }
  function peek(e, show) { var b = e.target.closest && e.target.closest("[data-peek]"); if (!b) return; if (show) { if (!b.dataset.orig) b.dataset.orig = b.innerHTML; b.innerHTML = '<span class="abc">' + esc(b.dataset.peek) + "</span>"; e.preventDefault(); } else if (b.dataset.orig) b.innerHTML = b.dataset.orig; }
  app.addEventListener("pointerdown", function (e) { peek(e, true); });
  ["pointerup", "pointerleave", "pointercancel", "pointerout"].forEach(function (n) { app.addEventListener(n, function (e) { peek(e, false); }); });
  app.addEventListener("contextmenu", function (e) { if (e.target.closest("[data-peek]")) e.preventDefault(); });

  app.addEventListener("click", function (e) {
    var b = e.target.closest("[data-a]"); if (!b) return;
    var a = b.dataset.a, g = mem.diag, S = g && STEPS[g.s], p = ui.sub;
    if (a === "home") return go("home");
    if (a === "check" || a === "play") return go(a);
    if (a === "day") { ui.day = +b.dataset.i; return render(); }
    if (a === "chk") { var k = DAYS[ui.day].k, d = mem.done[k] || (mem.done[k] = []); d[+b.dataset.i] = !d[+b.dataset.i]; save(); return render(); }
    if (a === "dstart") { newDiag(); return render(); }
    if (a === "dredo") { mem.diag = null; save(); return render(); }
    if (a === "dpause") { save(); return go("home"); }
    if (a === "dgo") { g.i = 0; save(); return render(); }
    if (a === "dskip") return nextStep();
    if (a === "j") { g.res[S.id][g.i] = b.dataset.v === "1"; return nextItem(); }
    if (a === "jback") { g.i--; save(); return render(); }
    if (a === "clr") { var cv = document.getElementById("cv"); if (cv) cv.getContext("2d").clearRect(0, 0, cv.width, cv.height); return; }
    if (a === "say") return speak(b.dataset.w);
    if (a === "fc") { g.res[S.id][g.i] = b.dataset.c === S.items[g.i][0][0]; return nextItem(); }
    if (a === "fskip") { g.res[S.id][g.i] = false; return nextItem(); }
    if (a === "mL") { p.sel = b.dataset.c; return render(); }
    if (a === "mR") { if (!p.sel) return; p.pairs[p.sel] = b.dataset.c; p.sel = null; return render(); }
    if (a === "mreset") { ui.sub = null; return render(); }
    if (a === "mdone") { g.res.match = ML.map(function (l) { return p.pairs[l] ? p.pairs[l] === l.toLowerCase() : false; }); return nextStep(); }
    if (a === "copy") { var t = document.getElementById("rtxt"); try { navigator.clipboard.writeText(t.value).then(function () { b.textContent = "복사했어요"; }, function () { t.select(); b.textContent = "아래 글을 길게 눌러 복사"; }); } catch (err) { t.select(); b.textContent = "아래 글을 길게 눌러 복사"; } return; }
    if (a === "g") { startGame(b.dataset.g); return render(); }
    if (a === "mc") { var c = p.cards[+b.dataset.i]; if (p.lock || c.ok || c.up) return; c.up = true; p.open.push(c);
      if (p.open.length === 2) { if (p.open[0].k === p.open[1].k) { p.open[0].ok = p.open[1].ok = true; p.open = []; mem.stars++; save(); } else { p.lock = true; setTimeout(function () { p.open.forEach(function (o) { o.up = false; }); p.open = []; p.lock = false; if (ui.sub === p) render(); }, 900); } }
      return render(); }
    if (a === "pf") { var q = p.q; if (q.hit) return; if (b.dataset.c === q.ans) { q.hit = q.ans; q.bad = null; mem.stars++; save(); render(); setTimeout(function () { if (ui.sub === p) { newQ(); render(); } }, 800); } else { q.bad = b.dataset.c; render(); } return; }
    if (a === "tn") { nextT(); return render(); }
    if (a === "rv") { p.show = true; speak(p.q[0][0].toLowerCase()); return render(); }
    if (a === "rk") { p.q.shift(); p.show = false; mem.stars++; save(); return render(); }
    if (a === "ra") { p.q.push(p.q.shift()); p.show = false; return render(); }
    if (a === "snd") { ui.snd = sndText(); if (sndInfo().en) speak("apple"); return render(); }
    if (a === "cplink") { try { navigator.clipboard.writeText(URL0).then(function () { b.textContent = "복사했어요"; }, function () { b.textContent = "옆 주소를 길게 눌러 복사"; }); } catch (err) { b.textContent = "옆 주소를 길게 눌러 복사"; } return; }
  });
  window.addEventListener("hashchange", function () { var h = location.hash.replace("#", ""); var v = h === "check" || h === "play" ? h : "home"; if (v !== ui.view) { ui.view = v; ui.sub = null; render(); } });
  try { speechSynthesis.onvoiceschanged = function () { if (ui.view === "home" && ui.snd) { ui.snd = sndText(); render(); } }; } catch (e) {}
  var h0 = location.hash.replace("#", ""); if (h0 === "check" || h0 === "play") ui.view = h0;
  render();
})();
