<template>
  <div>
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <v-list-item two-line v-if="this.$store.getters.getLoginState">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Application</v-list-item-title>
            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item-group v-model="item" color="primary">
          <template v-for="item in items">
            <v-list-group
              v-if="item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon
              @click="item.method()"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title class>{{ item.text }}</v-list-item-title>
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

            <v-list-item
              v-else
              :key="item.text"
              link
              @click="item.method()"
              v-town-display="item.display"
            >
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
    <Login :propDrawer="barCore.login.state" />
    <Register />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
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

// 登录组件
import Login from "@/views/Login.vue";

// 注册组件
import Register from "@/views/Register.vue";

@Component({
  name: "Bar",
  components: {
    Login,
    Register,
  },
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
    mdiGithub,
  };

  // 导航属性中心
  private barCore = {
    login: {
      // 登录状态
      state: false,
      // 登录方法
      method: () => {
        this.barCore.login.state = !this.barCore.login.state;
      },
    },
  };

  // 控制组件隐藏和展示
  private getDisplay(state: boolean) {
    return state ? "flex" : "none";
  }

  // 导航栏参数
  private items = [
    {
      icon: this.icons.mdiLogin,
      text: "登录",
      method: this.barCore.login.method,
      type: "login",
      state: !false,
      display: "flex",
    },
    {
      icon: this.icons.mdiHome,
      text: "Town",
      method: () => true,
      type: "town",
    },
    { icon: this.icons.mdiCardSearch, text: "搜索", method: () => true },
    { icon: this.icons.mdiNewspaper, text: "热点", method: () => true },
    {
      icon: this.icons.mdiMovie,
      "icon-alt": this.icons.mdiMovie,
      text: "电影",
      model: false,
      children: [{ icon: "mdi-plus", text: "科幻", method: () => true }],
      method: () => true,
    },
    {
      icon: this.icons.mdiMusic,
      "icon-alt": this.icons.mdiMusic,
      text: "频道",
      model: false,
      children: [
        { text: "视频", method: () => true },
        { text: "音乐", method: () => true },
        { text: "新闻", method: () => true },
        { text: "幽默", method: () => true },
        { text: "周边", method: () => true },
      ],
      method: () => true,
    },
    { icon: this.icons.mdiMathLog, text: "日志", method: () => true },
    { icon: this.icons.mdiMessage, text: "消息", method: () => true },
    { icon: "mdi-help-circle", text: "帮助", method: () => true },
    { icon: this.icons.mdiLogout, text: "退出", method: () => true },
    { icon: "mdi-cog", text: "设置", method: () => true },
  ];

  // 监听登录状态 控制用户头像状态
  @Watch("$store.getters.getLoginState", { deep: true })
  watchLoginState() {
    this.items[0].state = !this.$store.getters.getLoginState;
    this.items[0].display = this.getDisplay(!this.$store.getters.getLoginState);
  }

}
</script>