/* 한 달 계획 (2026년 12월). 매달 이 파일을 새로 만들어 index.html 의 주소만 바꾼다.
   - weeks: 주마다 이름·목표·기본 문제 묶음(set). days 에 날짜를 적는다.
     날짜만 적으면 그 주의 기본 묶음을 쓰고, { d, name, set, todo, L, test } 로 그날만 바꿀 수 있다.
   - set: [{ type, n, ... }] 문제 종류와 개수. 문제는 열 때마다 범위 안에서 새로 뽑는다.
       영어  case  큰 글자·작은 글자 짝        (letters)
             first 그림 보고 첫소리 글자       (letters)
             next  빈칸에 들어갈 글자(순서)    (letters)
             pick  그림 보고 단어 고르기       (words)
             read  단어 읽고 그림 고르기       (words)
       수학  split 가르기 "7은 3과 ?"          (lo, hi = 전체 수의 범위)
             sub   빼기 "8 − 3 = ?"            (lo, hi = 큰 수의 범위)
             add   더하기 "4 + 3 = ?"          (lo, hi = 합의 범위)
             ten   10 만들기 "6 + ? = 10"
       공통  review 그 주에 틀린 문제를 다시. 모자라면 그 주 기본 묶음으로 채운다.
     hide: true 를 붙이면 점 그림을 가리고 "도와줘"를 눌러야 보인다.
   - todo: 문제 말고 그날 할 일. link 는 "EBS"·"CHANT" 또는 주소, act 는 "check"(글자 탐험)·"play"·"num".
   - L: 그날 영어 카드놀이(놀이터)에 나오는 글자.
   근거: 11/13 글자 탐험(소리 13/26, 모르는 소리 e f h i k l m n o q r w y, 짧은 단어 2/10),
         11/21 지시(한 자리 빼기가 바로 안 됨, 가르기 감각부터). */
