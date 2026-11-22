(function () {
  "use strict";
  var C = window.CONTENT, EBS = C.EBS, CHANT = C.CHANT, PIC = C.PIC, DAYS = C.DAYS, UP = C.UP, LOW = C.LOW, ML = C.ML, MR = C.MR, DICT = C.DICT, FIRST = C.FIRST, REVIEW = C.REVIEW, CVC = C.CVC, SIGHT = C.SIGHT, STEPS = C.STEPS;
  var URL0 = "https://ehd0900-coder.github.io/abc-play/";

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
  /* 친구들 그림. 꾸밈용이라 alt 는 비운다. */
  var PALS = { dog: [312, 440], bear: [284, 440], cat: [289, 440], hamster: [357, 440], friends: [900, 381], rocket: [255, 420], run: [287, 300], card: [346, 440], yay: [900, 342] };
  function pal(n, cls) { return '<img class="pal ' + cls + '" src="img/' + n + '.png" width="' + PALS[n][0] + '" height="' + PALS[n][1] + '" alt="" draggable="false">'; }
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
    return top("하은이의 영어 놀이", pal("friends", "pals") + '<button class="pill go numgo" data-a="num">' + NT.title + '</button><span class="pill">이번 주 글자 <span class="letters">' + D.L.toUpperCase().split("").join(" ") + "</span></span>") +
      warn + '<div class="week">' + week + '</div><div class="stage"><div class="pad"><div class="steps">' + steps + (allDone(ui.day) ? '<div class="yay">' + pal("dog", "pal-sm hop") + '<div class="stamp">참 잘했어요!</div></div>' : "") +
      '</div><p class="hint">다 한 것은 동그라미를 눌러 표시해요. 강의는 EBS 화면이 새로 열려요. 로그인한 뒤 강의목록에서 오늘 강의의 “강의보기”를 눌러 주세요.</p>' + sndRow + "</div></div>";
  }

  /* ---------- 진단 ---------- */
  function newDiag() { mem.diag = { s: 0, i: -1, res: {}, done: false }; save(); }
  function diag() {
    var g = mem.diag;
    if (!g) return top("글자 탐험", HOMEBTN) + '<div class="stage"><div class="center">' + pal("bear", "pal-lg") + '<p style="font-family:var(--f-display);font-size:30px;margin:0">글자를 얼마나 아는지 같이 볼까요?</p><p class="hint">15~20분 · 부모님이 옆에서 버튼을 눌러 줍니다.<br>힌트 없이, 틀려도 고쳐주지 않고, 3초 기다려 답이 없으면 넘어갑니다.<br>지치면 “오늘은 여기까지”를 누르세요. 다음에 이어서 할 수 있습니다.</p></div><div class="bar"><button class="big sun" data-a="dstart">시작하기</button></div></div>';
    if (g.done) return result();
    var S = STEPS[g.s], dots = '<div class="dots">' + STEPS.map(function (_, i) { return '<i class="' + (i < g.s ? "ok" : i === g.s ? "on" : "") + '"></i>'; }).join("") + "</div>";
    var head = top(S.t, dots + '<button class="pill" data-a="dpause">오늘은 여기까지</button>');
    if (g.i < 0) return head + '<div class="stage"><div class="center">' + pal("bear", "pal-md") + '<p class="parent">부모님께</p><p style="font-size:22px;max-width:30em;margin:0">' + S.say + '</p></div><div class="bar">' + (g.s > 0 ? "" : "") + '<button class="big sun" data-a="dgo">' + S.t + " 시작</button></div></div>";
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
      '<button class="game" data-a="g" data-g="mem"><span class="gt"><b>짝 찾기</b><span>카드를 뒤집어 큰 글자와 작은 글자 짝을 찾아요.</span></span>' + pal("dog", "") + '</button>' +
      '<button class="game" data-a="g" data-g="first"><span class="gt"><b>첫소리 찾기</b><span>단어를 듣고 처음에 나는 소리 글자를 눌러요.</span></span>' + pal("hamster", "") + '</button>' +
      '<button class="game" data-a="g" data-g="teach"><span class="gt"><b>선생님 놀이</b><span>하은이가 글자 소리를 내고, 엄마 아빠가 따라 해요.</span></span>' + pal("bear", "") + '</button>' +
      '<button class="game" data-a="g" data-g="rev"><span class="gt"><b>복습 글자</b><span>이름이 헷갈렸던 글자 10개를 다시 만나요.</span></span>' + pal("cat", "") + '</button></div></div></div>';
    var back = '<span class="stars">★ ' + mem.stars + '</span><button class="pill" data-a="play">놀이 고르기</button>';
    if (p.g === "mem") {
      var cols = p.cards.length <= 4 ? 2 : p.cards.length <= 8 ? 4 : p.cards.length <= 12 ? 4 : 4;
      var all = p.cards.every(function (c) { return c.ok; });
      return top("짝 찾기", back) + '<div class="stage"><div class="mem" style="grid-template-columns:repeat(' + cols + ',auto)">' + p.cards.map(function (c, i) { return '<button class="mc' + (c.ok ? " ok" : c.up ? " up" : "") + '" data-a="mc" data-i="' + i + '" aria-label="카드 ' + (i + 1) + '">' + c.ch + "</button>"; }).join("") + "</div>" + (all ? '<div class="bar">' + pal("dog", "pal-sm hop") + '<span class="stamp" style="margin:0">다 찾았어요!</span><button class="big sun" data-a="g" data-g="mem">한 번 더</button></div>' : "") + "</div>";
    }
    if (p.g === "first") {
      var q = p.q;
      return top("첫소리 찾기", back) + '<div class="stage"><div class="center"><div class="pic" aria-hidden="true">' + PIC[q.ans][1] + '</div><button class="big sun" style="flex:none;padding:0 28px" data-a="say" data-w="' + PIC[q.ans][0] + '">소리 듣기</button><div class="choices">' + q.opts.map(function (c) { return '<button class="choice' + (q.hit === c ? " pop" : q.bad === c ? " shake" : "") + '" data-a="pf" data-c="' + c + '">' + c + "</button>"; }).join("") + '</div><div class="hint">소리가 안 나오면 엄마 아빠가 읽어 주세요: <span class="abc">' + PIC[q.ans][0] + "</span></div></div></div>";
    }
    if (p.g === "teach") return top("선생님 놀이", back) + '<div class="stage"><div class="center"><div class="abc giant">' + p.ch + '</div><div class="hint">하은 선생님이 소리를 내면, 엄마 아빠가 따라 해요. 가끔 일부러 틀려 보세요.</div></div><div class="bar"><button class="big sun" data-a="tn">다음 글자</button></div></div>';
    if (p.g === "rev") {
      if (!p.q.length) return top("복습 글자", back) + '<div class="stage"><div class="center">' + pal("dog", "pal-lg hop") + '<span class="stamp">다 알아요!</span></div><div class="bar"><button class="big sun" data-a="g" data-g="rev">한 번 더</button></div></div>';
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

  /* ---------- 수 놀이 ----------
     원칙: 타이머·순위 없음. 틀렸다는 표시 없음(틀리면 물건을 하나씩 세어 보여 준다). 항상 물건(점) 그림이 같이 나온다.
     기록은 haeun-eng 안의 num 에만 쓴다: { lv, log: [{g,n,a,ok,lv,d}], plays: {놀이: {날짜: 판 수}}, stk: [모은 스티커] } */
  var NUM = C.NUM, NT = NUM.t, BATCHIM = { 0: 1, 1: 1, 3: 1, 6: 1, 7: 1, 8: 1, 10: 1 };
  var PIPS = [[], [4], [0, 8], [0, 4, 8], [0, 2, 6, 8], [0, 2, 4, 6, 8], [0, 2, 3, 5, 6, 8], [0, 2, 3, 4, 5, 6, 8], [0, 1, 2, 3, 5, 6, 7, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8]];
  var NPAL = { hide: "bear", rocket: "dog", dice: "hamster", ten: "cat" }, NGAMES = ["hide", "rocket", "dice", "ten"];
  var CONFETTI = ["#ffd25b", "#d9503f", "#5d8f3f", "#66a5c1", "#f8aba4"];
  /* 움직임을 줄이도록 설정한 기기에서는 기다리는 연출을 건너뛴다 */
  var CALM = false; try { CALM = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  function later(p, ms, fn) { setTimeout(function () { if (ui.sub === p) fn(); }, CALM ? 0 : ms); }
  function once(p, k) { var f = p[k]; p[k] = null; return f; }   /* 한 번만 쓰는 연출 표시 */
  function numMem() {
    var n = mem.num; if (!n || typeof n !== "object" || Array.isArray(n)) n = mem.num = {};
    if (!(n.lv >= 1 && n.lv <= NUM.levels.length)) n.lv = 1;
    if (!Array.isArray(n.log)) n.log = [];
    if (!n.plays || typeof n.plays !== "object") n.plays = {};
    if (!Array.isArray(n.stk)) n.stk = [];
    if (!n.best || typeof n.best !== "object") n.best = {};
    return n;
  }
  function today() { var n = new Date(); return n.getFullYear() + "-" + ("0" + (n.getMonth() + 1)).slice(-2) + "-" + ("0" + n.getDate()).slice(-2); }
  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  /* 받침이 있으면 은/과/이, 없으면 는/와/가 */
  function hasBatchim(x) { if (typeof x === "number") return !!BATCHIM[x]; var s = String(x), c = s.charCodeAt(s.length - 1); return c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28 !== 0; }
  function fmt(s, v) { return s.replace(/\{(\w)(은|와|가)?\}/g, function (_, k, j) { var x = v[k], b = hasBatchim(x); return x + (j === "은" ? (b ? "은" : "는") : j === "와" ? (b ? "과" : "와") : j === "가" ? (b ? "이" : "가") : ""); }); }
  function numLog(g, n, a, ok) { var N = numMem(); N.log.push({ g: g, n: n, a: a, ok: ok ? 1 : 0, lv: N.lv, d: today() }); if (N.log.length > NUM.keep) N.log = N.log.slice(-NUM.keep); save(); }
  /* 한 판을 끝내면 스티커를 하나 준다. 아직 없는 종류를 먼저 준다. */
  function giveSticker() {
    var N = numMem(), have = {}; N.stk.forEach(function (s) { have[s] = 1; });
    var fresh = NUM.stickers.filter(function (s) { return !have[s]; }), s = shuffle(fresh.length ? fresh : NUM.stickers)[0];
    N.stk.push(s); if (N.stk.length > NUM.keepStickers) N.stk = N.stk.slice(-NUM.keepStickers);
    return s;
  }
  function numPlayed(g) { var N = numMem(), P = N.plays[g] || (N.plays[g] = {}), d = today(); P[d] = (P[d] || 0) + 1; var s = giveSticker(); save(); return s; }
  function canLvUp() {
    var N = numMem(); if (N.lv >= NUM.levels.length) return false;
    var r = N.log.filter(function (e) { return e.lv === N.lv; }).slice(-NUM.suggest.window);
    return r.length >= NUM.suggest.window && r.filter(function (e) { return e.ok; }).length >= NUM.suggest.need;
  }
  /* 점 묶음. th 를 주면 까만 점 대신 그 물건 그림(딸기, 별…)으로 그린다. */
  function dots(n, f, mini, th, stagger) {
    var h = '<span class="dotbox' + (mini ? " mini" : "") + '">';
    for (var i = 0; i < n; i++) {
      var d = f ? f(i) : null, c = d && d.c ? " " + d.c : "", t = d && d.t ? d.t : "";
      h += '<i class="dot' + (th ? " th" : "") + c + (stagger ? ' in" style="animation-delay:' + (i * 80) + "ms" : "") + '">' + (th ? (c.indexOf("ghost") >= 0 ? "" : th) + (t ? "<em>" + t + "</em>" : "") : t) + "</i>";
    }
    return h + "</span>";
  }
  function nums(max) { var h = '<div class="nums">'; for (var i = 0; i <= max; i++) h += '<button class="nbtn" data-a="n-ans" data-v="' + i + '">' + i + "</button>"; return h + "</div>"; }
  function confetti() {
    var h = '<span class="confetti" aria-hidden="true">';
    for (var i = 0; i < 26; i++) { var ang = Math.PI * 2 * i / 26 + Math.random() * 0.4, r = rnd(80, 230); h += '<i style="--x:' + Math.round(Math.cos(ang) * r) + "px;--y:" + Math.round(Math.sin(ang) * r - 50) + "px;--r:" + rnd(-400, 400) + "deg;animation-delay:" + rnd(0, 120) + "ms;background:" + CONFETTI[i % CONFETTI.length] + '"></i>'; }
    return h + "</span>";
  }
  /* 한 판을 끝냈을 때 위에서 내리는 색종이 */
  function rain() {
    var h = '<span class="rain" aria-hidden="true">';
    for (var i = 0; i < 34; i++) h += '<i style="left:' + rnd(2, 98) + "%;animation-delay:" + rnd(0, 1800) + "ms;animation-duration:" + rnd(1800, 3200) + "ms;--r:" + rnd(-500, 500) + "deg;background:" + CONFETTI[i % CONFETTI.length] + '"></i>';
    return h + "</span>";
  }
  /* 화면 구석에서 반짝이는 별 */
  function sparks() { var h = ""; for (var i = 1; i <= 6; i++) h += '<span class="spark s' + i + '" aria-hidden="true">✦</span>'; return h; }
  /* 맞혔을 때 색종이는 한 번만 터진다(다시 그릴 때는 안 나옴) */
  function fx(p) { var f = p.fx; p.fx = false; return !!f; }
  function say(t, pop) { return '<p class="say">' + t + (pop ? confetti() : "") + "</p>"; }
  function stk(id, cls) { var isPal = String(id).slice(0, 4) === "pal:" && PALS[id.slice(4)]; return '<span class="stk' + (cls ? " " + cls : "") + '">' + (isPal ? pal(id.slice(4), "") : esc(id)) + "</span>"; }
  /* 맞고 틀림이 없는 놀이(10 만들기, 거꾸로 세기)는 끝난 뒤에 걸린 시간을 알려 준다. 놀이 중에는 시계를 보이지 않는다. */
  function clock(p, key) { var N = numMem(), s = Math.max(1, Math.round((Date.now() - p.t0) / 1000)), old = N.best[key]; p.sec = s; p.best = old; p.newBest = !old || s < old; if (p.newBest) N.best[key] = s; }
  function timeRow(p) { return p.sec ? '<p class="timerow">' + fmt(NT.timeTook, { n: p.sec }) + (p.newBest ? ' <b class="newbest">' + NT.timeNew + "</b>" : " <span>" + fmt(NT.timeBest, { n: p.best }) + "</span>") + "</p>" : ""; }
  function bestLine(N) { var names = [["ten", NT.games.ten[0]]].concat(NUM.rocket.map(function (n) { return ["rocket" + n, NT.games.rocket[0] + " " + fmt(NT.rocketFrom, { n: n })]; })), a = names.filter(function (x) { return N.best[x[0]]; }).map(function (x) { return x[1] + " " + N.best[x[0]] + "초"; }); return a.length ? "\n가장 빠른 기록: " + a.join(", ") : ""; }
  function nback() { return '<button class="pill" data-a="num">' + NT.pick + "</button>"; }
  function helpBtn(p) { return '<button class="big no" data-a="n-help"' + (p.help ? " disabled" : "") + ">" + NT.help + "</button>"; }
  function nextBtn() { return '<button class="big sun" data-a="n-next">' + NT.next + "</button>"; }
  function endBtns(g) { return (canLvUp() && (g === "hide" || g === "dice") ? '<button class="big ink" data-a="n-lvup">' + NT.lvup + "</button>" : "") + '<button class="big no" data-a="num">' + NT.stop + '</button><button class="big sun" data-a="n-g" data-g="' + g + '">' + NT.again + "</button>"; }
  function gotRow(p) { return p.got ? '<div class="got">' + stk(p.got, "arrive") + "<span>" + NT.stkGot + "</span></div>" : ""; }
  /* 한 판 끝: 친구들이 폴짝폴짝 뛰는 짧은 영상(소리 없음). 영상이 안 뜨면 같은 그림이 대신 보인다. */
  function yayClip() { return CALM ? pal("yay", "pal-yay") : '<video class="pal-yay" src="img/yay.mp4" poster="img/yay.png" width="640" height="300" autoplay loop muted playsinline disablepictureinpicture aria-hidden="true"></video>'; }
  function ndone(g, msg, p) { var first = fx(p); return '<div class="stage fun">' + (first ? rain() : "") + sparks() + '<div class="center">' + yayClip() + '<span class="stamp stampin">' + msg + (first ? confetti() : "") + "</span>" + gotRow(p) + '</div><div class="bar">' + endBtns(g) + "</div></div>"; }
  /* 틀렸을 때: 물건을 하나씩 밝히며 센다. 다 세면 then 단계로 넘어간다. */
  function countUp(p, total, then) {
    p.step = 0;
    (function tick() { setTimeout(function () { if (ui.sub !== p || p.ph !== "count") return; p.step++; if (p.step >= total) p.ph = then; render(); if (p.ph === "count") tick(); }, NUM.countMs); })();
  }
  function numStart(g, keepPos) {
    var N = numMem(), max = NUM.levels[N.lv - 1], prev = N.lv > 1 ? NUM.levels[N.lv - 2] : 1, th = shuffle(NUM.things)[0];
    if (g === "hide") {
      /* 문제는 (전체 n, 보이는 b). 새 단계의 큰 수를 많이, 앞 단계 수를 조금 섞는다. */
      var hi = [], lo = [], n, b; for (n = 2; n <= max; n++) for (b = 1; b < n; b++) (n > prev ? hi : lo).push({ n: n, b: b });
      var q = shuffle(hi).slice(0, N.lv > 1 ? Math.ceil(NUM.round * 0.75) : NUM.round); q = shuffle(q.concat(shuffle(lo).slice(0, NUM.round - q.length)));
      ui.sub = { g: g, q: q, cur: q.shift(), ph: "show", retry: 0, help: false, step: 0, counted: false, doneN: 0, lv: N.lv, th: th, intro: true };
    }
    if (g === "dice") ui.sub = { g: g, pos: keepPos || 0, asked: 0, ph: "roll", d: [0, 0], big: 0, small: 0, re: false, help: false, step: 0, counted: false, retry: 0, pend: [], lv: N.lv, f1: max, f2: Math.min(6, max), th: th };
    if (g === "rocket") ui.sub = { g: g, ph: "pick" };
    if (g === "ten") ui.sub = { g: g, ph: "play", cards: shuffle([1, 2, 3, 4, 5, 5, 6, 7, 8, 9]).map(function (v) { return { v: v, gone: false }; }), sel: null, bad: null, last: null, t0: Date.now() };
  }
  function numMenu() {
    var N = numMem(), n = N.stk.length;
    return top(NT.title, HOMEBTN) + '<div class="stage fun">' + sparks() + '<div class="pad"><p class="hint" style="margin-top:0">' + NT.menuHint + '</p><div class="games ng">' +
      NGAMES.map(function (g, i) { return '<button class="game rise" style="animation-delay:' + (i * 90) + 'ms" data-a="n-g" data-g="' + g + '"><span class="gt"><b>' + NT.games[g][0] + "</b><span>" + NT.games[g][1] + "</span></span>" + pal(NPAL[g], "") + "</button>"; }).join("") +
      '</div><button class="stkbar" data-a="n-board"><b>' + NT.board + "</b><span>" + (n ? fmt(NT.stkCount, { n: n }) : NT.stkHow) + '</span><span class="stkrow">' + N.stk.slice(-6).map(function (s) { return stk(s, "sm"); }).join("") + "</span></button>" +
      '<div class="numfoot"><button class="small" data-a="n-parent">' + NT.parent + '</button><span class="parent">' + NT.level + "</span>" +
      NUM.levels.map(function (m, i) { return '<button class="small' + (N.lv === i + 1 ? " on" : "") + '" data-a="n-lv" data-v="' + (i + 1) + '">' + fmt(NT.levelName, { n: i + 1 }) + " · " + fmt(NT.levelMax, { n: m }) + "</button>"; }).join("") + "</div></div></div>";
  }
  function boardView() {
    var N = numMem(), n = N.stk.length, kinds = {}, slots = Math.max(20, Math.ceil((n + 1) / 10) * 10), h = "", i;
    N.stk.forEach(function (s) { kinds[s] = 1; });
    for (i = 0; i < slots; i++) h += i < n ? '<span class="stkslot' + (i === n - 1 ? " newest" : "") + '" style="animation-delay:' + Math.min(i * 60, 1200) + 'ms">' + stk(N.stk[i], "t" + (i % 3)) + "</span>" : '<span class="stk empty"></span>';
    return top(NT.board, nback()) + '<div class="stage fun">' + sparks() + '<div class="pad" style="text-align:center">' + say(n ? fmt(NT.stkHave, { n: n }) : NT.stkNone) +
      '<p class="hint">' + fmt(NT.stkKinds, { a: Object.keys(kinds).length, b: NUM.stickers.length }) + " · " + NT.stkHow + '</p><div class="stkgrid">' + h + "</div></div></div>";
  }
  function hideView(p) {
    var c = p.cur, a = c.n - c.b, deep = p.lv >= NUM.dotsHelpFrom, noDots = deep && !p.help, T = p.th[0], tn = p.th[1];
    var head = top(NT.games.hide[0], '<span class="hint">' + (p.doneN + (p.ph === "done" ? 0 : 1)) + " / " + (p.doneN + (p.ph === "done" ? 0 : 1) + p.q.length) + "</span>" + nback());
    if (p.ph === "done") return head + ndone("hide", NT.done, p);
    if (p.ph === "show") return head + '<div class="stage"><div class="center">' + say(fmt(NT.hideShow, { n: c.n, t: tn })) + (noDots ? '<div class="eq">' + c.n + "</div>" : dots(c.n, null, false, T, once(p, "intro"))) + '</div><div class="bar">' + (deep ? helpBtn(p) : "") + '<button class="big sun" data-a="n-hgo">' + NT.hideGo + "</button></div></div>";
    var cup = '<div class="hside hcup">' + pal("bear", "pal-md") + '<span class="cup' + (once(p, "wob") ? " wob" : "") + '">?</span></div>';
    /* 숨기는 장면: 물건이 컵 속으로 쏙 들어간다 */
    if (p.ph === "hiding") return head + '<div class="stage"><div class="center">' + say(fmt(NT.hideShow, { n: c.n, t: tn })) + '<div class="hrow"><div class="hside">' + dots(c.n, function (i) { return i >= c.b ? { c: "tocup" } : null; }, false, T) + "</div>" + cup + "</div></div></div>";
    if (p.ph === "ask") return head + '<div class="stage"><div class="center">' + say(NT.hideAsk) + '<div class="hrow"><div class="hside"><span class="hint">' + fmt(NT.hideSee, { t: tn }) + "</span>" + (noDots ? '<div class="eq">' + c.b + "</div>" : dots(c.b, null, false, T)) + "</div>" + cup + '</div><span class="hint">' + fmt(NT.hideAll, { n: c.n }) + "</span>" + nums(c.n) + "</div>" + (deep ? '<div class="bar">' + helpBtn(p) + "</div>" : "") + "</div>";
    /* 열어 보여 주기: 맞았으면 바로(곰이 폴짝), 틀렸으면 하나씩 세면서 */
    var counting = p.ph === "count", first = fx(p);
    var hid = dots(a, function (i) { return p.counted ? (i < p.step ? { c: "was" + (counting && i === p.step - 1 ? " new" : ""), t: i + 1 } : { c: "ghost" }) : { c: "was" }; }, false, T, first && !p.counted);
    return head + '<div class="stage"><div class="center">' + say(counting ? NT.countTogether : fmt(NT.split, { n: c.n, a: c.b, b: a }), first) + '<div class="hrow"><div class="hside">' + dots(c.b, null, false, T) + '</div><div class="hside">' + hid + "</div>" + (p.counted ? "" : '<div class="hside">' + pal("bear", "pal-md hop") + "</div>") + "</div>" +
      '<span class="hint">' + fmt(NT.hideAll, { n: c.n }) + "</span></div>" + (counting ? "" : '<div class="bar">' + nextBtn() + "</div>") + "</div>";
  }
  function diceView(p) {
    var ans = p.big - p.small, noDots = p.lv >= NUM.dotsHelpFrom && !p.help, i;
    var head = top(NT.games.dice[0], '<span class="hint">' + Math.min(p.asked + (p.ph === "ask" ? 1 : 0), NUM.roundDice) + " / " + NUM.roundDice + "</span>" + nback());
    if (p.ph === "done") return head + ndone("dice", p.pos >= NUM.board ? NT.diceGoal : NT.diceStop, p);
    /* 말판: 캠핑장(텐트)까지 가는 길 */
    var board = '<div class="board">'; for (i = 0; i <= NUM.board; i++) board += '<span class="cell' + (i < p.pos ? " past" : i === p.pos ? " here" : "") + (i === NUM.board ? " goal" : "") + '">' + (i === p.pos ? pal("run", "runner" + (p.moving ? " step" : "")) : i === NUM.board ? "⛺" : i && i % 5 === 0 ? i : "") + "</span>"; board += "</div>";
    var bigAt = p.d[0] >= p.d[1] ? 0 : 1;
    function die(v, isBig) {
      if (!v) return '<span class="die q">?</span>';
      if (noDots && p.ph === "ask") return '<span class="die q">' + v + "</span>";
      var act = PIPS[v], cut = isBig && p.help && p.ph === "ask" ? p.small : 0, k = 0, h = '<span class="die">';
      for (var j = 0; j < 9; j++) { var on = act.indexOf(j) >= 0; if (on) k++; h += '<i class="' + (on ? (k > v - cut ? "x" : "") : "o") + '"></i>'; }
      return h + "</span>";
    }
    var canRoll = p.ph === "roll" || p.ph === "zero", dice = die(p.d[0], bigAt === 0) + die(p.d[1], bigAt === 1);
    dice = canRoll ? '<button class="dice" data-a="n-roll" aria-label="' + NT.diceRoll + '">' + dice + "</button>" : '<div class="dice' + (p.ph === "rolling" ? " spin" : "") + '">' + dice + "</div>";
    var eq = function (r) { return '<div class="eq">' + p.big + ' <i class="mn" aria-label="빼기"></i> ' + p.small + " = " + r + "</div>"; }, mid = "", bar = "";
    if (p.ph === "roll") mid = say(NT.diceRoll) + dice;
    if (p.ph === "zero") mid = say(NT.diceZero) + dice;
    if (p.ph === "ask") { mid = dice + eq("?") + nums(p.big); bar = helpBtn(p); }
    if (p.ph === "rolling") mid = say(NT.diceRoll) + dice;
    if (p.ph === "right") { mid = say(fmt(NT.diceMove, { n: ans }), !p.moving && fx(p)) + dice + eq(ans); bar = p.moving ? "" : nextBtn(); }
    if (p.ph === "count" || p.ph === "open") {
      /* 큰 수만큼 물건을 놓고, 작은 수만큼 하나씩 줄을 긋고, 남은 것을 하나씩 센다 */
      var crossed = Math.min(p.step, p.small), counted = Math.max(0, p.step - p.small);
      mid = say(p.ph === "count" ? NT.countTogether : fmt(NT.split, { n: p.big, a: p.small, b: ans })) + dots(p.big, function (j) { return j >= p.big - crossed ? { c: "x" } : j < counted ? { c: "was" + (p.ph === "count" && j === counted - 1 ? " new" : ""), t: j + 1 } : null; }, false, p.th[0]) + eq(p.ph === "open" ? ans : "?");
      if (p.ph === "open") bar = nextBtn();
    }
    return head + '<div class="stage"><div class="center">' + board + mid + "</div>" + (bar ? '<div class="bar">' + bar + "</div>" : "") + "</div>";
  }
  function rocketView(p) {
    var head = top(NT.games.rocket[0], nback());
    if (p.ph === "pick") return head + '<div class="stage"><div class="center">' + pal("dog", "pal-md") + say(NT.rocketPick) + '<div class="nums">' + NUM.rocket.map(function (n) { return '<button class="nbtn wide" data-a="n-rpick" data-v="' + n + '">' + fmt(NT.rocketFrom, { n: n }) + "</button>"; }).join("") + "</div></div></div>";
    var done = p.ph === "done", gauge = "", i; for (i = p.n; i >= 1; i--) gauge += '<i class="' + (i > p.next ? "on" : "") + '"></i>';
    var pop = once(p, "pop"), filled = p.n - p.next;
    var bubs = p.order.map(function (v, k) { var gone = v > p.next; return '<button class="bub' + (gone ? " gone" : "") + (pop === v ? " popped" : "") + (p.bad === v ? " shake" : "") + '" style="margin-top:' + p.off[k] + 'px" data-a="n-rb" data-v="' + v + '"' + (gone ? " disabled" : "") + "><b>" + v + "</b>" + dots(v, null, true) + "</button>"; }).join("");
    return head + '<div class="stage"><div class="center">' + say(done ? NT.rocketGo : NT.rocketHint, done && fx(p)) + (done ? timeRow(p) : "") + '<div class="rk"><div class="bubbles">' + bubs + '</div><div class="pad-r' + (filled && !done ? " rumble" : "") + '"><span class="ship' + (done ? " fly" : "") + '" style="--f:' + (filled / p.n).toFixed(2) + '">' + pal("rocket", "") + '<i class="flame"></i></span>' + (done ? '<span class="puffs" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>' : "") + '<span class="gauge">' + gauge + "</span></div></div></div>" +
      (done ? '<div class="bar"><span class="stamp" style="margin:0">' + NT.rocketGo + "</span>" + gotRow(p) + endBtns("rocket") + "</div>" : "") + "</div>";
  }
  function tenView(p) {
    var done = p.ph === "done", zap = once(p, "zap") || [], first = fx(p);
    var cards = p.cards.map(function (c, i) { return '<button class="tc' + (c.gone ? (zap.indexOf(i) >= 0 ? " zap" : " gone") : "") + (p.sel === i ? " sel" : "") + (p.bad && p.bad.indexOf(i) >= 0 ? " shake" : "") + '" data-a="n-tc" data-i="' + i + '"' + (c.gone ? " disabled" : "") + "><b>" + c.v + "</b>" + dots(10, function (k) { return k < c.v ? null : { c: "ghost" }; }, true) + "</button>"; }).join("");
    return top(NT.games.ten[0], nback()) + '<div class="stage"><div class="center">' + say(p.last ? fmt(NT.tenPair, { a: p.last[0], b: p.last[1] }) : NT.tenHint, first) + (done ? timeRow(p) : "") + (first && p.last ? '<span class="tenpop" aria-hidden="true">10</span>' : "") + (done ? pal("card", "pal-lg hop") : '<div class="rk">' + pal("card", "pal-md tencat") + '<div class="tens">' + cards + "</div></div>") + "</div>" +
      (done ? '<div class="bar"><span class="stamp" style="margin:0">' + NT.done + "</span>" + gotRow(p) + endBtns("ten") + "</div>" : "") + "</div>";
  }
  function numReport() {
    var N = numMem(), miss = {}, rows = NGAMES.map(function (g) {
      var P = N.plays[g] || {}, days = Object.keys(P), rounds = days.reduce(function (s, d) { return s + P[d]; }, 0), L = N.log.filter(function (e) { return e.g === g; });
      return { g: g, name: NT.games[g][0], days: days.length, rounds: rounds, tot: L.length, ok: L.filter(function (e) { return e.ok; }).length };
    });
    N.log.forEach(function (e) { if (!e.ok) { var k = e.n + "-" + e.a; miss[k] = (miss[k] || 0) + 1; } });
    var top5 = Object.keys(miss).sort(function (x, y) { return miss[y] - miss[x]; }).slice(0, 5).map(function (k) { return [k, miss[k]]; });
    var lvTxt = fmt(NT.levelName, { n: N.lv }) + " (" + fmt(NT.levelMax, { n: NUM.levels[N.lv - 1] }) + ")";
    var txt = NT.report + " (" + today() + ")\n지금 단계: " + lvTxt + "\n" + rows.map(function (r) { return r.name + ": " + r.days + "일 " + r.rounds + "판" + (r.tot ? ", 첫 시도 " + r.ok + "/" + r.tot : ""); }).join("\n") +
      "\n스티커: " + N.stk.length + "개" + bestLine(N) + "\n자주 틀린 빼기: " + (top5.length ? top5.map(function (m) { return m[0] + "(" + m[1] + "번)"; }).join(" ") : NT.none);
    return { rows: rows, top5: top5, lvTxt: lvTxt, txt: txt };
  }
  function parentView() {
    var R = numReport();
    return top(NT.parent, nback()) + '<div class="stage"><div class="pad"><p class="parent">부모님용 · 첫 시도에 맞힌 것만 정답으로 셉니다</p><div class="result">' +
      '<div class="rc"><small>지금 단계</small><b>' + R.lvTxt + "</b></div>" +
      R.rows.map(function (r) { return '<div class="rc"><small>' + r.name + "</small><b>" + r.days + "일 · " + r.rounds + "판</b>" + (r.tot ? "<small>첫 시도 " + r.ok + " / " + r.tot + " (" + Math.round(r.ok * 100 / r.tot) + "%)</small>" : "") + "</div>"; }).join("") +
      '</div><div class="advice"><b style="font-family:var(--f-display);font-weight:400;font-size:22px">자주 틀린 빼기</b><ul>' + (R.top5.length ? R.top5.map(function (m) { return '<li><span class="abc">' + m[0].replace("-", " − ") + "</span> · " + m[1] + "번</li>"; }).join("") : "<li>" + NT.none + "</li>") +
      '</ul></div><label for="rtxt" class="parent">' + NT.copyHint + '</label><textarea id="rtxt" readonly>' + esc(R.txt) + '</textarea></div><div class="bar"><button class="big sun" data-a="copy">결과 복사</button></div></div>';
  }
  function numView() { var p = ui.sub; return !p ? numMenu() : p.g === "hide" ? hideView(p) : p.g === "dice" ? diceView(p) : p.g === "rocket" ? rocketView(p) : p.g === "ten" ? tenView(p) : p.g === "board" ? boardView() : parentView(); }
  function numClick(a, b) {
    var p = ui.sub, N = numMem(), v = +b.dataset.v, c, ok, i;
    if (a === "g") { numStart(b.dataset.g, p && p.g === "dice" && b.dataset.g === "dice" && p.pos < NUM.board ? p.pos : 0); return render(); }
    if (a === "parent" || a === "board") { ui.sub = { g: a }; return render(); }
    if (a === "lv") { if (v >= 1 && v <= NUM.levels.length) { N.lv = v; save(); } return render(); }
    if (!p) return;
    if (a === "lvup") { if (N.lv < NUM.levels.length) { N.lv++; save(); } numStart(p.g, 0); return render(); }
    if (a === "help") { p.help = true; return render(); }
    if (p.g === "hide") {
      c = p.cur;
      if (a === "hgo" && p.ph === "show") {
        /* 물건이 컵 속으로 들어가는 장면을 잠깐 보여 준 뒤 묻는다 */
        if (CALM || (p.lv >= NUM.dotsHelpFrom && !p.help)) { p.ph = "ask"; p.wob = true; }
        else { p.ph = "hiding"; later(p, 900, function () { if (p.ph === "hiding") { p.ph = "ask"; p.wob = true; render(); } }); }
      }
      else if (a === "ans" && p.ph === "ask") {
        ok = v === c.n - c.b; if (!c.re) numLog("hide", c.n, c.b, ok);
        if (ok) { p.counted = false; p.ph = "open"; p.fx = true; }
        else {
          /* 틀린 문제는 2~3문제 뒤에 한 번 더 낸다 */
          if (!c.re && p.retry < NUM.retryMax) { p.retry++; p.q.splice(Math.min(p.q.length, rnd(1, 2)), 0, { n: c.n, b: c.b, re: true }); }
          p.counted = true; p.ph = "count"; countUp(p, c.n - c.b, "open");
        }
      }
      else if (a === "next" && p.ph === "open") {
        p.doneN++;
        if (!p.q.length) { p.ph = "done"; p.got = numPlayed("hide"); p.fx = true; }
        else { p.cur = p.q.shift(); p.ph = "show"; p.help = false; p.counted = false; p.step = 0; p.intro = true; }
      }
      return render();
    }
    if (p.g === "dice") {
      if (a === "roll" && (p.ph === "roll" || p.ph === "zero")) {
        var fin;
        if (p.pend.length && p.pend[0].wait <= 0) { c = p.pend.shift(); fin = Math.random() < 0.5 ? [c.big, c.small] : [c.small, c.big]; p.re = true; }
        else { fin = [rnd(1, p.f1), rnd(1, p.f2)]; p.re = false; p.pend.forEach(function (x) { x.wait--; }); }
        p.help = false; p.step = 0; p.ph = "rolling";
        /* 주사위가 데굴데굴 구르다가 멈춘다 */
        (function spin(k) {
          if (k <= 0 || CALM) { p.d = fin; p.big = Math.max(fin[0], fin[1]); p.small = Math.min(fin[0], fin[1]); p.ph = p.big === p.small ? "zero" : "ask"; return render(); }
          p.d = [rnd(1, p.f1), rnd(1, p.f2)]; render(); later(p, 90, function () { if (p.ph === "rolling") spin(k - 1); });
        })(7);
        return;
      }
      else if (a === "ans" && p.ph === "ask") {
        ok = v === p.big - p.small; if (!p.re) numLog("dice", p.big, p.small, ok); p.asked++;
        if (ok) {
          /* 햄스터가 답만큼 한 칸씩 폴짝폴짝 뛰어간다 */
          var to = Math.min(NUM.board, p.pos + v); p.ph = "right"; p.moving = true;
          (function hop() {
            if (p.pos >= to || CALM) { p.pos = to; p.moving = false; p.fx = true; return render(); }
            later(p, 300, function () { if (p.ph !== "right" || !p.moving) return; p.pos++; render(); hop(); });
          })();
        }
        else {
          if (!p.re && p.retry < NUM.retryMax) { p.retry++; p.pend.push({ big: p.big, small: p.small, wait: rnd(1, 2) }); }
          p.ph = "count"; countUp(p, p.big, "open");
        }
      }
      else if (a === "next" && !p.moving && (p.ph === "right" || p.ph === "open")) {
        if (p.pos >= NUM.board || p.asked >= NUM.roundDice) { p.ph = "done"; p.got = numPlayed("dice"); p.fx = true; }
        else { p.ph = "roll"; p.d = [0, 0]; p.help = false; }
      }
      return render();
    }
    if (p.g === "rocket") {
      if (a === "rpick" && NUM.rocket.indexOf(v) >= 0) { var arr = []; for (i = 1; i <= v; i++) arr.push(i); p.n = v; p.next = v; p.order = shuffle(arr); p.off = arr.map(function () { return rnd(0, 22); }); p.bad = null; p.ph = "play"; p.t0 = Date.now(); }
      else if (a === "rb" && p.ph === "play") {
        if (v === p.next) { p.pop = v; p.next--; p.bad = null; if (p.next === 0) { p.ph = "done"; clock(p, "rocket" + p.n); p.got = numPlayed("rocket"); p.fx = true; } }
        else p.bad = v;   /* 순서가 아니면 그 방울만 살짝 흔들린다 */
      }
      return render();
    }
    if (p.g === "ten") {
      i = +b.dataset.i;
      if (a === "tc" && p.ph === "play" && p.cards[i] && !p.cards[i].gone) {
        if (p.sel === null) { p.sel = i; p.bad = null; }
        else if (p.sel === i) p.sel = null;
        else if (p.cards[p.sel].v + p.cards[i].v === 10) {
          p.cards[p.sel].gone = p.cards[i].gone = true; p.zap = [p.sel, i]; p.last = [p.cards[p.sel].v, p.cards[i].v]; p.sel = null; p.bad = null; p.fx = true;
          if (p.cards.every(function (x) { return x.gone; })) { p.ph = "done"; clock(p, "ten"); p.got = numPlayed("ten"); }
        }
        else { p.bad = [p.sel, i]; p.sel = null; }   /* 짝이 아니면 두 장이 살짝 흔들리고 제자리 */
      }
      return render();
    }
  }

  /* ---------- 그리기 ---------- */
  function render() {
    app.innerHTML = ui.view === "check" ? diag() : ui.view === "play" ? play() : ui.view === "num" ? numView() : home();
    var cv = document.getElementById("cv"); if (cv) draw(cv);
    var vd = app.querySelector("video"); if (vd) { try { vd.muted = true; var pr = vd.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {} }
  }
  function draw(cv) {
    var x = cv.getContext("2d"), on = false; x.lineWidth = 12; x.lineCap = "round"; x.lineJoin = "round"; x.strokeStyle = "#2b2118";
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
    if (a === "check" || a === "play" || a === "num") return go(a);
    if (a.slice(0, 2) === "n-") return numClick(a.slice(2), b);
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
  window.addEventListener("hashchange", function () { var h = location.hash.replace("#", ""); var v = h === "check" || h === "play" || h === "num" ? h : "home"; if (v !== ui.view) { ui.view = v; ui.sub = null; render(); } });
  try { speechSynthesis.onvoiceschanged = function () { if (ui.view === "home" && ui.snd) { ui.snd = sndText(); render(); } }; } catch (e) {}
  var h0 = location.hash.replace("#", ""); if (h0 === "check" || h0 === "play" || h0 === "num") ui.view = h0;
  render();
})();
