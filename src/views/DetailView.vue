<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';

import HeaderSection from "../components/section/HeaderSection.vue";
import FooterSection from "../components/section/FooterSection.vue";
import DetailIntro from "../components/details/DetailIntro.vue";
import DetailInfo from "../components/details/DetailInfo.vue";
import DetailKeyWord from "../components/details/DetailKeyWord.vue";
import DetailVideo from "../components/details/DetailVideo.vue";
// import DetailReview from "../components/details/DetailReview.vue";
import DetailCredits from "../components/details/DetailCredits.vue";

const movieBasic = ref(null);
const movieInfo = ref(null);
const movieKeyWord = ref(null);
// const movieReview = ref(null);
const movieCredits = ref(null);
const movieVideo = ref(null);

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

        // const resMovieReview = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=${language}&api_key=${apiKey}`)
        // movieReview.value = resMovieReview.data;

    } catch (err) {
        console.log(err)
    }
});
</script>

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


<style lang="scss">
main {
    background-color: rgb(38, 38, 38);
}
.header__inner {
    .header__nav {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-size: 20px;
            color: var(--red);
            font-family: 'LotteriaDdag';
            padding: 5px 1rem;
            margin: 20px 10px;
            border: 1px solid var(--red);
            display: inline-block;
            text-transform: uppercase;
        }

        nav {
            li {
                display: inline;

                a {
                    display: inline-block;
                    padding: 10px;
                }
            }
        }
    }

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
        width: 150px;
        /* 이미지 폭 설정 */
        height: 150px;
        /* 이미지 높이 설정 *
        /* 원형 프로필 이미지 모양 설정 */
        padding: 10px;
    }

}
</style>