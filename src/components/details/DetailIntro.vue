<template>
    <div class="header__intro"
        :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w500/' + movieBasic.backdrop_path + ')' }">
        <div class="container">
            <div class="left play__icon">
                <a href="#">
                    <img :src="'https://image.tmdb.org/t/p/w500' + movieBasic.poster_path" :alt="movieBasic.title">
                </a>
            </div>
            <div class="right">
                <h2>{{ movieBasic.title }}</h2>
                <p class="desc">
                    {{ movieBasic.overview }}
                </p>
                <P>인기 : {{ movieBasic.popularity }}</P>
                <p>개봉 날짜 : {{ movieBasic.release_date }}</p>
                <p>영화 시간 : {{ movieBasic.runtime }}분</p>
                <p>평점 : {{ movieBasic.vote_average }}</p>
                <div> 장르 :
                    <span v-for="genre in movieBasic.genres" :key="genre.id" class="genre">
                        {{ genre.name }}
                    </span>
                </div>

                <div class="credit">
                    <div v-for="(cast, index) in cast" :key="index">
                        <img :src="'https://image.tmdb.org/t/p/w500' + cast.profile_path" :alt="cast.name">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movieBasic: {
            type: Object,
            required: true
        }
    }
}
</script>