/* 한 달 계획 (2026년 12월). 매달 이 파일을 새로 만들어 index.html 의 주소만 바꾼다.
   - weeks: 주마다 이름·목표·기본 문제 묶음(set). days 에 날짜를 적는다.
     날짜만 적으면 그 주의 기본 묶음을 쓰고, { d, name, set, todo, L, test } 로 그날만 바꿀 수 있다.
   - set: [{ type, n, ... }] 문제 종류와 개수. 문제는 열 때마다 범위 안에서 새로 뽑는다.
       영어  case  큰 글자·작은 글자 짝        (letters)
             first 그림 보고 첫소리 글자       (letters)  ※ 글자마다 그림이 하나라, n 은 글자 수를 넘지 못한다
             next  빈칸에 들어갈 글자(순서)    (letters)
             pick  그림 보고 단어 고르기       (words)
             read  단어 읽고 그림 고르기       (words)
       수학  split 가르기 "7은 3과 ?"          (lo, hi = 전체 수의 범위)
             sub   빼기 "8 − 3 = ?"            (lo, hi = 큰 수의 범위)
             add   더하기 "4 + 3 = ?"          (lo, hi = 합의 범위)
             ten   10 만들기 "6 + ? = 10"      ※ 9가지뿐이라 n 은 9 이하
       공통  review 그 주에 틀린 문제를 다시. 모자라면 그 주 기본 묶음으로 채운다. month: true 면 그 달 전체에서.
     hide: true 를 붙이면 그림을 가리고 "도와줘"를 눌러야 보인다.
   - todo: 문제 말고 그날 할 일. link 는 "EBS"·"CHANT" 또는 주소, act 는 "check"(글자 탐험)·"play"·"num".
   - L: 그날 영어 놀이터(카드놀이)에 나오는 글자.
   근거: 11/13 글자 탐험(소리 13/26, 모르는 소리 e f h i k l m n o q r w y, 짧은 단어 2/10),
         11/21(한 자리 빼기가 바로 안 됨), 11/25 부모님 답(EBS 는 K, L 까지 봄 · 하루 20문제 · 두 과목 모두 더 어렵게). */
