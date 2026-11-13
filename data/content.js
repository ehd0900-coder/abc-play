/* 내용만 담는 파일. 요일별 할 일·문항·단어·강의 주소를 고칠 때 이 파일만 손댄다. */
window.CONTENT = (function () {
  "use strict";
  var EBS = "https://primary.ebs.co.kr/course/view?courseId=10029514";
  var CHANT = "http://www.ebse.co.kr/apps/online/view.do?course_id=ECLIP000001222";
  var PIC = { a: ["apple", "🍎"], b: ["ball", "⚽"], c: ["cat", "🐱"], d: ["dog", "🐶"], e: ["egg", "🥚"], f: ["fish", "🐟"], g: ["goat", "🐐"], h: ["hat", "🎩"] };
  var DAYS = [
    { k: "11-13", d: "금", n: "11/13", L: "ab", steps: [
      { t: "글자 탐험", m: "15~20분 · 부모님과 같이", act: "check" },
      { t: "쉬기", m: "5분 · 물 마시고 간식" },
      { t: "EBS 1강 「A, B」", m: "15분 · 강의목록 맨 위", link: EBS },
      { t: "카드놀이", m: "5~10분", act: "play" },
      { t: "오늘 제일 재밌었던 것 말하기", m: "1분" }] },
    { k: "11-16", d: "월", n: "11/16", L: "abcd", steps: [
      { t: "EBS 2강 「C, D」", m: "15분 · 강의목록 두 번째", link: EBS },
      { t: "카드 만들기", m: "2분 · 종이에 C c D d 쓰기" }] },
    { k: "11-17", d: "화", n: "11/17", L: "abcd", steps: [
      { t: "카드놀이", m: "10분 · 하고 싶은 놀이 고르기", act: "play" }] },
    { k: "11-18", d: "수", n: "11/18", L: "abcdef", steps: [
      { t: "EBS 3강 「E, F」", m: "15분 · 강의목록 세 번째", link: EBS },
      { t: "카드 만들기", m: "2분 · 종이에 E e F f 쓰기" }] },
    { k: "11-19", d: "목", n: "11/19", L: "abcdef", steps: [
      { t: "카드놀이", m: "10분 · 하고 싶은 놀이 고르기", act: "play" }] },
    { k: "11-20", d: "금", n: "11/20", L: "abcdefgh", steps: [
      { t: "챈트로 몸풀기", m: "5분", link: CHANT },
      { t: "EBS 4강 「G, H」", m: "15분 · 강의목록 네 번째", link: EBS },
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
  return { EBS: EBS, CHANT: CHANT, PIC: PIC, DAYS: DAYS, UP: UP, LOW: LOW, ML: ML, MR: MR, DICT: DICT, FIRST: FIRST, REVIEW: REVIEW, CVC: CVC, SIGHT: SIGHT, STEPS: STEPS };
})();