window.PLAN = (function () {
  "use strict";
  var EBS1 = { t: "EBS 강의 한 편", m: "15분 · 지난번 다음 강의를 이어서 봐요", link: "EBS" };
  var A = ["cat", "hat", "bat", "map", "bag", "van", "can", "rat", "pan", "cap"];
  var E = ["bed", "pen", "hen", "ten", "red", "web", "leg", "net"];
  var I = ["pig", "pin", "six", "lip", "kid"];
  return {
    id: "2026-12", title: "12월",
    eng: {
      goal: "모르던 소리 13개를 익히고, 짧은 단어(cat, bed, pig)를 읽기 시작해요.",
      weeks: [
        { name: "맛보기", goal: "문제 푸는 방법을 익혀요. 아는 글자로 가볍게.", L: "oqrwyz",
          set: [{ type: "first", letters: "abcdgjpst", n: 5 }, { type: "case", letters: "abdegt", n: 5 }],
          days: [
            { d: "2026-11-26", todo: [{ t: "EBS 13강 「Y, Z」", m: "15분 · 강의목록 열세 번째", link: "EBS" }] },
            { d: "2026-11-27", todo: [{ t: "챈트로 몸풀기", m: "5분", link: "CHANT" }] }] },
        { name: "1주", goal: "모르던 소리 13개(e f h i k l m n o q r w y)의 첫소리를 찾아요.", L: "efhiklmn",
          set: [{ type: "first", letters: "efhiklmnoqrwy", n: 7 }, { type: "case", letters: "efhiklmnqry", n: 3 }],
          days: [
            { d: "2026-11-30", L: "efhi", todo: [EBS1], set: [{ type: "first", letters: "efhi", n: 4 }, { type: "first", letters: "abcd", n: 2 }, { type: "case", letters: "efhi", n: 4 }] },
            { d: "2026-12-01", L: "klmn", set: [{ type: "first", letters: "klmn", n: 4 }, { type: "first", letters: "efhi", n: 2 }, { type: "case", letters: "klmn", n: 4 }] },
            { d: "2026-12-02", L: "oqrw", todo: [EBS1], set: [{ type: "first", letters: "oqr", n: 3 }, { type: "first", letters: "klmn", n: 3 }, { type: "case", letters: "oqr", n: 4 }] },
            { d: "2026-12-03", L: "oqrwy", set: [{ type: "first", letters: "wy", n: 2 }, { type: "first", letters: "efhiklmnoqr", n: 4 }, { type: "case", letters: "wy", n: 4 }] },
            { d: "2026-12-04", name: "주간 복습", L: "efhiklmnoqrwy", todo: [EBS1], set: [{ type: "review", n: 10 }] }] },
        { name: "2주", goal: "큰 글자와 작은 글자의 짝, 헷갈리는 b·d·p·q, 글자 순서를 익혀요.", L: "bdpqgy",
          set: [{ type: "case", letters: "bdpqgynhmu", n: 5 }, { type: "next", letters: "bcdefghijklm", n: 2 }, { type: "first", letters: "efhiklmnoqrwy", n: 3 }],
          days: [
            { d: "2026-12-07", todo: [EBS1], set: [{ type: "case", letters: "bdpq", n: 6 }, { type: "first", letters: "bdpq", n: 4 }] },
            { d: "2026-12-08", set: [{ type: "case", letters: "gqynhmu", n: 6 }, { type: "next", letters: "bcdefgh", n: 4 }] },
            { d: "2026-12-09", todo: [EBS1], set: [{ type: "case", letters: "bdpqijlt", n: 5 }, { type: "next", letters: "ijklmnopq", n: 5 }] },
            { d: "2026-12-10", set: [{ type: "case", letters: "fkrsvwxz", n: 4 }, { type: "next", letters: "rstuvwxy", n: 3 }, { type: "first", letters: "efhiklmnoqrwy", n: 3 }] },
            { d: "2026-12-11", name: "주간 복습", todo: [EBS1], set: [{ type: "review", n: 10 }] }] },
        { name: "3주", goal: "짧은 a 단어(cat, hat, map)를 그림과 맞춰 읽어요.", L: "abchmptn",
          set: [{ type: "pick", words: A, n: 5 }, { type: "read", words: A, n: 5 }],
          days: [
            { d: "2026-12-14", todo: [EBS1], set: [{ type: "pick", words: A.slice(0, 5), n: 5 }, { type: "first", letters: "abchm", n: 5 }] },
            { d: "2026-12-15", set: [{ type: "pick", words: A, n: 7 }, { type: "first", letters: "bcrpv", n: 3 }] },
            { d: "2026-12-16", todo: [EBS1], set: [{ type: "read", words: A.slice(0, 6), n: 6 }, { type: "pick", words: A, n: 4 }] },
            { d: "2026-12-17", set: [{ type: "read", words: A, n: 8 }, { type: "case", letters: "bdpq", n: 2 }] },
            { d: "2026-12-18", name: "주간 복습", todo: [EBS1], set: [{ type: "review", n: 10 }] }] },
        { name: "4주", goal: "짧은 e, i 단어(bed, pen, pig)를 읽어요.", L: "ebhprstw",
          set: [{ type: "pick", words: E.concat(I), n: 5 }, { type: "read", words: E.concat(I), n: 5 }],
          days: [
            { d: "2026-12-21", todo: [EBS1], set: [{ type: "pick", words: E, n: 6 }, { type: "read", words: A, n: 4 }] },
            { d: "2026-12-22", set: [{ type: "read", words: E, n: 6 }, { type: "pick", words: E, n: 4 }] },
            { d: "2026-12-23", todo: [EBS1], set: [{ type: "pick", words: I, n: 5 }, { type: "read", words: E, n: 5 }] },
            { d: "2026-12-24", name: "주간 복습", set: [{ type: "review", n: 10 }] }] },
        { name: "마무리", goal: "한 달 동안 배운 것을 모아서 확인해요.", L: "efhiklmnoqrwy",
          set: [{ type: "read", words: A.concat(E, I), n: 6 }, { type: "first", letters: "efhiklmnoqrwy", n: 4 }],
          days: [
            { d: "2026-12-28", todo: [EBS1] },
            { d: "2026-12-29", name: "한 달 복습", set: [{ type: "review", n: 10, month: true }] },
            { d: "2026-12-30", name: "12월 점검", test: true,
              todo: [{ t: "글자 탐험 다시", m: "10분 · “작은 글자 소리”만 하고 나머지는 건너뛰기", act: "check" }],
              set: [{ type: "first", letters: "efhiklmnoqrwy", n: 6 }, { type: "case", letters: "bdpqgy", n: 4 }, { type: "read", words: A.concat(E, I), n: 6 }, { type: "pick", words: A.concat(E, I), n: 4 }] }] }
      ]
    },
    math: {
      goal: "9 이하의 수를 가르고, 한 자리 빼기를 막힘 없이 해요. 마지막에 10 만들기까지.",
      weeks: [
        { name: "맛보기", goal: "문제 푸는 방법을 익혀요. 5 이하로 가볍게.",
          set: [{ type: "split", lo: 3, hi: 5, n: 5 }, { type: "sub", lo: 3, hi: 5, n: 5 }],
          days: ["2026-11-26", "2026-11-27"] },
        { name: "1주", goal: "5 이하를 단단히 하고, 6과 7을 갈라요.",
          set: [{ type: "split", lo: 5, hi: 7, n: 5 }, { type: "sub", lo: 3, hi: 6, n: 5 }],
          days: [
            { d: "2026-11-30", set: [{ type: "split", lo: 4, hi: 5, n: 4 }, { type: "sub", lo: 3, hi: 5, n: 6 }] },
            { d: "2026-12-01", set: [{ type: "split", lo: 6, hi: 6, n: 5 }, { type: "sub", lo: 3, hi: 5, n: 5 }] },
            { d: "2026-12-02", set: [{ type: "split", lo: 6, hi: 7, n: 5 }, { type: "add", lo: 4, hi: 6, n: 5 }] },
            { d: "2026-12-03", set: [{ type: "split", lo: 7, hi: 7, n: 5 }, { type: "sub", lo: 6, hi: 6, n: 5 }] },
            { d: "2026-12-04", name: "주간 복습", set: [{ type: "review", n: 10 }] }] },
        { name: "2주", goal: "7 이하의 빼기를 해요. 뒤로 갈수록 그림 없이.",
          set: [{ type: "sub", lo: 5, hi: 7, n: 6 }, { type: "split", lo: 6, hi: 7, n: 4 }],
          days: [
            { d: "2026-12-07", set: [{ type: "sub", lo: 6, hi: 7, n: 6 }, { type: "split", lo: 6, hi: 7, n: 4 }] },
            { d: "2026-12-08", set: [{ type: "sub", lo: 5, hi: 7, n: 7 }, { type: "add", lo: 5, hi: 7, n: 3 }] },
            { d: "2026-12-09", set: [{ type: "sub", lo: 6, hi: 7, n: 5, hide: true }, { type: "add", lo: 5, hi: 7, n: 5 }] },
            { d: "2026-12-10", set: [{ type: "sub", lo: 4, hi: 7, n: 10, hide: true }] },
            { d: "2026-12-11", name: "주간 복습", set: [{ type: "review", n: 10 }] }] },
        { name: "3주", goal: "8과 9를 가르고, 8·9에서 빼요.",
          set: [{ type: "split", lo: 8, hi: 9, n: 5 }, { type: "sub", lo: 8, hi: 9, n: 5 }],
          days: [
            { d: "2026-12-14", set: [{ type: "split", lo: 8, hi: 8, n: 6 }, { type: "sub", lo: 5, hi: 7, n: 4, hide: true }] },
            { d: "2026-12-15", set: [{ type: "split", lo: 8, hi: 9, n: 6 }, { type: "sub", lo: 8, hi: 8, n: 4 }] },
            { d: "2026-12-16", set: [{ type: "split", lo: 9, hi: 9, n: 5 }, { type: "sub", lo: 8, hi: 9, n: 5 }] },
            { d: "2026-12-17", set: [{ type: "sub", lo: 8, hi: 9, n: 7 }, { type: "add", lo: 7, hi: 9, n: 3 }] },
            { d: "2026-12-18", name: "주간 복습", set: [{ type: "review", n: 10 }] }] },
        { name: "4주", goal: "10 만들기 짝을 익히고, 9 이하 빼기를 그림 없이 해요.",
          set: [{ type: "ten", n: 5 }, { type: "sub", lo: 6, hi: 9, n: 5, hide: true }],
          days: [
            { d: "2026-12-21", set: [{ type: "ten", n: 6 }, { type: "sub", lo: 8, hi: 9, n: 4 }] },
            { d: "2026-12-22", set: [{ type: "ten", n: 5 }, { type: "add", lo: 8, hi: 10, n: 5 }] },
            { d: "2026-12-23", set: [{ type: "ten", n: 4, hide: true }, { type: "sub", lo: 6, hi: 9, n: 6, hide: true }] },
            { d: "2026-12-24", name: "주간 복습", set: [{ type: "review", n: 10 }] }] },
        { name: "마무리", goal: "한 달 동안 배운 것을 모아서 확인해요.",
          set: [{ type: "sub", lo: 5, hi: 9, n: 6, hide: true }, { type: "ten", n: 4 }],
          days: [
            "2026-12-28",
            { d: "2026-12-29", name: "한 달 복습", set: [{ type: "review", n: 10, month: true }] },
            { d: "2026-12-30", name: "12월 점검", test: true,
              set: [{ type: "split", lo: 5, hi: 9, n: 5 }, { type: "sub", lo: 3, hi: 9, n: 10, hide: true }, { type: "ten", n: 5 }] }] }
      ]
    }
  };
})();
