<template>
  <v-app id="app">
    <AppBar />
    <router-view />
    <Foot />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// 左侧导航栏
import AppBar  from "@/views/Bar.vue";

// 页脚
import Foot from "@/views/Foot.vue";

@Component({
  name: "App",
  components: {
    AppBar,
    Foot
  }
})
export default class App extends Vue{}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
