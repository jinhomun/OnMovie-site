<template>
    <div class="detail__credits">
        <div class="container">
            <h3>영화 속 배우</h3>
            <div v-for="(cast, index) in cast" :key="index">
                <img :src="'https://image.tmdb.org/t/p/w500' + cast.profile_path" :alt="cast.name">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movieCredits: {
            type: Object,
            required: true
        }
    }
}
</script>