<template>
  <div class="movie__credits">
    <div class="credits__inner">
      <div v-if="movieCredits && movieCredits.cast">
        <h2>출연진</h2>
        <div class="credit cast">
          <div v-for="(cast, index) in movieCredits.cast.slice(0, 5)" :key="index">
            <img v-if="cast.profile_path" :src="'https://image.tmdb.org/t/p/w500' + cast.profile_path" :alt="cast.name">
            <img v-else src="../../assets/img/profile.jpg" alt="">
            <p class="character">{{ cast.character }}</p>
            <p class="name">{{ cast.name }}</p>
          </div>
        </div>
      </div>
      <div v-if="movieCredits && movieCredits.crew">
        <h2>제작진</h2>
        <div class="credit crew">
          <div v-for="(crew, index) in movieCredits.crew.slice(0, 5)" :key="index">
            <img v-if="crew.profile_path" :src="'https://image.tmdb.org/t/p/w500' + crew.profile_path" :alt="crew.name">
            <img v-else src="../../assets/img/profile.jpg" alt="">
            <p class="department">{{ crew.department }}</p>
            <p class="name">{{ crew.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movieCredits: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      itemsPerPage: 5, // 변경 가능한 페이지당 항목 수
    };
  },
  computed: {
    visibleCast() {
      const start = this.currentIndex * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.movieCredits.cast.slice(start, end);
    },
  },
  methods: {
    nextCast() {
      const totalPages = Math.ceil(
        this.movieCredits.cast.length / this.itemsPerPage
      );
      this.currentIndex = (this.currentIndex + 1) % totalPages;
    },
    prevCast() {
      const totalPages = Math.ceil(
        this.movieCredits.cast.length / this.itemsPerPage
      );
      this.currentIndex =
        (this.currentIndex - 1 + totalPages) % totalPages;
    },
  },
};
</script>
<style lang="scss">
.movie__credits {
  padding: 2vh 2vh;

  .credits__inner {
    h2 {
      font-size: 2rem;
      color: #ffffff; // 출연진 및 제작진 제목 색상
      margin-bottom: 20px; // 제목과 리스트 간격 조절
      margin-left: 10px;
      text-align: center;
    }

    .credit {
      width: 70%; // 변경된 부분: 전체 너비를 사용하도록 수정
      display: flex;
      justify-content: space-around;
      margin: 0 auto;
 

      div {
        width: 18%;
        margin-bottom: 20px;
        text-align: center;
        color: #ffffff;
        font-size: 0.9rem;
        border: 1px solid #eee;
        border-radius: 5px;


        img {
          width: 100%;
          height: 70%;
          border-radius: 5px;
          object-fit: cover;
        }

        p{
          margin: 10px 0;
          
        }
        .name {
            font-weight: bold;
            font-size: 1.2rem;
          }
      }
    }

    .credit.crew {
      width: 70%; // 변경된 부분: 전체 너비를 사용하도록 수정
      display: flex;
      justify-content: space-around;
      margin: 0 auto;

      div {
        width: 18%;
        margin-bottom: 20px;
        text-align: center;
        color: #ffffff;
        font-size: 0.9rem;
        border: 1px solid #eee;
        border-radius: 5px;
        img {
          width: 100%;
          height: 70%;
          border-radius: 5px;
          object-fit: cover;
        }
        p {
          margin: 10px 0;
        }
      }
    }
  }

  .nav-button {
    margin-top: 10px;
    cursor: pointer;
  }
}
</style>
