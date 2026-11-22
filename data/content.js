/* 내용만 담는 파일. 요일별 할 일·문항·단어·강의 주소를 고칠 때 이 파일만 손댄다. */
window.CONTENT = (function () {
  "use strict";
  var EBS = "https://primary.ebs.co.kr/course/view?courseId=10029514";
  var CHANT = "http://www.ebse.co.kr/apps/online/view.do?course_id=ECLIP000001222";
  var PIC = { a: ["apple", "🍎"], b: ["ball", "⚽"], c: ["cat", "🐱"], d: ["dog", "🐶"], e: ["egg", "🥚"], f: ["fish", "🐟"], g: ["goat", "🐐"], h: ["hat", "🎩"],
    i: ["insect", "🐞"], j: ["juice", "🧃"], k: ["kite", "🪁"], l: ["lion", "🦁"], m: ["milk", "🥛"], n: ["nut", "🥜"], o: ["octopus", "🐙"], p: ["pig", "🐷"], q: ["queen", "👸"], r: ["rabbit", "🐰"],
    s: ["sun", "☀️"], t: ["tiger", "🐯"], u: ["umbrella", "☂️"], v: ["van", "🚐"], w: ["web", "🕸️"], y: ["yo-yo", "🪀"], z: ["zebra", "🦓"] };
  /* 진도: 2026-11-13 글자 탐험 결과에 맞춤.
     소리를 아는 글자 a b c d g j p s t u v x z → 그 강의(2·10·11강)는 건너뛴다.
     소리를 모르는 글자 e f h i k l m n o q r w y → 하루 한 강의씩, 2주에 끝낸다.
     L 은 그날 카드놀이에 나오는 글자. 새 글자 + 아직 덜 익은 글자 위주. (x 는 첫소리 단어가 없어 넣지 않는다) */
  var DAYS = [
    { k: "11-13", d: "금", n: "11/13", L: "ab", steps: [
      { t: "글자 탐험", m: "15~20분 · 부모님과 같이", act: "check" },
      { t: "쉬기", m: "5분 · 물 마시고 간식" },
      { t: "EBS 1강 「A, B」", m: "15분 · 강의목록 맨 위", link: EBS },
      { t: "카드놀이", m: "5~10분", act: "play" },
      { t: "오늘 제일 재밌었던 것 말하기", m: "1분" }] },
    { k: "11-16", d: "월", n: "11/16", L: "abef", steps: [
      { t: "EBS 3강 「E, F」", m: "15분 · 강의목록 세 번째 (2강 C, D는 소리를 알아서 건너뛰어요)", link: EBS },
      { t: "카드 만들기", m: "2분 · 종이에 E e F f 쓰기" },
      { t: "카드놀이", m: "5~10분 · 첫소리 찾기부터", act: "play" }] },
    { k: "11-17", d: "화", n: "11/17", L: "efgh", steps: [
      { t: "EBS 4강 「G, H」", m: "15분 · 강의목록 네 번째", link: EBS },
      { t: "카드 만들기", m: "2분 · 종이에 G g H h 쓰기" },
      { t: "카드놀이", m: "5~10분 · 하고 싶은 놀이 고르기", act: "play" }] },
    { k: "11-18", d: "수", n: "11/18", L: "efhij", steps: [
      { t: "EBS 5강 「I, J」", m: "15분 · 강의목록 다섯 번째", link: EBS },
      { t: "카드 만들기", m: "2분 · 종이에 I i J j 쓰기 (큰 J 한 번 더)" },
      { t: "카드놀이", m: "5~10분 · 하고 싶은 놀이 고르기", act: "play" }] },
    { k: "11-19", d: "목", n: "11/19", L: "efhikl", steps: [
      { t: "EBS 6강 「K, L」", m: "15분 · 강의목록 여섯 번째", link: EBS },
      { t: "카드 만들기", m: "2분 · 종이에 K k L l 쓰기" },
      { t: "카드놀이", m: "5~10분 · 하고 싶은 놀이 고르기", act: "play" }] },
    { k: "11-20", d: "금", n: "11/20", L: "efhiklmn", steps: [
      { t: "챈트로 몸풀기", m: "5분", link: CHANT },
      { t: "EBS 7강 「M, N」", m: "15분 · 강의목록 일곱 번째", link: EBS },
      { t: "쉬기", m: "5분" },
      { t: "게임", m: "15분 · 하고 싶은 놀이 고르기", act: "play" },
      { t: "읽기 자랑", m: "5분 · 하은이가 선생님" }] },
    { k: "11-23", d: "월", n: "11/23", L: "iklmnop", steps: [
      { t: "EBS 8강 「O, P」", m: "15분 · 강의목록 여덟 번째", link: EBS },
      { t: "카드 만들기", m: "2분 · 종이에 O o P p 쓰기" },
      { t: "카드놀이", m: "5~10분 · 첫소리 찾기부터", act: "play" }] },
    { k: "11-24", d: "화", n: "11/24", L: "lmnoqr", steps: [
      { t: "EBS 9강 「Q, R」", m: "15분 · 강의목록 아홉 번째", link: EBS },
      { t: "카드 만들기", m: "2분 · 종이에 Q q R r 쓰기 (큰 Q 한 번 더)" },
      { t: "카드놀이", m: "5~10분 · 하고 싶은 놀이 고르기", act: "play" }] },
    { k: "11-25", d: "수", n: "11/25", L: "noqrw", steps: [
      { t: "EBS 12강 「W, X」", m: "15분 · 강의목록 열두 번째 (10강 S, T · 11강 U, V는 소리를 알아서 건너뛰어요)", link: EBS },
      { t: "카드 만들기", m: "2분 · 종이에 W w S s 쓰기" },
      { t: "카드놀이", m: "5~10분 · 복습 글자부터", act: "play" }] },
    { k: "11-26", d: "목", n: "11/26", L: "oqrwyz", steps: [
      { t: "EBS 13강 「Y, Z」", m: "15분 · 강의목록 열세 번째", link: EBS },
      { t: "카드 만들기", m: "2분 · 종이에 Y y Z z 쓰기" },
      { t: "카드놀이", m: "5~10분 · 하고 싶은 놀이 고르기", act: "play" }] },
    { k: "11-27", d: "금", n: "11/27", L: "efhiklmnoqrwy", steps: [
      { t: "챈트로 몸풀기", m: "5분", link: CHANT },
      { t: "글자 탐험 다시", m: "10분 · “작은 글자 소리”만 하고 나머지는 건너뛰기", act: "check" },
      { t: "쉬기", m: "5분" },
      { t: "게임", m: "15분 · 하고 싶은 놀이 고르기", act: "play" },
      { t: "읽기 자랑", m: "5분 · 하은이가 선생님" }] }
  ];
  var UP = "CFWGOYLQZIJXENMKVDTPASUHBR".split("");
  var LOW = "habrvxomipdstlgznqkecuywjf".split("");
  var ML = "BDGQRNHEAF".split(""), MR = "qhbfrgaedn".split("");
  var DICT = [["G", "큰 지"], ["Q", "큰 큐"], ["R", "큰 알"], ["J", "큰 제이"], ["Y", "큰 와이"], ["b", "작은 비"], ["d", "작은 디"], ["p", "작은 피"], ["q", "작은 큐"], ["g", "작은 지"]];
  var FIRST = [["sun", "smt"], ["ball", "dbp"], ["milk", "nwm"], ["dog", "bdg"], ["fish", "vhf"], ["pig", "pbq"], ["ten", "dtn"], ["hat", "nha"]];
  var REVIEW = [["W", "더블유"], ["N", "엔"], ["S", "에스"], ["H", "에이치"], ["s", "에스"], ["q", "큐"], ["k", "케이"], ["y", "와이"], ["w", "더블유"], ["f", "에프"]];
  var CVC = ["cat", "pig", "sun", "bed", "hot", "map", "ten", "sit", "dog", "cup"];
  var SIGHT = ["my", "a", "the", "is", "see"];
  var STEPS = [
    { id: "up", t: "큰 글자 이름", type: "judge", items: UP, say: "글자를 보고 “이 글자 이름이 뭐야?” 하고 물어 주세요." },
    { id: "lown", t: "작은 글자 이름", type: "judge", items: LOW, say: "같은 방법으로 이름을 물어 주세요." },
    { id: "lows", t: "작은 글자 소리", type: "judge", items: LOW, say: "“이 글자는 무슨 소리가 나?” 하고 물어 주세요. 예: b는 ‘브’. 이름을 다시 말하면 ✕입니다." },
    { id: "match", t: "짝 찾기", type: "match", say: "하은이가 직접 누릅니다. 큰 글자를 누르고, 같은 작은 글자를 누르면 짝이 됩니다." },
    { id: "write", t: "듣고 쓰기", type: "write", items: DICT, say: "점선 버튼을 누르고 있으면 불러 줄 글자가 보입니다. 하은이가 안 볼 때 확인하고 불러 주세요." },
    { id: "first", t: "첫소리 고르기", type: "first", items: FIRST, say: "단어를 두 번 들려주고, 처음에 나는 소리 글자를 하은이가 누릅니다. 소리가 안 나오면 점선 버튼으로 단어를 확인해 읽어 주세요." },
    { id: "cvc", t: "짧은 단어 읽기", type: "judge", items: CVC, word: true, say: "“읽을 수 있는 것만 읽어 봐.” 대부분 못 읽는 것이 정상입니다. 아직 안 배운 내용입니다." },
    { id: "sight", t: "자주 쓰는 단어", type: "judge", items: SIGHT, word: true, say: "같은 방법으로 진행합니다. 마지막 활동입니다." }
  ];
  /* 수 놀이(빼기). 숫자와 문구는 여기만 고치면 된다.
     문구 안의 {n} {a} {b} 는 수로 바뀐다. {n은} 은 "7은/2는", {a와} 는 "3과/4와" 처럼 조사까지 붙는다. */
  var NUM = {
    levels: [5, 7, 9],        /* 단계별 가장 큰 수 (1단계 5 이하, 2단계 7 이하, 3단계 9 이하) */
    dotsHelpFrom: 3,          /* 이 단계부터는 점을 가리고 "도와줘"를 눌러야 보인다 */
    round: 8,                 /* 숨기기 놀이 한 판 문제 수 */
    roundDice: 10,            /* 주사위 빼기 한 판에 푸는 문제 수 (말판 끝에 먼저 닿으면 거기서 끝) */
    retryMax: 2,              /* 한 판에서 틀린 문제를 다시 내는 횟수 (한 판이 8~10문제에서 끝나게) */
    board: 20,                /* 주사위 빼기 말판 칸 수 */
    rocket: [5, 10],          /* 거꾸로 세기 시작 수 */
    suggest: { window: 10, need: 8 },  /* 최근 10문제 중 첫 시도 8개 이상 맞으면 다음 단계를 권한다 */
    keep: 200,                /* 기록은 최근 200문제까지 */
    countMs: 700,             /* 세어 보여줄 때 점 하나에 걸리는 시간(밀리초) */
    /* 점 대신 나오는 물건. 판마다 하나가 골라진다. [그림, 이름] */
    things: [["🍓", "딸기"], ["⭐", "별"], ["🌰", "도토리"], ["🍪", "과자"], ["🎈", "풍선"], ["🍎", "사과"]],
    /* 한 판 끝낼 때마다 하나씩 받는 스티커. "pal:이름" 은 친구들 그림(img 폴더). 아직 없는 종류부터 준다. */
    stickers: ["pal:dog", "pal:bear", "pal:cat", "pal:hamster", "⛺", "🔥", "🌲", "🍄", "⭐", "🌙", "🍓", "🍪", "🎈", "🦋", "🌈", "🍎", "🐞", "🌻", "🎒", "🧭", "🍡", "🍩", "🧁", "🪁"],
    keepStickers: 300,        /* 스티커는 최근 300개까지 */
    t: {
      title: "수 놀이", menuHint: "하고 싶은 놀이를 하은이가 골라요.", pick: "놀이 고르기",
      games: {
        hide: ["숨기기 놀이", "곰이 몰래 숨겨요. 몇 개 숨겼을까?"],
        rocket: ["거꾸로 세기", "큰 수부터 눌러서 로켓을 쏴요."],
        dice: ["주사위 빼기", "주사위를 굴리고 빼기를 해요."],
        ten: ["10 만들기 짝꿍", "더해서 10이 되는 짝을 찾아요."]
      },
      hideShow: "{t가} {n}개 있어요.", hideGo: "곰아, 숨겨 줘!", hideAsk: "곰이 몇 개 숨겼게?", hideSee: "보이는 {t}", hideAll: "모두 {n}개",
      board: "스티커 판", stkGot: "스티커를 받았어요!", stkCount: "{n}개 모았어요", stkHave: "스티커를 {n}개 모았어요!", stkNone: "아직 스티커가 없어요.", stkHow: "놀이를 한 판 끝내면 스티커를 하나 받아요.", stkKinds: "종류 {a} / {b}",
      split: "{n은} {a와} {b}",
      countTogether: "같이 세어 볼까?", help: "도와줘", next: "다음",
      rocketPick: "어디서부터 셀까?", rocketFrom: "{n}부터", rocketHint: "큰 수부터 차례로 눌러요.", rocketGo: "발사!",
      diceRoll: "주사위를 눌러 굴려요.", diceZero: "0칸! 다시 굴리자.", diceMove: "{n}칸 앞으로!", diceGoal: "캠핑장에 도착!", diceStop: "여기까지 왔어요!",
      tenHint: "더해서 10이 되는 두 장을 눌러요.", tenPair: "{a와} {b은} 10",
      timeTook: "{n}초 걸렸어요!", timeBest: "가장 빠른 기록 {n}초", timeNew: "새 기록!",
      done: "참 잘했어요!", again: "한 판 더", stop: "오늘은 여기까지", lvup: "더 큰 수로 해 볼까?",
      parent: "부모님 보기", level: "부모님: 단계 바꾸기", levelName: "{n}단계", levelMax: "{n}까지",
      report: "하은 수 놀이 기록", none: "아직 없음", copyHint: "아래 내용을 복사해 Claude에게 보내면 다음 놀이를 맞춰 드립니다."
    }
  };
  return { EBS: EBS, CHANT: CHANT, PIC: PIC, DAYS: DAYS, UP: UP, LOW: LOW, ML: ML, MR: MR, DICT: DICT, FIRST: FIRST, REVIEW: REVIEW, CVC: CVC, SIGHT: SIGHT, STEPS: STEPS, NUM: NUM };
})();
