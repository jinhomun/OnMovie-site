<template>
  <div class="detail__trailer">
    <div class="detail__video">
      <iframe width="600" height="315" v-if="movieVideo && movieVideo.length > 0"
        :src="'https://www.youtube.com/embed/' + movieVideo[0].key" title="YouTube video player" frameborder="0"
        allowfullscreen></iframe>
      <div v-else>
        동영상이 YouTube에서 제공되지 않습니다.
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    movieVideo: {
      type: Array,
      required: true,
    },
  },
};
</script>
  
<style lang="scss">
.detail__trailer {
  .detail__video {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center; // 가운데 정렬
    align-items: center; // 세로 가운데 정렬

    iframe {
      width: 600px; // 원하는 너비로 조절
      height: 350px; // 원하는 높이로 조절
    }

    div {
      text-align: center;
    }
  }
}
</style>
