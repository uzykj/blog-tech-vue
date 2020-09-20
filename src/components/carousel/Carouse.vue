<template>
  <div>
    <v-container fluid>
      <v-carousel cycle height="150" hide-delimiter-background show-arrows-on-hover hide-delimiters>
        <v-carousel-item v-for="(v, i) in carouselList" :key="i">
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <v-img :src="v.imageSrc"></v-img>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import { Tech } from "@/interfaces/tech";

@Component({
  name: "Carouse",
  components:{

  }
})
export default class Carouse extends Vue {

  // 轮播图列表
  private carouselList: Tech[] = [];

  // 监听轮播图
  @Watch('$store.getters.getCarouseList')
  watchCarouselList(){
    this.carouselList = this.$store.getters.getCarouseList;
  }

}
</script>>