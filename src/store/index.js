import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    // Action в котором выполняется вычесление оставшегося времени для каждого из сигнала светофора
    calculatingTime({commit, state}, color) {

      // Функция, принимает в себя аргументы нужные для работы с localStorage и работы с определенным state
      const timerTrafficLights = (removeItemsInLocalStorage, getItemLocalStorage, nameStateSeconds, valueSecondsPower, nameFlickering) => {

        // Как только запустилась функция, мы удаляем localStorage тех сигналов, которые сейчас не активны
        removeItemsInLocalStorage.forEach(nameLocalStorage => localStorage.removeItem(nameLocalStorage))

        // Если не существует localStorage с указанным именем или он меньше или раен 0, выполняем код далее
        if (!(JSON.parse(localStorage.getItem(getItemLocalStorage))) || JSON.parse(localStorage.getItem(getItemLocalStorage)) <= 0) {

          // Создаем localStorage с ключом и значением, переданными в аргументы функции
          localStorage.setItem(getItemLocalStorage, JSON.stringify(valueSecondsPower))

          // Запускаем мутацию, которая изменяет state, в который передаются значения из localStorage в соответсвующий state
          commit('calculatingTime', nameStateSeconds)
        }

        // Таймер
        let timerId = setInterval(() => {

          // Запускаем мутацию, которая изменяет state, в который передаются значения из localStorage в соответсвующий stat
          commit('calculatingTime', nameStateSeconds)

          // Если значение в localStorage по ключу юольше чем 0, тогда следует код далее
          if (JSON.parse(localStorage.getItem(getItemLocalStorage)) > 0) {

            // Удаляем localStorage по ключу
            localStorage.removeItem(getItemLocalStorage)
            // Создаем заново localStorage с удаленным ключом, но с переваемыми в него значением - 1
            localStorage.setItem(getItemLocalStorage, JSON.stringify(state[nameStateSeconds] - 1 ))

            // Логика обработки мерцания светофора
            if (state[nameStateSeconds] <= 3) {
              // Вызываем мутацию, в которой передаем соответствующие параметры
              commit('changeFlickering', [nameFlickering, true])
            }

            // Вызываем мутацию, в которой записываем новые значения в state из localStorage
            commit('calculatingTime', nameStateSeconds)

            // Прописываем логику мерцания светофора, полсе наступления значения 9
            if (state[nameStateSeconds] <= 0) {
              // Изменяем значение state на false
              commit('changeFlickeringOnFalse', nameFlickering)
            }
          }
        }, 1000);

        // Отчищаем стек setInterval через соответсвующее значение из аргумента функции
        setTimeout(() => { clearInterval(timerId) }, valueSecondsPower * 1000)
      }

      // Прописываем логику switch с вызовом функции и передачей в нее соответствующих параметров
      switch (color) {
        // Если открыта страница с зеленым сигналом светофора (Green)
        case 'Green':
          timerTrafficLights(['yellowSeconds', 'redSeconds'], 'greenSeconds', 'greenSeconds',15, 'changeFlickeringGreen')
          break
        case 'Yellow':
          // Если открыта страница с желтым сигналом светофора (Yellow)
          timerTrafficLights(['greenSeconds', 'redSeconds'], 'yellowSeconds', 'yellowSeconds',3, 'changeFlickeringYellow')
          break
        case 'Red':
          // Если открыта страница с красной сигналом светофора (Red)
          timerTrafficLights(['greenSeconds', 'yellowSeconds'], 'redSeconds', 'redSeconds',10, 'changeFlickeringRed')
          break
        default:
          break
      }
    }
  },
  mutations: {
    // Мутация, которая изменяет state записывая в него, соответствующие значения из localStorage
    calculatingTime(state, nameState) {
      state[nameState] = JSON.parse(localStorage.getItem(nameState))
    },
    // Мутция изменения state Flickering на значение true, для вызова мерцания соответсвующего сигнала светофора
    changeFlickering(state, data) {
      state[data[0]] = data[1]
    },
    // Мутация запускается после достижения значени 0 у таймера, перевода мерцающий сигнал в обычный
    changeFlickeringOnFalse(state, nameStateFlickering) {
      state[nameStateFlickering] = !state[nameStateFlickering]
    }
  },
  state: {
    // Состояния со значениями каждого из сигналов светофора
    greenSeconds: 0,
    yellowSeconds: 0,
    redSeconds: 0,
    changeFlickeringGreen: false,
    changeFlickeringYellow: false,
    changeFlickeringRed: false,
  },
  getters: {},
});
