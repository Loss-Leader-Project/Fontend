# 🏃 LOSS-LEADER PROJECT 🏃

# Frontend

![로스리더 실제 로고](https://ifh.cc/g/Kokzzw.png)
![사람이미지](https://user-images.githubusercontent.com/55127012/138738203-9a06b53f-d502-43ca-a999-5a82e5f811e0.png)

---

## 🏃 Summary 🏃

1. 초기세팅
2. 프로젝트 간략 설명
3. 프로젝트 목적
4. 기술 스택
5. 컴포넌트 흐름
6. 문서화 깃허브 노션 링크

---

## 🏃 Initial setting 🏃

```powershell
> npm install --legacy-peer-deps //네이버 지도
> npm start //화면 띄우기
```

---

## 🏃Short description of the project

실제 기반은 광고비 절약과 소비자의 서비스를 집중해서 만든 사업입니다.
손님들이 어느 음식점을 가도 할인이나 서비스를 받을 수 있게 하고 사장님들은 광고 절약, 음식 낭비 방지등 서로 서로 win win 사업이었습니다.
(쉬운 설명으로 카페에서 마일리지를 적립하고
나중에 마일리지를 다 모으면 커피를 1잔 먹는거랑 비슷하다고 보면됩니다. 그 부분을 통합적으로 관리합니다.

자세한 사항은 노션에 있는 사업계획서를 참고해주세요!

![업주 손님 로스리더 상호관계표](https://ifh.cc/g/oWtsfC.png)

---

## 🏃 Purpose of the project 🏃

이 프로젝트는 실제 O2O 플랫폼 기반으로 런칭한 사이트 기반을 디자인 소스랑 데이터 사진만으로 진행했고 디자인 구성보다는 기술 부분을 구현하는데 초점을 맞췄습니다. 그리고 코로나로 인해 비대면으로 소통을 해야됬고 매주 금요일 10시, 그외에는 저녁 9시 30분에 모각코를 진행하여 코맨트하는 시간도 가졌습니다.

각자 코딩을 하는 환경 자체가 달랐기에 그부분을 맞추고자 다른 사람들이 이해할 수 있고 쓸 수 있는 코드 (공통화)에 집중했습니다.

폴더 구조나 git flow는 사전에 미리 정해놓고 시작했고 의견이 나올시 회의때 팀원들과 얘기후 결정했습니다.

배포 링크 : [로스리더 사이트](http://114.202.45.254:3000/)

---

## 🏃 Technology stack 🏃

### 1. Language

- HTML
- CSS
- JS

### 2. FrameWork and Library

- React
- Redux
- MUI
- Axios
- React-Router
- StyleComponent
- Slick-Carousel
- Fontawesome

### 3. VersionControl and Scheduling

- Jira
- Git
- Github
- OpenSourc

### 4. Comunication

- Notion
- Discord
- Slack
- Postman
- VisualStudio

---

## 🏃 Component flow 🏃

![페이지 흐름](https://ifh.cc/g/sMtSZG.png)

1. validation.js

   회원가입에 필요한 정규식은 static 필드를 이용해서 제공합니다. 기본 정규식 외 다른 패턴이 필요하면 isPatternCheck라는 static함수를 제공합니다.

   ```
     static isPatternCheck = (key, message, value, rexge) => {
       if (!(rexge instanceof RegExp)) throw new Error('rexge is not found');
       if (rexge.test(value)) {
         this.makeError(key, message);
         return true;
       }
       return false;
     };
   ```

   함수의 인수로 value에 검사할 값과 검사할 패턴을 넣어주면 됩니다.
   프로퍼티의 key와 프로퍼티 값으로 들어갈 메시지를 전달만 하면 맞지 않는 정규식에 대해서 에러를 핸들링해줍니다.

2. apiConfig.js, apiInterceptors.js, apiUrl.js,apiBaseUrl.js

   프로젝트중 서로 다른 방법으로 axios를 써서
   url이나 interceptor, api 함수 등 공통으로 만들어서 사용했다

3. changeImageUrl.js

   MiniIO에 사진을 저장했고 저장된 value 값을
   백엔드 데이터 베이스에 저장했다. 그래서
   그 암호화된 value 값을 사용하려면 Url을 앞에다가
   적어줘야됬는데 그부분만 핸들링 하도록 따로 뺐다.

4. TokenCheck.js

   인자로 API 요청함수와 react-router의 useHistory()를 받아서 내부 로직에 의해 먼저 토큰의 만료여부를 확인하여 여부에 따라 로그아웃을 시키고 로그인페이지로 이동하거나 다음 로직을 실행시킨다.
   API 요청함수가 인자로 주어진 경우 api를 요청하고 결과값을 반환
   API 요청함수가 인자로 주어지지 않은 경우 토큰값만 서버로 전송해 로그인된 유저정보를 받아서 반환

5. Detail.jsx

   상품 상세 페이지이고 5개 이미지를 핸들링 하면서 볼 수 있다. 메뉴판 메뉴 주소 등 다양한 정보를 확인 가능하고 업체의 리뷰를 페이지 네이션으로 확인 가능하다

6. Apply.jsx

   신청하기 페이지이고 상품 상세 페이지에서
   쿠폰이 있을때 로그인 했을때만 페이지 이동이 가능하다. 기본적인 validation을 체크 할 수 있고 마일리지를 수동 및 자동으로 입력되게 체크박스로 제어했고 두가지 모두 총 상품 액을 적을시 활성화 되도록 구현했다.

7. Completion.jsx

   신청하기 페이지에서 데이터 입력 및 validation을 전부 통과, 로그인시에만 이동할 수 있고 신청하기 페이지 Get요청시 받은 주문 번호로
   해당 페이지의 Get요청을 보낼 수 있다.
   간략한 정보 확인 및 메인, 마이 페이지 이동에 중점을 뒀다.

---

## 🏃 Link 🏃

- [Notion](https://typical-wallet-2b3.notion.site/ee2586a2bcd54da792d029b25a40e371)

- [Documentation (frontend)](https://typical-wallet-2b3.notion.site/LossLeader_Frontend-11d0599ba78048098753756fb0e34c73)

- [Documentation (backend)]()

- [깃허브 (frontend)](https://github.com/Loss-Leader-Project/Fontend)

- [깃허브 (backend)](https://github.com/Loss-Leader-Project/Backend)

- [로스리더 사이트](http://114.202.45.254:3000/)
