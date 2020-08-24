<template>
 <div>
    <v-main>
      <!--轮播图容器 -->
      <v-container fluid>
        <v-carousel
          cycle
          height="150"
          hide-delimiter-background
          show-arrows-on-hover
          hide-delimiters
        >
          <v-carousel-item v-for="(v, i) in hotInfoList" :key="i">
            <v-sheet height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <v-img :src="v.image"></v-img>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>
      <!--end -->

      <!--热点资讯 -->
      <v-container>
        <v-card class="mx-auto" style="box-shadow: none;">
          <v-row>
            <v-col cols="12" lg="7" sm="7" md="7">
              <v-card class="mx-auto" :height="maxHotIntoHeight" style="box-shadow: none;">
                <v-card-title @click="1" class="title hover_title">{{hotInfo.title}}</v-card-title>
                <v-card-subtitle v-html="hotInfo.subtitle"></v-card-subtitle>
                <v-card-subtitle class="hover_name">{{hotInfo.name}}</v-card-subtitle>
                <v-card-subtitle>{{hotInfo.date}}</v-card-subtitle>
                <v-card-text>
                  <!-- <v-card-subtitle v-html="getsHotInfo.content"></v-card-subtitle> -->
                  <v-img class="hover_title" height="450" :src="hotInfo.image"></v-img>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" lg="5" sm="5" md="5">
              <v-list
                two-line
                :key="i"
                v-for="(item, i) in hotInfoList"
                :height="maxHotIntoHeight/5"
              >
                <v-list-item :key="item.title">
                  <v-list-item-content>
                    <v-list-item-title
                      class="title hover_title"
                      v-html="item.title"
                      @click="titleClick()"
                    ></v-list-item-title>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    <br />
                    <v-list-item-subtitle>{{item.date}}</v-list-item-subtitle>
                    <v-list-item-subtitle
                      class="hover_name"
                      @click="nameClick()"
                      v-html="item.name"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
      <!--end -->

      <v-container>
        <v-card class="mx-auto" style="box-shadow: none;">
          <v-card-title class="text-h3">The Latest</v-card-title>
        </v-card>
      </v-container>

      <v-divider></v-divider>

      <!--浏览咨询 -->
      <v-container>
        <v-lazy
          v-model="isActive"
          :options="{
          threshold: .5
        }"
          min-height="200"
          transition="fade-transition"
        >
          <v-card class="mx-auto" style="box-shadow: none;">
            <v-card-text>
              <v-list :key="i" v-for="(item, i) in infoList" height="200">
                <v-row>
                  <v-col cols="12" lg="4" sm="4" md="4">
                    <v-list-item-title
                      class="title hover_title"
                      v-html="item.title"
                      @click="titleClick()"
                    ></v-list-item-title>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    <br />
                    <v-list-item-subtitle>{{item.date}}</v-list-item-subtitle>
                    <v-list-item-subtitle
                      class="hover_name"
                      @click="nameClick()"
                      v-html="item.name"
                    ></v-list-item-subtitle>
                  </v-col>
                  <v-col cols="12" lg="4" sm="4" md="4">
                    <v-sheet v-html="item.text" class="hover_title"></v-sheet>
                  </v-col>
                  <v-col cols="12" lg="4" sm="4" md="4">
                    <v-img class="hover_title" height="150" width="350" :src="item.image"></v-img>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
              </v-list>
              <!--load more -->
              <v-card class="text-center" height="50" :style="showMore">
                <v-card-text
                  class="text-center hover_load_more hover_backgroud_colr"
                  v-html="loadMoreText"
                  @click="isShowLoad = !isShowLoad;getMoreInfo(20)"
                ></v-card-text>
              </v-card>
              <v-card class="text-center" height="50" :style="showLoadProcess">
                <v-progress-circular
                  class="card_hide_border card_vertical_center"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-card>
            </v-card-text>
          </v-card>
        </v-lazy>
      </v-container>

      <!--end -->
    </v-main>
 </div>
</template>

<script lang="ts">
import _ from "lodash";
import moment from "moment";
import axios from "axios";
import { Component, Vue, Watch } from "vue-property-decorator";
import { HotInfo } from "@/interfaces/hotInfo";

@Component({
  name: "Home",
  components:{

  }
})
export default class Home extends Vue {
  created() {
    axios.get(this.getInfoListUrl()).then((v) => {
      console.log(v);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = v.data as any[];
      const hotinfo = data.shift();
      this.hotInfo = {
        title: hotinfo?.title?.rendered,
        content: hotinfo?.content?.rendered,
        name: hotinfo?._embedded?.author[0]?.name,
        subtitle: hotinfo?.subtitle,
        image: hotinfo?.jetpack_featured_media_url,
        date: moment(hotinfo?.date).format("YYYY-MM-DD HH:mm"),
        text: hotinfo?.excerpt?.rendered,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.hotInfoList = this.transformationInfoList(_.slice(data, 0, 5));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.infoList = _.slice(data, 5, data.length).map((v: any) => {
        return {
          title: v?.title?.rendered,
          content: v?.content?.rendered,
          name: v?._embedded?.author[0]?.name,
          subtitle: v?.subtitle,
          image: v?.jetpack_featured_media_url,
          date: moment(v?.date).format("YYYY-MM-DD HH:mm"),
          text: v?.excerpt?.rendered,
        };
      });
    });
  }

  private isActive = false;

  private page = 1;
  getInfoListUrl(): string {
    return `https://techcrunch.com/wp-json/tc/v1/magazine?page=${this.page}&_embed=true&cachePrevention=0`;
  }

  // 转化咨询列表
  transformationInfoList(data: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const maps = data.map((v: any) => {
      return {
        title: v?.title?.rendered,
        content: v?.content?.rendered,
        name: v?._embedded?.author[0]?.name,
        subtitle: v?.subtitle,
        image: v?.jetpack_featured_media_url,
        date: moment(v?.date).format("YYYY-MM-DD HH:mm"),
        text: v?.excerpt?.rendered,
      };
    });
    return maps;
  }

  // 控制进度圈
  private isShowLoad = false;
  private showLoadJson = {
    showLoad: "box-shadow: none;",
    noShowLoad: "box-shadow: none;display:none",
  };
  private showMore = this.showLoadJson.showLoad;
  private showLoadProcess = this.showLoadJson.noShowLoad;

  // 监听load more按钮状态
  @Watch("isShowLoad")
  watchShowMore() {
    this.showMore = this.isShowLoad
      ? this.showLoadJson.noShowLoad
      : this.showLoadJson.showLoad;
    this.showLoadProcess = this.isShowLoad
      ? this.showLoadJson.showLoad
      : this.showLoadJson.noShowLoad;
  }
  private loadMoreText =
    '<div style="margin: auto"><h1 style="color:#1976d2 !important;">Load More</h1></div>';

  getMoreInfo(): void {
    this.page += 1;
    axios.get(this.getInfoListUrl()).then(({ data }) => {
      this.infoList = [...this.infoList, ...this.transformationInfoList(data)];
      this.isShowLoad = !this.isShowLoad;
    });
  }

  private maxHotIntoHeight = 600;

  titleClick() {
    alert("---");
  }

  nameClick() {
    alert("--");
  }

  // 热线资讯大图
  private hotInfo = {
    title: "",
    content: "",
    name: "",
    subtitle: "",
    image: "",
    date: "",
    text: "",
  };

  // 热点咨询侧列表
  private hotInfoList: Array<HotInfo> = [];

  // 资讯列表
  private infoList: Array<HotInfo> = [];
}

</script>
