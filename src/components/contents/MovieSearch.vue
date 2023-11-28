<template>
    <section class="movie__search">
        <h2 class="blind">검색하기</h2>
        <input type="search" v-model="searchKeyword" placeholder="검색어를 입력해주세요!" @keyup.enter="searchMovies">
        <button type="sunmit" @click="searchKeyword">검색</button>
    </section>
</template>

<script>
export default {

}
</script>