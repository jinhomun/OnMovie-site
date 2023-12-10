<template>
    <div class="movie__info ">
        <div class="info__inner container1280">
            <h2>영화정보</h2>
            <div v-if="movieInfo && movieInfo.genres && movieInfo.genres.length > 0">
                <i>장르 :</i>
                <span v-for="(genre, index) in movieInfo.genres" :key="index">
                    {{ genre.name }}
                    <span v-if="index < movieInfo.genres.length - 1">, </span>
                </span>
            </div>
            <div>
                <i>개봉일 :</i>
                <span>
                    {{ movieInfo.release_date }}
                </span>
            </div>
            <div>
                <i>상영시간 :</i>
                <span>
                    {{ movieInfo.runtime }}
                </span>
                분
            </div>
        </div>

    </div>
</template>
<style lang="scss">
.movie__info {
    padding: 2vh 4vh;

    .info__inner {
        text-align: center;
        h2 {
            color: #fff;
            font-size: 2rem;
        }
        div {
            i {
                margin-right: 1rem;
            }
        }
    }
}
</style>
<script>
export default {
    props: {
        movieInfo: {
            type: Object,
            required: true
        }
    },
};
</script>