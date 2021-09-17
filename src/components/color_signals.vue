<template>
  <div class="traffic_lights-color">
      <span
          class="circle"
          :class="{flickering: this[dataSignal.colorFlickering] && dataRoute === dataSignal.id}"
      >
      </span>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "color_signals",
  // Забираем свойства переданные из родительского компонента
  props: ['dataRoute', 'dataSignal'],
  computed: {
    // Забираем из state нужные нам значения
    ...mapState(['changeFlickeringGreen', 'changeFlickeringYellow', 'changeFlickeringRed']),
  }
}
</script>

<style lang="scss" scoped>
@import "../theme/_mixins";

.traffic_lights-color {
  border-bottom: 1px;
  border-bottom-color: black;
  width: 10rem;
  height: 10rem;
  padding: 1rem;

  .circle {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 50%;
  }
}

.green {
  :nth-child(1) {
    .circle {
      background: rgba(0,255,0, 1);
    }
  }
  :nth-child(2) {
    .circle {
      background: rgba(255,255,0, 0.5);
    }
  }
  :nth-child(3) {
    .circle {
      background: rgba(255,0,0, 0.5);
    }
  }
}

.yellow {
  :nth-child(1) {
    .circle {
      background: rgba(0,255,0, 0.5);
    }
  }
  :nth-child(2) {
    .circle {
      background: rgba(255,255,0, 1);
    }
  }
  :nth-child(3) {
    .circle {
      background: rgba(255,0,0, 0.5);
    }
  }
}

.red {
  :nth-child(1) {
    .circle {
      background: rgba(0,255,0, 0.5);
    }
  }
  :nth-child(2) {
    .circle {
      background: rgba(255,255,0, 0.5);
    }
  }
  :nth-child(3) {
    .circle {
      background: rgba(255,0,0, 1);
    }
  }
}

.flickering {
  @include flickering();
}
</style>