<template>
  <v-app id="app">
    <v-main>
      <v-row>
        <v-col cols="12" lg="8" sm="8" md="8" style="padding: 0px">
          <v-img
            src="https://img.ivsky.com/img/tupian/pre/202003/19/kongbai_xiangzi-005.jpg"
            width="100%"
            height="100vh"
            style="padding: 0px"
          >
          </v-img>
        </v-col>
        <v-navigation-drawer
          temporary
          right
          app
          width="650"
          hide-overlay
          v-model="loginDrawer"
          permanent
          class="card_hide_border"
        >
          <v-sheet width="300" class="mx-auto card_vertical_center">
            <v-alert
              dense
              type="error"
              transition="scale-transition"
              :value="alertLogin"
              text
              >用户名或密码错误!</v-alert
            >
            <div class="text-center mx-auto">
              <v-card-subtitle class="text-h3">Twon</v-card-subtitle>
            </div>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-col cols="12" lg="12" sm="12" md="12">
                <v-row>
                  <v-text-field
                    label="用户名"
                    v-model="username"
                    :rules="usernameRules"
                    required
                    dense
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="12" lg="12" sm="12" md="12">
                <v-row>
                  <v-text-field
                    label="密码"
                    v-model="password"
                    :rules="passwordRules"
                    required
                    :append-icon="showPassWord ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassWord ? 'text' : 'password'"
                    @click:append="showPassWord = !showPassWord"
                    dense
                  ></v-text-field>
                </v-row>
              </v-col>
              <div class="text-center mx-auto">
                <v-btn color="primary" block @click="login()" :loading="loading"
                  >登录</v-btn
                >
              </div>
            </v-form>
            <v-card-actions>
              <v-checkbox
                label="记住密码"
                color="primary"
                v-model="remeberPassword"
                dense
              ></v-checkbox>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                style="font-size: 16px; line-height: unset; margin-top: -4px"
                >忘记密码</v-btn
              >
            </v-card-actions>
            <div class="text-center mx-auto">
              <v-btn color="nomary" block @click="setRegisterState()"
                >注册</v-btn
              >
            </div>
            <div class="text-center mx-auto">
              <v-card-subtitle>其他登录方式</v-card-subtitle>
            </div>
            <v-card-actions class="white justify-center">
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                text
                icon
                small
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-sheet>
        </v-navigation-drawer>
      </v-row>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mdiWechat, mdiQqchat, mdiSinaWeibo, mdiGithub } from "@mdi/js";

@Component({
  name: "Login",
  components: {},
})
export default class Login extends Vue {
  // 引入的图标
  private icons = {
    mdiWechat,
    mdiQqchat,
    mdiSinaWeibo,
    mdiGithub,
  };

  private loginDrawer = true;

  // 其他登录方式图标
  private socials = [
    {
      icon: this.icons.mdiWechat,
      color: "green",
    },
    {
      icon: this.icons.mdiQqchat,
      color: "blue",
    },
    {
      icon: this.icons.mdiSinaWeibo,
      color: "red",
    },
    {
      icon: this.icons.mdiGithub,
      color: "black",
    },
  ];

  // form表单
  private valid = false;

  // 记住密码
  private remeberPassword = false;

  // 密码输入加密
  private showPassWord = false;

  // 登录按钮记载
  private loading = false;

  // 登录错误提示
  private alertLogin = false;
  private username = "";

  // 登录用户名规则
  private usernameRules = [(v: unknown) => !!v || "请填写用户名"];
  private password = "";

  // 登录密码规则
  private passwordRules = [(v: unknown) => !!v || "请填写用户密码"];

  // 校验form表单
  private validate() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any).$refs.form.validate();
  }

  // 登录
  private login() {
    // 如果登录成功
    if (this.validate()) {
      console.log(this.remeberPassword);
      this.$store.commit("setLoginState", true);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.alertLogin = true;
        setTimeout(() => (this.alertLogin = false), 2000);
      }, 2000);
    }
  }

  // 跳转注册页面
  private setRegisterState() {
    this.$router.push({path: '/register'});
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

