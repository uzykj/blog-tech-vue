<template>
  <div>
    <v-container fluid>
      <v-carousel cycle height="150" hide-delimiter-background show-arrows-on-hover hide-delimiters>
        <v-carousel-item v-for="(v, i) in hotInfoList" :key="i">
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <v-img :src="v.image"></v-img>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Tech } from "@/interfaces/tech";

@Component({
  name: "App.carousel",
  components:{

  }
})
export default class Home extends Vue {
  created(){
    this.carouselList = [];
  }

  // 轮播图列表
  private carouselList: Tech[] = [];

}
</script>>