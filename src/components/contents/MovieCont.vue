<template>
    <section class="movie__cont">
        <h2 class="blind"></h2>

        <div class="movie" v-for="movie in movies" :key="movie.id">
            <a href="https://www.themoviedb.org/movie">
                <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title">
            </a>
        </div>
    </section>
</template>