window.PLAN = (function () {
  "use strict";
  function ebs(no, letters, nth) { return { t: "EBS " + no + "강 「" + letters + "」", m: "15분 · 강의목록 " + nth + " 번째", link: "EBS" }; }
  var EBS1 = { t: "EBS 강의 한 편", m: "15분 · 지난번 다음 강의를 이어서 봐요", link: "EBS" };
  var A = ["cat", "hat", "bat", "map", "bag", "van", "can", "rat", "pan", "cap"];
  var E = ["bed", "pen", "hen", "ten", "red", "web", "leg", "net"];
  var I = ["pig", "pin", "six", "lip", "kid"];
  var O = ["dog", "fox", "box", "hot", "pot", "mop"];
  var U = ["sun", "bus", "cup", "bug", "nut", "tub"];
  var ALL = A.concat(E, I, O, U), NEW = "efhiklmnoqrwy";
  return {
    id: "2026-12", title: "12월",
    eng: {
      goal: "알파벳 강의를 끝내고, 모르던 소리 13개를 익힌 다음, 짧은 단어(cat, bed, pig, dog, sun)를 읽어요.",
      weeks: [
        { name: "맛보기", goal: "문제 푸는 방법을 익혀요. 강의에서 이미 본 글자(E~L)부터.", L: "efhikl",
          set: [{ type: "first", letters: "efhikl", n: 6 }, { type: "first", letters: "abcdgj", n: 4 }, { type: "case", letters: "efhikl", n: 6 }, { type: "case", letters: "abdg", n: 4 }],
          days: [
            { d: "2026-11-26", todo: [ebs(7, "M, N", "일곱")] },
            { d: "2026-11-27", L: "hiklmn", todo: [ebs(8, "O, P", "여덟"), { t: "챈트로 몸풀기", m: "5분", link: "CHANT" }],
              set: [{ type: "first", letters: "efhiklmn", n: 8 }, { type: "case", letters: "efhiklmn", n: 8 }, { type: "next", letters: "bcdefghijklm", n: 4 }] }] },
        { name: "1주", goal: "남은 글자 강의(Q~Z)를 끝내고, 모르던 소리 13개와 큰·작은 글자 짝을 익혀요.", L: NEW,
          set: [{ type: "first", letters: NEW, n: 10 }, { type: "case", letters: "bdpqgynhmu", n: 6 }, { type: "next", letters: "bcdefghijklmnopqrstuvwxy", n: 4 }],
          days: [
            { d: "2026-11-30", L: "klmnop", todo: [ebs(9, "Q, R", "아홉")], set: [{ type: "first", letters: "mnop", n: 4 }, { type: "first", letters: "efhikl", n: 6 }, { type: "case", letters: "mnopbdq", n: 6 }, { type: "next", letters: "bcdefghijklm", n: 4 }] },
            { d: "2026-12-01", L: "mnopqr", todo: [ebs(10, "S, T", "열")], set: [{ type: "first", letters: "oqr", n: 3 }, { type: "first", letters: "efhiklmn", n: 7 }, { type: "case", letters: "bdpqr", n: 6 }, { type: "next", letters: "ijklmnopq", n: 4 }] },
            { d: "2026-12-02", L: "noqrstu", todo: [ebs(11, "U, V", "열한")], set: [{ type: "first", letters: "efhiklmnoqr", n: 10 }, { type: "case", letters: "gqynhmu", n: 6 }, { type: "next", letters: "nopqrstu", n: 4 }] },
            { d: "2026-12-03", L: "oqrstuvw", todo: [ebs(12, "W, X", "열두")], set: [{ type: "first", letters: "w", n: 1 }, { type: "first", letters: "efhiklmnoqr", n: 9 }, { type: "case", letters: "uvwxy", n: 6 }, { type: "next", letters: "rstuvwxy", n: 4 }] },
            { d: "2026-12-04", name: "주간 복습", todo: [ebs(13, "Y, Z", "열세")], set: [{ type: "review", n: 20 }] }] },
        { name: "2주", goal: "짧은 a 단어(cat, hat, map)를 그림과 맞춰 읽어요.", L: "abchmptn",
          set: [{ type: "read", words: A, n: 8 }, { type: "pick", words: A, n: 6 }, { type: "first", letters: NEW, n: 6 }],
          days: [
            { d: "2026-12-07", todo: [EBS1], set: [{ type: "pick", words: A.slice(0, 5), n: 5 }, { type: "first", letters: NEW, n: 10 }, { type: "case", letters: "bdpq", n: 5 }] },
            { d: "2026-12-08", set: [{ type: "pick", words: A, n: 10 }, { type: "first", letters: NEW, n: 6 }, { type: "next", letters: "bcdefghijklmnopqrstuvwxy", n: 4 }] },
            { d: "2026-12-09", todo: [EBS1], set: [{ type: "read", words: A.slice(0, 6), n: 6 }, { type: "pick", words: A, n: 8 }, { type: "first", letters: NEW, n: 6 }] },
            { d: "2026-12-10", set: [{ type: "read", words: A, n: 10 }, { type: "pick", words: A, n: 6 }, { type: "case", letters: "bdpq", n: 4 }] },
            { d: "2026-12-11", name: "주간 복습", todo: [EBS1], set: [{ type: "review", n: 20 }] }] },
        { name: "3주", goal: "짧은 e, i 단어(bed, pen, pig)를 읽어요.", L: "ebhprstw",
          set: [{ type: "read", words: E.concat(I), n: 10 }, { type: "pick", words: E.concat(I), n: 6 }, { type: "read", words: A, n: 4 }],
          days: [
            { d: "2026-12-14", todo: [EBS1], set: [{ type: "pick", words: E, n: 8 }, { type: "read", words: A, n: 6 }, { type: "first", letters: NEW, n: 6 }] },
            { d: "2026-12-15", set: [{ type: "read", words: E, n: 8 }, { type: "pick", words: E, n: 6 }, { type: "case", letters: "bdpq", n: 6 }] },
            { d: "2026-12-16", todo: [EBS1], set: [{ type: "pick", words: I, n: 5 }, { type: "read", words: E, n: 7 }, { type: "read", words: A, n: 8 }] },
            { d: "2026-12-17", set: [{ type: "read", words: I, n: 5 }, { type: "pick", words: I, n: 5 }, { type: "read", words: E, n: 5 }, { type: "pick", words: A, n: 5 }] },
            { d: "2026-12-18", name: "주간 복습", todo: [EBS1], set: [{ type: "review", n: 20 }] }] },
        { name: "4주", goal: "짧은 o, u 단어(dog, box, sun)를 읽어요.", L: "dfbhpsn",
          set: [{ type: "read", words: O.concat(U), n: 10 }, { type: "pick", words: O.concat(U), n: 6 }, { type: "read", words: E.concat(I), n: 4 }],
          days: [
            { d: "2026-12-21", todo: [EBS1], set: [{ type: "pick", words: O, n: 6 }, { type: "read", words: A, n: 7 }, { type: "read", words: E, n: 7 }] },
            { d: "2026-12-22", set: [{ type: "read", words: O, n: 6 }, { type: "pick", words: U, n: 6 }, { type: "read", words: I, n: 5 }, { type: "first", letters: NEW, n: 3 }] },
            { d: "2026-12-23", todo: [EBS1], set: [{ type: "read", words: U, n: 6 }, { type: "pick", words: O, n: 6 }, { type: "read", words: E.concat(I), n: 6 }, { type: "next", letters: "bcdefghijklmnopqrstuvwxy", n: 2 }] },
            { d: "2026-12-24", name: "주간 복습", set: [{ type: "review", n: 20 }] }] },
        { name: "마무리", goal: "한 달 동안 배운 것을 모아서 확인해요.", L: NEW,
          set: [{ type: "read", words: ALL, n: 12 }, { type: "pick", words: ALL, n: 8 }],
          days: [
            { d: "2026-12-28", todo: [EBS1] },
            { d: "2026-12-29", name: "한 달 복습", set: [{ type: "review", n: 20, month: true }] },
            { d: "2026-12-30", name: "12월 점검", test: true,
              todo: [{ t: "글자 탐험 다시", m: "10분 · “작은 글자 소리”만 하고 나머지는 건너뛰기", act: "check" }],
              set: [{ type: "first", letters: NEW, n: 8 }, { type: "case", letters: "bdpqgy", n: 6 }, { type: "read", words: ALL, n: 10 }, { type: "pick", words: ALL, n: 6 }] }] }
      ]
    },
    math: {
      goal: "10 이하의 수를 가르고, 한 자리 빼기와 더하기를 그림 없이 해요.",
      weeks: [
        { name: "맛보기", goal: "문제 푸는 방법을 익혀요. 7 이하 가르기와 빼기.",
          set: [{ type: "split", lo: 5, hi: 7, n: 8 }, { type: "sub", lo: 4, hi: 7, n: 12 }],
          days: [
            "2026-11-26",
            { d: "2026-11-27", set: [{ type: "split", lo: 6, hi: 7, n: 8 }, { type: "sub", lo: 5, hi: 7, n: 8 }, { type: "add", lo: 5, hi: 7, n: 4 }] }] },
        { name: "1주", goal: "7 이하 빼기를 그림 없이 하고, 8과 9를 갈라요.",
          set: [{ type: "sub", lo: 5, hi: 7, n: 10, hide: true }, { type: "split", lo: 8, hi: 9, n: 10 }],
          days: [
            { d: "2026-11-30", set: [{ type: "sub", lo: 5, hi: 7, n: 10, hide: true }, { type: "split", lo: 8, hi: 8, n: 6 }, { type: "add", lo: 6, hi: 8, n: 4 }] },
            { d: "2026-12-01", set: [{ type: "split", lo: 8, hi: 9, n: 10 }, { type: "sub", lo: 6, hi: 7, n: 10, hide: true }] },
            { d: "2026-12-02", set: [{ type: "split", lo: 9, hi: 9, n: 7 }, { type: "sub", lo: 8, hi: 8, n: 6 }, { type: "sub", lo: 5, hi: 7, n: 7, hide: true }] },
            { d: "2026-12-03", set: [{ type: "sub", lo: 8, hi: 9, n: 12 }, { type: "split", lo: 8, hi: 9, n: 8 }] },
            { d: "2026-12-04", name: "주간 복습", set: [{ type: "review", n: 20 }] }] },
        { name: "2주", goal: "8과 9에서 빼기를 그림 없이 해요.",
          set: [{ type: "sub", lo: 6, hi: 9, n: 14, hide: true }, { type: "add", lo: 7, hi: 9, n: 6 }],
          days: [
            { d: "2026-12-07", set: [{ type: "sub", lo: 8, hi: 9, n: 12 }, { type: "add", lo: 7, hi: 9, n: 8 }] },
            { d: "2026-12-08", set: [{ type: "sub", lo: 8, hi: 9, n: 10, hide: true }, { type: "split", lo: 8, hi: 9, n: 10 }] },
            { d: "2026-12-09", set: [{ type: "sub", lo: 6, hi: 9, n: 14, hide: true }, { type: "add", lo: 7, hi: 9, n: 6 }] },
            { d: "2026-12-10", set: [{ type: "sub", lo: 4, hi: 9, n: 20, hide: true }] },
            { d: "2026-12-11", name: "주간 복습", set: [{ type: "review", n: 20 }] }] },
        { name: "3주", goal: "10 만들기 짝을 익히고, 10을 가르고, 10에서 빼요.",
          set: [{ type: "ten", n: 6 }, { type: "split", lo: 10, hi: 10, n: 7 }, { type: "sub", lo: 10, hi: 10, n: 7 }],
          days: [
            { d: "2026-12-14", set: [{ type: "ten", n: 9 }, { type: "split", lo: 10, hi: 10, n: 7 }, { type: "sub", lo: 8, hi: 9, n: 4, hide: true }] },
            { d: "2026-12-15", set: [{ type: "ten", n: 9 }, { type: "split", lo: 10, hi: 10, n: 9 }, { type: "add", lo: 8, hi: 10, n: 2 }] },
            { d: "2026-12-16", set: [{ type: "split", lo: 10, hi: 10, n: 9 }, { type: "sub", lo: 10, hi: 10, n: 9 }, { type: "ten", n: 2 }] },
            { d: "2026-12-17", set: [{ type: "sub", lo: 10, hi: 10, n: 9 }, { type: "sub", lo: 7, hi: 9, n: 8, hide: true }, { type: "ten", n: 3 }] },
            { d: "2026-12-18", name: "주간 복습", set: [{ type: "review", n: 20 }] }] },
        { name: "4주", goal: "10 이하의 빼기와 더하기를 그림 없이 해요.",
          set: [{ type: "sub", lo: 5, hi: 10, n: 12, hide: true }, { type: "add", lo: 6, hi: 10, n: 8, hide: true }],
          days: [
            { d: "2026-12-21", set: [{ type: "sub", lo: 10, hi: 10, n: 9, hide: true }, { type: "add", lo: 8, hi: 10, n: 8, hide: true }, { type: "ten", n: 3, hide: true }] },
            { d: "2026-12-22", set: [{ type: "sub", lo: 7, hi: 10, n: 14, hide: true }, { type: "add", lo: 6, hi: 10, n: 6, hide: true }] },
            { d: "2026-12-23", set: [{ type: "sub", lo: 5, hi: 10, n: 12, hide: true }, { type: "split", lo: 8, hi: 10, n: 8, hide: true }] },
            { d: "2026-12-24", name: "주간 복습", set: [{ type: "review", n: 20 }] }] },
        { name: "마무리", goal: "한 달 동안 배운 것을 모아서 확인해요.",
          set: [{ type: "sub", lo: 5, hi: 10, n: 12, hide: true }, { type: "add", lo: 6, hi: 10, n: 8, hide: true }],
          days: [
            "2026-12-28",
            { d: "2026-12-29", name: "한 달 복습", set: [{ type: "review", n: 20, month: true }] },
            { d: "2026-12-30", name: "12월 점검", test: true,
              set: [{ type: "split", lo: 7, hi: 10, n: 8 }, { type: "sub", lo: 4, hi: 10, n: 16, hide: true }, { type: "ten", n: 6 }] }] }
      ]
    }
  };
})();
