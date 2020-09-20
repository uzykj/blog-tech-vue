<template>
  <div>
    <v-sheet style="position: relative;">
      <v-navigation-drawer v-model="loginDrawer" temporary right app width="600">
        <v-sheet width="300" class="mx-auto card_vertical_center">
          <v-alert
            dense
            type="error"
            transition="scale-transition"
            :value="alertLogin"
            text
          >用户名或密码错误!</v-alert>
          <div class="text-center mx-auto">
            <v-card-subtitle class="text-h3">Twon</v-card-subtitle>
          </div>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-col cols="12" lg="12" sm="12" md="12">
              <v-row>
                <v-text-field label="用户名" v-model="username" :rules="usernameRules" required dense></v-text-field>
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
              <v-btn color="primary" block @click="login()" :loading="loading">登录</v-btn>
            </div>
          </v-form>
          <v-card-actions>
            <v-checkbox label="记住密码" color="primary" v-model="remeberPassword" dense></v-checkbox>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              style="font-size: 16px;line-height: unset;margin-top: -4px"
            >忘记密码</v-btn>
          </v-card-actions>
          <div class="text-center mx-auto">
            <v-btn color="nomary" block @click="setRegisterState()">注册</v-btn>
          </div>
          <div class="text-center mx-auto">
            <v-card-subtitle>其他登录方式</v-card-subtitle>
          </div>
          <v-card-actions class="white justify-center">
            <v-btn v-for="(social, i) in socials" :key="i" :color="social.color" text icon small>
              <v-icon>{{ social.icon }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-sheet>
      </v-navigation-drawer>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mdiWechat, mdiQqchat, mdiSinaWeibo, mdiGithub } from "@mdi/js";

@Component({
  name: "Login",
  components: {},
})
export default class Login extends Vue {
  @Prop({ type: Boolean, required: true, default: false }) propDrawer!: boolean;

  // 引入的图标
  private icons = {
    mdiWechat,
    mdiQqchat,
    mdiSinaWeibo,
    mdiGithub,
  };

  // 控制登录页展示
  private loginDrawer = false;

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

  // 跳转注册 更改注册页状态
  private setRegisterState() {
    this.$store.commit("setRegisterState", true);
  }

  // 监听父组件传值
  @Watch("propDrawer", { deep: true })
  watchPropDrawer() {
    this.loginDrawer = true;
  }

  // 监听注册状态
  @Watch("$store.getters.getRegisterState")
  watchRegisterState() {
    console.log("login", this.$store.getters.getRegisterState);
    this.loginDrawer = !this.$store.getters.getRegisterState;
  }

  // 监听登录已有账号状态 控制登录页展示
  @Watch("$store.getters.getLoginExistState")
  watchLoginExistState() {
    this.loginDrawer = this.$store.getters.getLoginExistState;
  }
}
</script>