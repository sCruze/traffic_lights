<template>
  <div id="app">
    <div>Светофоры светофоры...</div>
    <router-view />
  </div>
</template>

<style>
@import "theme/index.css";

#app {
  display: -webkit-box; /* Safari, iOS 6 и ранних версиях; Android, старых WebKit */
  display: -moz-box; /*  Firefox (может и глючить) */
  display: -ms-flexbox; /*  IE 10 */
  display: -webkit-flex; /* Chrome 21+ */
  display: flex; /* Opera 12.1+, Firefox 22+ */
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}
</style>
