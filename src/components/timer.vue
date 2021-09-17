<template>
  <div class="timer-container">
<!--  Передаем секунды в компоненты при открытии соответствующей страницы   -->
    <p v-if="this.$route.name === 'Green'" >{{ greenSeconds }}</p>
    <p v-if="this.$route.name === 'Yellow'" >{{ yellowSeconds }}</p>
    <p v-if="this.$route.name === 'Red'" >{{ redSeconds }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "timer",
  computed: {
    // Передаем значения из state, для динамического отображения их в компоненте
    ...mapState({
      greenSeconds: 'greenSeconds',
      yellowSeconds: 'yellowSeconds',
      redSeconds: 'redSeconds'
    })
  }
}
</script>

<style lang="scss" scoped>
/* Некоторые стили для таймера, можно убрать и взять стили от самого светофора */
.timer-container {
  display: -webkit-box; /* Safari, iOS 6 и ранних версиях; Android, старых WebKit */
  display: -moz-box; /*  Firefox (может и глючить) */
  display: -ms-flexbox; /*  IE 10 */
  display: -webkit-flex; /* Chrome 21+ */
  display: flex; /* Opera 12.1+, Firefox 22+ */
  flex-direction: column;
  border: 1px solid #9c9c9c;
  border-radius: 14px;
  background: #757575;
  width: 8rem;
  height: 8rem;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  margin-left: 1rem;
}
</style>