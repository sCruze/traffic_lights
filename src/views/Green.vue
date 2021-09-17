<template>
  <div class="green-container container-traffic__lights">
    <TrafficLights />
    <Timer />
  </div>
</template>

<script>
import {mapState} from 'vuex'

// Компонент самого светофора
import TrafficLights from '../components/traffic_lights'
// Компонент таймера
import Timer from '../components/timer'

export default {
  name: "Green",
  components: {
    // Импортируем компоненты
    TrafficLights,
    Timer
  },
  computed: {
    // Передаем соответствующий state для данной страницы
    ...mapState({
      seconds: 'greenSeconds'
    }),
  },
  watch: {
    seconds() {
      // Отслеживаем достижение таймером 0 данной страницы, и переходим на другую страницу
      if (this.seconds <= 0) {
        this.$router.push('yellow')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>