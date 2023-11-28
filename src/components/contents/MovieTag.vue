<template>
    <div class="movie__tag">
        <ul>
            <li><a href="#" @click="fetchMovies('latest')">최신영화</a></li>
            <li><a href="#" @click="fetchMovies('popular')">인기영화</a></li>
            <li><a href="#" @click="fetchMovies('upcoming')">개봉예정</a></li>
            <li><a href="#" @click="fetchMovies('top_rated')">최고평점</a></li>

        </ul>
    </div>
</template>