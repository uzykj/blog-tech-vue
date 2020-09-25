<template>
  <v-app id="inspire">
    <v-main>
      <Carousel />

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
                  <v-img class="hover_title" height="450" :src="hotInfo.imageSrc"></v-img>
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
          <v-card-title class="text-h3">最新</v-card-title>
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
                    <v-img class="hover_title" height="150" width="350" :src="item.imageSrc"></v-img>
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
  </v-app>
</template>

<script lang="ts">
import _ from "lodash";
import axios from "axios";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Tech } from "@/interfaces/tech";
import { nest } from "../../server";

// 轮播图组件
import Carousel from "@/components/carousel/Carouse.vue";

@Component({
  name: "Home",
  components: {
    Carousel,
  },
})
export default class Home extends Vue {
  created() {
    axios.get<Tech[]>(this.getTechUrl()).then((v) => {
      const data = v.data;
      const hotinfo = data.shift();
      if (hotinfo) {
        this.hotInfo = {
          title: hotinfo.title,
          content: hotinfo.content,
          name: hotinfo.name,
          subtitle: hotinfo?.subtitle,
          imageSrc: hotinfo.imageSrc,
          date: hotinfo.date,
          text: hotinfo.text,
        };
      }

      // 主页侧边五条
      this.hotInfoList = _.slice(data, 0, 5);

      // 轮播图数据
      this.$store.commit("setCarouseList", _.slice(data, 0, 5));

      // 主页剩余条数
      this.infoList = _.slice(data, 5, data.length);
    });
  }

  private isActive = false;

  private page = 1;
  getTechUrl(): string {
    return `http://${nest.host}:${nest.port}/tech/get?page=${this.page}&limit=20`;
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
    '<div style="margin: auto"><h1 style="color:#1976d2 !important;">加载更多</h1></div>';

  getMoreInfo(): void {
    this.page += 1;
    axios.get<Tech[]>(this.getTechUrl()).then(({ data }) => {
      this.infoList = [...this.infoList, ...data];
      this.isShowLoad = !this.isShowLoad;
    });
  }

  private item = -1;

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
    imageSrc: "",
    date: "",
    text: "",
  };

  // 热点咨询侧列表
  private hotInfoList: Array<Tech> = [];

  // 资讯列表
  private infoList: Array<Tech> = [];
}
</script>
