<template>
  <div>
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
            <v-list-item v-else :key="item.text" link @click.stop="drawer = !drawer">
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

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  mdiCardSearch,
  mdiNewspaper,
  mdiMovie,
  mdiMusic,
  mdiLogin,
  mdiLogout,
  mdiMessage,
  mdiMathLog,
  mdiHome,
  mdiWechat,
  mdiQqchat,
  mdiSinaWeibo,
  mdiGithub,
} from "@mdi/js";

@Component({
  name: "Bar",
  components: {},
})
export default class Bar extends Vue {
  // 高亮索引
  private item = -1;
  private icons = {
    mdiCardSearch,
    mdiNewspaper,
    mdiMovie,
    mdiMusic,
    mdiLogin,
    mdiLogout,
    mdiMessage,
    mdiMathLog,
    mdiHome,
    mdiWechat,
    mdiQqchat,
    mdiSinaWeibo,
    mdiGithub
  };
  private items = [
    { icon: this.icons.mdiHome, text: "Town" },
    { icon: this.icons.mdiLogin, text: "登录" },
    { icon: this.icons.mdiCardSearch, text: "搜索" },
    { icon: this.icons.mdiNewspaper, text: "热点" },
    {
      icon: this.icons.mdiMovie,
      "icon-alt": this.icons.mdiMovie,
      text: "电影",
      model: false,
      children: [{ icon: "mdi-plus", text: "科幻" }],
    },
    {
      icon: this.icons.mdiMusic,
      "icon-alt": this.icons.mdiMusic,
      text: "频道",
      model: false,
      children: [
        { text: "视频" },
        { text: "音乐" },
        { text: "新闻" },
        { text: "幽默" },
        { text: "周边" },
      ],
    },
    { icon: this.icons.mdiMathLog, text: "日志" },
    { icon: this.icons.mdiMessage, text: "消息" },
    { icon: "mdi-help-circle", text: "帮助" },
    { icon: this.icons.mdiLogout, text: "退出" },
    { icon: "mdi-cog", text: "设置" },
  ];

  private drawer = true;
}
</script>