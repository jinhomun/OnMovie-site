<script setup>
// import { ref, onMounted } from 'vue';
// import axios from 'axios';


// const movies = ref([]);
// const searchKeyword = ref('');

// const fetchMovies = async (category) => {
//   let url = 'https://api.themoviedb.org/3/movie/popular';

//   switch (category) {
//     case 'latest':
//       url = 'https://api.themoviedb.org/3/movie/now_playing';
//       break;
//     case 'popular':
//       url = 'https://api.themoviedb.org/3/movie/popular';
//       break;
//     case 'upcoming':
//       url = 'https://api.themoviedb.org/3/movie/upcoming';
//       break;
//     case 'top_rated':
//       url = 'https://api.themoviedb.org/3/movie/top_rated';
//       break;
//   }

//   try {
//     const response = await axios.get(url, {
//       params: {
//         api_key: 'fb1030ba317555b28d3ed69041db88ef',
//         language: 'ko-KR',
//         page: '1'
//       }
//     });
//     movies.value = response.data.results;
//     console.log(response.data.results)
//   } catch (err) {
//     console.error(err);
//   }
// }

// const searchMovies = async () => {
//   try {
//     const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
//       params: {
//         api_key: 'fb1030ba317555b28d3ed69041db88ef',
//         language: 'ko-KR',
//         query: searchKeyword.value,
//       }
//     });
//     movies.value = response.data.results;
//   } catch (err) {
//     console.error(err);
//   }
// }

// onMounted(async () => {
//   await fetchMovies('latest');
// });
</script>

<template>
  <HeaderSection />

  <main id="main" role="main">
    <div class="container">
      <div class="movie__inner">

        <MovieSearch @onSearch="search" />
        <MovieTag @onSearch="tags" />
        <MovieCont />

        <!-- movie__tag -->


        <!-- movie__cont -->
      </div>
    </div>
  </main>

  <FooterSection />
</template>

<script>
import HeaderSection from '@/components/section/HeaderSection.vue';
import FooterSection from '@/components/section/FooterSection.vue';
import MovieSearch from '@/components/contents/MovieSearch.vue';
import MovieTag from '@/components/contents/MovieTag.vue';
import MovieCont from '@/components/contents/MovieCont.vue';

export default {
  name: "MovieHomePage",
  components: {
    HeaderSection,
    FooterSection,
    MovieSearch,
    MovieTag,
    MovieCont
  },
  data() {

  },
  methods: {
    async search(query) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=fb1030ba317555b28d3ed69041db88ef&language:ko-KR&query=${query}}`)
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log(error)
      }
    },
    async tags(query) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=fb1030ba317555b28d3ed69041db88ef&language:ko-KR&query=${query}}`)
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log(error)
      }

    },
  }
}
</script>

<style lang="scss">
.movie__search {
  margin: 50px 0 20px;
  position: relative;

  input {
    border: 1px solid var(--white);
    padding: 1rem 2rem;
    width: 100%;
    border-radius: 50px;
  }

  button {
    position: absolute;
    right: 6px;
    top: 6px;
    width: 40px;
    height: 40px;
    background-color: var(--black);
    color: #fff;
    border-radius: 50%;
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
        border-radius: 50px;
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
  justify-content: space-between;
  flex-wrap: wrap;

  .movie {
    width: 24%;
    margin-bottom: 1.5%;
    background-color: #ccc;
  }
}
</style>