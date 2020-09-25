<template>
  <v-app id="app">
    <AppBar />
    <Home />
    <router-view />
    <Foot />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// 主页
import Home from "@/views/Home.vue";

// 左侧导航栏
import AppBar  from "@/views/Bar.vue";

// 页脚
import Foot from "@/views/Foot.vue";

@Component({
  name: "App",
  components: {
    AppBar,
    Home,
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
