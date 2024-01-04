# vue.js를 사용해서 Movie site 만들기 

![On movie](https://github.com/jinhomun/OnMovie-site/assets/144635699/89b2883a-8fd5-4fd9-854a-c73419da7cc7)

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

### 포스트맨 사용법
사이트에서 가져온 주소를 작성한다.
api-key를 주소 방식대로 입력해서 아래 정보를 가져오는지 확인한다.

### Detail view 작업
`movieInfoFetch` 영화 정보를 가져오는 비동기 함수를 사용하였다.
   
`credits`에 크레딧 정보를 저장한 후에 등장인물 목록을 가져오는 `getPersonCredits` 함수를 사용하였다.
   
`components`를 이용해서 Detail view를 작업하였다.
   
`useRoute` 함수를 사용하여 현재 라우트의 정보를 가져오고, 해당 라우트에서 추출한 영화 ID를 사용하여 API 요청을 수행합니다.