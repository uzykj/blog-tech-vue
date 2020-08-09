<template>
  <v-app id="inspire">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <v-list-item-group v-model="item" color="primary">
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

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
                  <v-list-item-subtitle class="hover_name" @click="nameClick()" v-html="item.name"></v-list-item-subtitle>
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
          </v-card-text>
        </v-card>
      </v-container>
      <!--end -->
    </v-main>

    <v-footer padless app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Blog Tech</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import _ from "lodash";
import { mdiCardSearch, mdiNewspaper, mdiMovie, mdiMusic, mdiLogin, mdiLogout, mdiMessage, mdiMathLog } from "@mdi/js";
import moment from "moment";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Home",
})
export default class Home extends Vue {
  created() {
    axios
      .get(
        "https://techcrunch.com/wp-json/tc/v1/magazine?page=1&_embed=true&cachePrevention=0"
      )
      .then((v) => {
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
        this.hotInfoList = _.slice(data, 0, 5).map((v: any) => {
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

  private item = -1;

  private maxHotIntoHeight = 600;

  private icons = {
    mdiCardSearch,
    mdiNewspaper,
    mdiMovie,
    mdiMusic,
    mdiLogin,
    mdiLogout,
    mdiMessage,
    mdiMathLog
  };

  private items = [
    { icon: this.icons.mdiLogin, text: "Login" },
    { icon: this.icons.mdiCardSearch, text: "Search" },
    { icon: this.icons.mdiNewspaper, text: "News 2020" },
    {
      icon: this.icons.mdiMovie,
      "icon-alt": this.icons.mdiMovie,
      text: "Movie",
      model: false,
      children: [{ icon: "mdi-plus", text: "Create label" }],
    },
    {
      icon: this.icons.mdiMusic,
      "icon-alt": this.icons.mdiMusic,
      text: "Music",
      model: false,
      children: [
        { text: "Import" },
        { text: "Export" },
        { text: "Print" },
        { text: "Undo changes" },
        { text: "Other contacts" },
      ],
    },
    { icon: this.icons.mdiMathLog, text: "Log" },
    { icon: this.icons.mdiMessage, text: "Message" },
    { icon: "mdi-help-circle", text: "Help" },
    { icon: this.icons.mdiLogout, text: "Exit" },
    { icon: "mdi-cog", text: "Settings" },
  ];

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

interface HotInfo {
  title: string;
  content: string;
  name: string;
  subtitle: string;
  image: string;
  date: string;
  text: string;
}
</script>
