<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">

  <a href="https://github.com/woowa-techcamp-2022/web-todo-1">
    <img src="https://user-images.githubusercontent.com/6129764/179390923-19c11ad3-11e5-4633-9428-d8f066a602c6.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Todo List</h3>
  <p align="center">
    우아한테크캠프 5기 2주차 미션 - Todo List
    <br>
    <a href="http://13.125.203.17:3000/">View Demo</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

<img width="1431" alt="image" src="https://user-images.githubusercontent.com/6129764/179390801-5ffe5d7b-856e-4766-a304-3a9b6b65f986.png">

2022 우아한테크캠프 5기 2주차 미션 - Todo List 입니다.

**`full-time` pair-programming**으로 프로젝트를 진행했습니다.

### Built With

* Vanilla JavaScript
* [Webpack](https://webpack.js.org/)

## Getting Started

이 프로젝트를 로컬에서 세팅하는 방법을 소개합니다.

### Prerequisites

* npm
  ```sh
  $ npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   $ git clone git@github.com:woowa-techcamp-2022/web-todo-1.git
   ```
2. Install NPM packages
   ```sh
   $ npm install
   ```
3. `.env` 파일을 만들고 Database 설정을 입력합니다.
   ```sh
   $ touch .env
   ```
   ```
   # .env
   DB_HOST=
   DB_USER=
   DB_NAME=
   DB_PASSWORD=
   DB_PORT=
   ```
4. client build & run project
   ```sh
   $ npm run build
   $ npm run server
   ```
   

## 프로젝트 구조
```
.
├── README.md
├── client
│   ├── app.js
│   ├── components
│   │   ├── Card.js
│   │   ├── CardInput.js
│   │   ├── Column.js
│   │   ├── Component.js
│   │   ├── History.js
│   │   ├── Modal.js
│   │   ├── Template.js
│   │   ├── TodoList.js
│   │   └── mockdata.js
│   ├── service
│   │   ├── TodoAPI.js
│   │   └── TodoService.js
│   ├── util
│   │   ├── Store.js
│   │   └── handler.js
│   ├── util.js
│   ├── reset.css
│   ├── style.css
│   └── index.html
├── server
│   ├── app.js
│   └── model
│       └── database.js
├── dist
├── public
├── package-lock.json
├── package.json
└── webpack.config.js
```

<!-- ROADMAP -->
## Roadmap

- [x] 태스크 추가
- [x] 태스크 삭제
- [x] 태스크 이동
- [x] 히스토리 기록
- [ ] 태스크 수정
- [ ] 태스크 순서 

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [To-do icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/to-do)


