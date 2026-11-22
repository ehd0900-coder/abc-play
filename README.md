# abc-play

하은이의 영어 놀이. 갤럭시 탭 브라우저에서 바로 여는 정적 페이지다. 빌드 도구는 없다.

## 폴더 구조

```
index.html        뼈대
style.css         스타일
app.js            화면·동작
data/content.js   내용 (요일별 할 일, 진단 문항, 복습 글자, 그림 단어, 강의 주소)
img/              친구들 그림 (꾸밈용, 배경 투명 PNG)
```

## 내용 고치는 법

`data/content.js` 만 고친다.

- 요일별 할 일: `DAYS` (`k` 는 날짜 "MM-DD", `L` 은 그 주 글자)
- 진단 문항: `UP`, `LOW`, `ML`, `MR`, `DICT`, `FIRST`, `CVC`, `SIGHT`, 안내 문구는 `STEPS` 의 `say`
- 복습 글자: `REVIEW`
- 그림 단어: `PIC`
- 강의 주소: `EBS`, `CHANT`

## 수 놀이 고치는 법

빼기 놀이(숨기기 놀이, 거꾸로 세기, 주사위 빼기, 10 만들기 짝꿍)의 숫자와 문구는 `data/content.js` 의 `NUM` 에 모여 있다.
단계별 가장 큰 수(`levels`), 한 판 문제 수(`round`, `roundDice`), 말판 칸 수(`board`), 다음 단계를 권하는 기준(`suggest`), 화면 문구(`t`)를 여기서 고친다.
점 대신 나오는 물건(`things`)과 한 판 끝낼 때 받는 스티커 종류(`stickers`)도 여기서 바꾼다.
기록은 같은 저장 키 안의 `num` 항목에만 쓰고, 최근 200문제까지 남긴다. 주소는 `#num`.

진도 저장은 브라우저 localStorage 의 `haeun-eng` 키를 쓴다. 키와 형식은 바꾸지 않는다.

## 배포하는 법

GitHub Pages 가 main 브랜치 루트를 그대로 내보낸다. 고친 뒤 올리면 1~2분 안에 반영된다.

```bash
git add -A
git commit -m "내용 수정"
git push
```

올릴 때마다 버전을 한 군데씩 같이 올린다: `app.js` 의 `VER`, `version.txt`, `index.html` 의 `?v=` 세 곳. 이 값이 다르면 태블릿이 예전 파일 대신 새 파일을 불러온다.

페이지 주소가 바뀌면 `app.js` 맨 위의 `URL0` 도 같이 바꾼다 ("주소 복사" 버튼이 이 값을 복사한다).
