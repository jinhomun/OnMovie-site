<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const movies = ref([]);
const searchQuery = ref('');
const currentTag = ref('latest');


const searchMovies = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: 'fb1030ba317555b28d3ed69041db88ef',
        language: 'ko-KR',
        query: searchQuery.value,
      }
    });
    movies.value = response.data.results;


  } catch (err) {
    console.log(err);
  }
};

const fetchMovies = async (category) => {
  let url = 'https://api.themoviedb.org/3/movie/popular';

  switch (category) {
    case 'latest':
      url = 'https://api.themoviedb.org/3/movie/now_playing';
      break;
    case 'popular':
      url = 'https://api.themoviedb.org/3/movie/popular';
      break;
    case 'upcoming':
      url = 'https://api.themoviedb.org/3/movie/upcoming';
      break;
    case 'toprated':
      url = 'https://api.themoviedb.org/3/movie/top_rated';
      break;
  }

  try {
    const response = await axios.get(url, {
      params: {
        api_key: 'fb1030ba317555b28d3ed69041db88ef',
        language: 'ko-KR',
        page: '1',
      },
    });

    const moviesArray = response.data.results;

    if (moviesArray.length > 0) {
      movies.value = moviesArray;
      currentTag.value = category;
    } else {
      console.error('선택한 카테고리에 대한 영화를 찾을 수 없습니다.');
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  await fetchMovies('latest');
});
</script>

<template>
  <HeaderSection />
  <main id="main" role="main">
    <div class="header__intro" v-if="movies.length > 0"
      :style="{ backgroundImage: 'url(' + getImageUrl(movies[0].backdrop_path) + ')' }">
      <div class="container">
        <div class="left play__icon">
          <a href="#">
            <img :src="'https://image.tmdb.org/t/p/w500/' + getImageUrl(movies[0].poster_path)" alt="">
          </a>
        </div>
        <div class="right">
          <h2>{{ movies[0].title }}</h2>
          <p class="desc">
            "{{ movies[0].overview }}"
          </p>
          <p class="date">개봉 : {{ movies[0].release_date }}</p>
          <p class="average">평점 : {{ movies[0].vote_average }} </p>
          <!-- <div class="credits">
                            <div>
                                <img src="https://image.tmdb.org/t/p/w500/qoOp8XvZ4v7B0C9ZmtoRCl9CDSO.jpg"
                                    alt="John David Washington">
                                <img src="https://image.tmdb.org/t/p/w500/mLKvNuCJSgyK0WdLd4ogO81sOO1.jpg"
                                    alt="Madeleine Yuna Voyles">
                                <img src="https://image.tmdb.org/t/p/w500/lm2FKwj2zO8ZsqMNFHm4KMtlNlM.jpg" alt="Gemma Chan">
                                <img src="https://image.tmdb.org/t/p/w500/cDcB8mKP1GiIeoM3Qe7GIucs0iv.jpg"
                                    alt="Allison Janney">
                                <img src="https://image.tmdb.org/t/p/w500/w2t30L5Cmr34myAaUobLoSgsLfS.jpg"
                                    alt="Ken Watanabe">
                            </div>
                        </div> -->
        </div>
      </div>
    </div>
    <div class="container">
      <div class="movie__inner">

        <div class="movie__search">
          <h2 class="blind">검색하기</h2>
          <input tpye="search" v-model="searchQuery" type="search" placeholder="검색어를 입력해주세요!" @keyup.enter="searchMovies">
          <button type="submit" @click="searchMovies">확인</button>
        </div>
        <!-- //movie__search -->

        <div class="movie__tag">
          <ul>
            <li><a href="#" @click="fetchMovies('latest')">최신 영화</a></li>
            <li><a href="#" @click="fetchMovies('popular')">인기 영화</a></li>
            <li><a href="#" @click="fetchMovies('upcoming')">개봉 예정</a></li>
            <li><a href="#" @click="fetchMovies('toprated')">최고 평점</a></li>
          </ul>
        </div>
        <!-- //movie__tag -->

        <section class="movie__cont">
          <h2 class="blind">영화</h2>
          <div class="movie play__icon" v-for="movie in movies" :key="movie.id">
            <a :href="'/detail/' + movie.id">
              <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                :alt="movie.title">
              <img v-else src="fallback_image_url" alt="No Poster Available">
            </a>
          </div>
        </section>
        <!-- //movie__cont -->

      </div>
    </div>
  </main>
  <FooterSection />
</template>

<script>
import HeaderSection from '@/components/section/HeaderSection.vue';
import FooterSection from '@/components/section/FooterSection.vue';

export default {
  name: "MovieHomePage",
  components: {
    HeaderSection,
    FooterSection,
  },
  data() {
    return {
      movie: [],
      movies: [],
    };
  },
  methods: {
    async fetchRandomMovie() {
      try {
        const randomPage = Math.floor(Math.random() * 100) + 1; // 임의의 페이지 선택
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: 'fb1030ba317555b28d3ed69041db88ef',
            language: 'ko-KR',
            page: randomPage,
          }
        });
        const movies = response.data.results;

        // 무작위 영화 선택
        const randomIndex = Math.floor(Math.random() * movies.length);
        this.movies = [movies[randomIndex]]; // 결과를 배열로 감싸서 표시
      } catch (error) {
        console.log(error);
      }
    },
    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w500${path}` : ''; // 이미지가 없는 경우 빈 문자열 반환
    },
  }
}
</script>

<style lang="scss">
#main {
  background-color: rgb(38, 38, 38);
}

.header__intro {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  padding: 30px;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #00000032;
    backdrop-filter: blur(7px);
    z-index: 1;
  }

  .container {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 10;

    .left {
      width: 350px;

    }

    .right {
      width: calc(100% - 390px);

      h2 {
        font-size: 30px;
        margin-bottom: 10px;
      }

      .desc {
        margin-bottom: 10px;
      }
    }
  }

  .credits {
    margin-top: 20px;
  }

  .credits img {
    width: 130px;
    /* 이미지 폭 설정 */
    height: 150px;
    /* 이미지 높이 설정 *
        /* 원형 프로필 이미지 모양 설정 */
    padding: 10px;
  }
}


.movie__search {
  margin: 50px 0 20px;
  position: relative;

  input {
    border: 1px solid var(--black600);
    padding: 1rem 2rem;
    width: 100%;
    // border-radius: 50px;
  }

  button {
    position: absolute;
    right: 6px;
    top: 6px;
    width: 40px;
    height: 40px;
    background-color: var(--black);
    color: #fff;
    // border-radius: 50%;
    cursor: pointer;
    font-size: 14px;
  }
}

.movie__tag {
  ul {
    display: flex;

    li {
      a {
        border: 1px solid var(--white);
        padding: 0.5rem 1.3rem;
        display: inline-block;
        // border-radius: 50px;
        margin-bottom: 20px;
        margin-right: 10px;
        margin-top: 20px;

        &:hover {
          background-color: var(--white);
          color: var(--black);
        }
      }
    }
  }
}

.movie__cont {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .movie {
    width: 24%;
    margin-bottom: 2vh;
  }
}
</style>