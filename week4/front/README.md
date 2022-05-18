# 김민채, 그녀의 요리가 시작된다..!

사이트 주소 : http://192.249.18.176/

<img width="100%" src="https://user-images.githubusercontent.com/64083281/150281161-e6b3f787-b1a5-4edf-b49d-9fed4cf73c18.gif" />

---
## 김민채의 요리보고 조리보고

|main|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151125184-7c7eafd0-5262-452b-a0a3-8537d341a1d9.gif" />|

- 처음 링크에 접속하였을 때 화면입니다.
  - 요리를 시작하는 사람들을 위해 자신만의 레시피를 저장할 수 있는 사이트를 구현하였습니다.
  - 로그인과 회원가입을 통해 사이트를 이용할 수 있도록 하였습니다.

|login|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151126733-d796b097-2cf6-424d-a788-3a352a8393e9.gif" />|

- `기존 회원이신가요?` 링크를 누를 경우 로그인 화면으로 넘어갑니다.
  - input 칸에 ID와 PW를 입력받아 db에 존재하는 회원일 경우 로그인이 완료되고 홈 화면으로 넘어갑니다.
  - 실수로 로그인 화면에 들어온 사람들을 위하여 `아이디가 없으신가요?` 링크를 누를 경우 회원가입 화면으로 넘어갈 수 있도록 하였습니다.

|register|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151126489-3deaf822-f7ea-4c99-bac5-7d99a77263d5.gif" />|

- `신규 회원이신가요?` 링크를 누를 경우 회원가입 화면으로 넘어갑니다.
  - 회원가입 화면에서는 ID, PW, Nickname을 받고, PW의 경우 같은 비밀번호를 한 번 더 입력받아 올바르게 입력하였는지 확인합니다.
  - Nickname의 경우 홈 화면에서 Nickname을 통해 사용자를 환영하는 문구를 볼 수 있습니다.

---
## 기능 소개

|home|
|--|
|<img src="https://user-images.githubusercontent.com/63199133/151129931-f130cd39-b518-4baf-9d7f-fcd24437e402.png" />|

- 로그인이 성공한 후의 화면입니다. url로 사용자의 ID를 받기 때문에 아이디 별로 고유의 웹사이트를 띄우게 됩니다.
  - 우측 상단에는 회원가입에서 설정한 Nickname으로 사용자를 반겨줍니다. 또한 옆의 로그아웃 버튼을 통해 다른 사용자로 로그인할 수 있습니다.
  - 수평으로 정렬된 하얀색 배경의 레시피는 즐겨찾기 기능으로 추가해놓은 레시피들입니다.
  - 수직으로 정렬된 푸른색 배경의 레시피는 사용자가 저장한 모든 레시피들입니다.

|search|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151154776-467bf5a1-474e-43f2-877e-680d3ffe9612.gif" />|

- 수직 방향으로 정렬해놓은 레시피의 상단에 있는 돋보기 모양을 누르면 검색이 가능합니다.
  - 사용자가 저장해놓은 레시피들 중 알고 싶은 요리 레시피를 확인할 수 있습니다.

|add|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151155035-91331fd2-55bc-4320-b7f4-e245551b08f6.gif" />|

- 우측 하단에 존재하는 플러팅 버튼을 통해 레시피를 추가할 수 있도록 하였습니다.
  - 레시피 등록의 경우 사진, 제목, 메모, 재료, 과정을 작성할 수 있습니다.
  - 이 모든 정보는 db에 저장되어 다음에 이 레시피를 보고 싶다면 바로 볼 수 있습니다.
  - 재료와 과정의 경우 문구 작성 후 십자 모양의 버튼을 누르면 곧바로 추가되는 모습을 확인할 수 있습니다.
  - 이들을 다시 삭제하고 싶다면 생성된 아이템을 클릭하면 곧바로 삭제가 가능합니다.

---
## 레시피 세부사항 소개
|detail|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151156448-36775408-9bd4-4c90-961b-5ceec45e6ce0.gif" />|

- add 버튼으로 추가한 레시피들을 확인할 수 있는 화면입니다.
  - 홈 화면에서 볼 수 있는 레시피들을 클릭할 경우 detail 화면으로 넘어와 저장해놓은 요리 이름, 메모, 재료, 과정을 볼 수 있습니다.
  - 요리 이름 옆에는 버전을 선택할 수 있는 `dropdown menu`가 있는데, 이를 통해 버전별 재료와 과정의 상황을 확인할 수 있습니다.
  - 우측 상단에 있는 메뉴 버튼을 누르면 여러 버튼이 나옵니다. 레시피가 여러 버전이 있는 경우 5개의 버튼이 나오고 버전이 하나인 경우에는 4개의 버튼이 나옵니다.
  - 하나의 직선만 있는 버튼을 클릭할 경우 현재 버전을 삭제합니다.
  - 여러 직선이 있는 버튼을 클릭할 경우 이 레시피 전체를 삭제합니다.

|chart|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151156331-eb0ee2ea-8315-4396-bec2-b416e578c842.gif" />|

- 꺾은 선 모양의 버튼을 클릭할 경우 버전 별로 사용된 재료의 추이를 볼 수 있는 그래프를 볼 수 있습니다.

|add version|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151155884-a1fa4c9e-ecd1-4b30-b1bd-86cdf34941e6.gif" />|


- 펜 모양의 버튼을 클릭할 경우 이 레시피의 다음 버전을 추가할 수 있습니다.

---
## Credit

+ 강준서(<a href="https://github.com/junseooo">junseooo</a>): pointjunseo@dgist.ac.kr
+ 김민채(<a href="https://github.com/passa021">passa021</a>): passa021@korea.ac.kr
+ 정희종(<a href="https://github.com/huijjj/">huijjj</a>): hui0213@postech.ac.kr
