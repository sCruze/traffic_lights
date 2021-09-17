<template>
  <div class="traffic_lights-container" :class="route.toLowerCase()">
    <ColorSignals
      v-for="signal in signals"
      :key="signal.id"
      :dataRoute="route"
      :dataSignal="signal"
    />
<!--    <div class="traffic_lights-color">-->
<!--      <span-->
<!--          class="circle"-->
<!--          :class="{flickering: this.changeFlickeringGreen && route === 'Green'}"-->
<!--      >-->
<!--      </span>-->
<!--    </div>-->
<!--    <div class="traffic_lights-color">-->
<!--      <span-->
<!--          class="circle"-->
<!--          :class="{flickering: this.changeFlickeringYellow && route === 'Yellow'}"-->
<!--      >-->
<!--      </span>-->
<!--    </div>-->
<!--    <div class="traffic_lights-color">-->
<!--      <span-->
<!--          class="circle"-->
<!--          :class="{flickering: this.changeFlickeringRed && route === 'Red'}"-->
<!--      >-->
<!--      </span>-->
<!--    </div>-->
  </div>
</template>

<script>
// Импортируем Actions и State из store
import { mapActions, mapState } from 'vuex'

// Импорт компонета сигалов светофора
import ColorSignals from '../components/color_signals'

export default {
  name: "traffic_lights",
  components: {
    ColorSignals
  },
  data: () => ({
    // Записываем route страницы на которой этот компонет сейчас отрендерин
    route: '',
    signals: [
      {id: 'Green', colorFlickering: 'changeFlickeringGreen'},
      {id: 'Yellow', colorFlickering: 'changeFlickeringYellow'},
      {id: 'Red', colorFlickering: 'changeFlickeringRed'}
    ]
  }),
  computed: {
    // Забираем из state нужные нам значения
    ...mapState(['changeFlickeringGreen', 'changeFlickeringYellow', 'changeFlickeringRed']),
  },
  watch: {
    // Отслеждиваем route и передаем его в переменную данного компонента
    '$route': {
      immediate: true,
      handler() {
        this.calculatingTime(this.$route.name)
        this.route = this.$route.name
      }
    }
  },
  methods: {
    // Передаем метод из action store
    ...mapActions(['calculatingTime'])
  }
}
</script>

<style lang="scss" scoped>

  .traffic_lights-container {
    display: -webkit-box; /* Safari, iOS 6 и ранних версиях; Android, старых WebKit */
    display: -moz-box; /*  Firefox (может и глючить) */
    display: -ms-flexbox; /*  IE 10 */
    display: -webkit-flex; /* Chrome 21+ */
    display: flex; /* Opera 12.1+, Firefox 22+ */
    flex-direction: column;
    border: 1px solid #9c9c9c;
    border-radius: 14px;
    background: #757575;
  }

</style>