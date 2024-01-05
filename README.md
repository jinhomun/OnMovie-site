# vue.js를 사용해서 Movie site 만들기 

![On movie](https://github.com/jinhomun/OnMovie-site/assets/144635699/31eccf8d-b5d8-49fc-aa99-848322185a09)

On Movie는 Vue.js의 기능을 활용하여 영화 정보를 편리하게 찾을 수 있는 사이트입니다.

- 최신 영화, 인기 영화, 개봉예정 영화, 최고 평점 영화 보기 
  - 각 영화 목록 항목에는 영화 제목, 개봉일, 평점 등의 정보가 표시됩니다.
- 영화 정보 보기
  - 영화 목록을 클릭하면 해당 영화의 상세 정보를 볼 수 있습니다. 상세 정보에는 영화의 장르, 러닝타임, 출연진, 예고편 영상 등의 정보가 포함됩니다. 
- 영화 검색 기능
  - 영화 검색창에 영화 제목을 검색하면 관련된 결과가 출력됩니다.

### 셋팅 & 설치하기 
```js
√ Project name: ... .
√ Package name: ... movie
√ Add TypeScript? ... No
√ Add JSX Support? ... Yes
√ Add Vue Router for Single Page Application development? ... Yes
√ Add Pinia for state management? ... No
√ Add Vitest for Unit Testing? ... No
√ Add an End-to-End Testing Solution? » No
√ Add ESLint for code quality? ... Yes
√ Add Prettier for code formatting? ... Yes

Scaffolding project in C:\Users\line\Documents\GitHub\OnMoviesite

Done. Now run:

  npm install
  npm run format
  npm run dev
``` 
```js 
npm install sass
npm install axios 
```
### 1. 프로젝트 셋팅
  - Node.js, Vue.js, Vite, Sass 설치
  - 프로젝트 생성 및 초기 설정
### 2. scss폴더 셋팅
  - CSS 프레임워크인 Sass를 사용하기 위한 설정
### 3. components 분리
  - header, main, footer 컴포넌트로 분리하여 코드 구조 개선
### 4. postman 사용법 익히기
  - API 테스트 및 디버깅에 유용한 postman 사용법 익히기
### 5. postman으로 데이터 확인
  - API를 통해 영화 정보를 요청하여 데이터가 정상적으로 반환되는지 확인
### 6. env환경변수 설정
  - API 키를 환경 변수로 설정하여 보안 강화

### on Mounted
- onMounted는 Vue.js에서 사용되는 라이프사이클 훅 중 하나입니다.    
Vue.js는 컴포넌트 기반의 웹 애플리케이션을 만들기 위한 프레임워크로서, 컴포넌트의 라이프사이클을 이용하여 다양한 작업을 수행할 수 있습니다.   
onMounted 훅은 Vue 3에서 도입된 훅으로, 컴포넌트가 마운트된 후에 실행되는 함수를 정의할 수 있습니다.    

 ### v-for (반복문)
- v-for 디렉티브는 배열이나 객체의 각 항목을 반복하여 템플릿에 렌더링할 때 사용됩니다.  
### v-if (조건문)
- v-if 디렉티브는 주어진 조건이 참일 때에만 해당 엘리먼트를 렌더링할 때 사용됩니다.  
```js
 <div class="credit cast">
    <div v-for="(cast, index) in movieCredits.cast.slice(0, 5)" :key="index">
      <img v-if="cast.profile_path" :src="'https://image.tmdb.org/t/p/w500' + cast.profile_path" :alt="cast.name">
      <img v-else src="../../assets/img/profile.jpg" alt="">
      <p class="character">{{ cast.character }}</p>
      <p class="name">{{ cast.name }}</p>
    </div>
  </div>
```



### API 가져오기
사이트[TMDB:영화api](https://www.themoviedb.org/?language=ko-KR)에 들어가서 키값을 받아온다.   
TMDB 에서 받아온 키 값을 아래처럼 받아와 작성해준다.

```js
const movies = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
      params: {
        api_key: ''// 실제 API 키로 대체
      },
    });

    console.log(response); // response.data를 출력하여 실제 데이터를 확인합니다.
    movies.value = response.data.results;
    console.log(movies)
  } catch (err) {
    console.error('Error fetching popular movies:', err);
  }
});
```

### 검색한 데이터값 API에 전달하기.
```JS
const searchKeyword = ref(''); // 변수 추가 해주기.


const searchMovies = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: '',// 실제 API 키로 대체
        language: 'KO-KR',
        page: '1',
        query: searchKeyword.value, // API에 전달하기.
      },
    });
    movies.value = response.data.results;
  } catch (err) {
    console.error(err);
  }
}

// input에 v-model 추가
<input type="search" v-model="searchKeyword" placeholder="검색어를 입력해주세요" @keyup.enter="searchMovies">
<button type="submit" @click="searchMovies">검색</button>
```



### Detail view 작업
-`components`를 이용해서 Detail view를 작업합니다.
```js
<template>
  <div>
    <HeaderSection />
    <main>
    <DetailIntro v-if="movieBasic" :movieBasic="movieBasic" />
    <DetailInfo v-if="movieInfo" :movieInfo="movieInfo" />
    <DetailKeyWord v-if="movieKeyWord" :movieKeyWord="movieKeyWord" />
    <DetailVideo v-if="movieVideo" :movieVideo="movieVideo" />
    <DetailCredits v-if="movieCredits" :movieCredits="movieCredits" />
    <!-- <DetailReview v-if="movieReview" :movieReview="movieReview" /> -->
    </main>
    <FooterSection />
  </div>
</template>
```
-`useRoute` 함수를 사용하여 현재 라우트의 정보를 가져오고, 해당 라우트에서 추출한 영화 ID를 사용하여 API 요청을 수행합니다.
```js
onMounted(async () => {
    const route = useRoute();
    const movieId = route.params.movieId;
    const apiKey = import.meta.env.VITE_API_KEY;
    const language = "ko-KR";

    try {
        const resMovieBasic = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=${language}&api_key=${apiKey}`);
        movieBasic.value = resMovieBasic.data;

        const resMovieVideo = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
        movieVideo.value = resMovieVideo.data.results;
        console.log(movieVideo);

        const resMovieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=${language}&api_key=${apiKey}`);
        movieInfo.value = resMovieInfo.data;

        const resMovieKeyWord = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/keywords?language=${language}&api_key=${apiKey}`)
        movieKeyWord.value = resMovieKeyWord.data;


        const resmovieCredits = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
        movieCredits.value = resmovieCredits.data;

    } catch (err) {
        console.log(err)
    }
});
```

## 트러블 슈팅
#### axios로 데이터 요청 시 401 Unauthorized 오류 발생
- API 키가 올바르지 않은 경우 발생할 수 있습니다. API 키를 확인하여 올바르게 설정했는지 확인해봅니다.
