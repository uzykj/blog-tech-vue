<template>
  <div>
    <v-sheet style="position: relative;">
      <v-navigation-drawer v-model="registerDrawer" temporary right app width="600">
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
            <v-row>
              <v-col cols="12" lg="12" sm="12" md="12">
                <v-text-field
                  label="用户名"
                  v-model="username"
                  :rules="[registerRules.usernameRequired, registerRules.usernameCounter, registerRules.username]"
                  required
                  hint="用户名仅支持中英文、数字和下划线、中横线"
                  counter="10"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="12" sm="12" md="12">
                <v-text-field
                  label="密码"
                  v-model="password"
                  :rules="[registerRules.passwordRequired, registerRules.passwordCounter, registerRules.password]"
                  required
                  :append-icon="showPassWord ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassWord ? 'text' : 'password'"
                  @click:append="showPassWord = !showPassWord"
                  hint="用户密码必须包含大写小写字母、数字、特殊符号"
                  counter="6"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="12" sm="12" md="12">
                <v-text-field
                  label="手机号"
                  v-model="mobile"
                  :rules="[registerRules.mobileRequired, registerRules.mobile]"
                  required
                  hint="中国大陆区手机号"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5" lg="5" sm="5" md="5">
                <v-text-field
                  label="验证码"
                  v-model="code"
                  :rules="[registerRules.mobileCodeRequired, registerRules.mobileCodeCounter]"
                  required
                  hint="手机短信验证码"
                  counter="4"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="2" lg="2" sm="2" md="2"></v-col>
              <v-col cols="4" lg="4" sm="4" md="4">
                <v-btn @click="getMobileCode()" :disabled="getMobileCodeState">获取验证码</v-btn>
              </v-col>
            </v-row>
            <div class="text-center mx-auto">
              <v-btn color="primary" block @click="register()" :loading="loading">注册</v-btn>
            </div>
          </v-form>
          <v-card-actions></v-card-actions>
          <div class="text-center mx-auto">
            <v-btn color="nomary" block @click="setLoginExistState()">登陆已有帐号</v-btn>
          </div>
        </v-sheet>
      </v-navigation-drawer>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mdiWechat, mdiQqchat, mdiSinaWeibo, mdiGithub } from "@mdi/js";

@Component({
  name: "Register",
  components: {},
})
export default class Register extends Vue {
  // 引入的图标
  private icons = {
    mdiWechat,
    mdiQqchat,
    mdiSinaWeibo,
    mdiGithub,
  };

  // 控制注册页展示
  private registerDrawer = false;

  // 登录已有账号状态
  private loginExistState = false;

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

  // 密码输入加密
  private showPassWord = false;

  // 登录按钮记载
  private loading = false;

  // 登录错误提示
  private alertLogin = false;

  // 手机号
  private mobile = "";

  // 手机号验证码
  private code = "";

  // 用户名
  private username = "";

  // 用户密码
  private password = "";

  // 用户名正则
  private usernameRegex(username: string) {
    const regex = /^[\u0391-\uFFE5a-zA-Z0-9_-]{1,10}$/;
    const result = regex.test(username);
    return result;
  }

  // 用户密码正则
  private passwordRegex(password: string) {
    const regex = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*=+;<>":',? ]).*$/;
    const result = regex.test(password);
    return result;
  }

  // 手机号正则
  private mobileRegex(mobile: string) {
    const regex = /^1(3|4|5|6|7|8|9)\d{9}$/;
    const result = regex.test(mobile);
    return result;
  }

  // 注册正则
  private registerRules = {
    usernameRequired: (v: string) => !!v || "请填写用户名",
    usernameCounter: (v: string) => !(v.length > 10) || "用户名最长为10位",
    username: (v: string) =>
      this.usernameRegex(v) || "用户名只允许中文和英文、数字、下划线、中横线",

    passwordRequired: (v: string) => !!v || "请填写用户密码",
    passwordCounter: (v: string) => !(v.length > 6) || "用户密码最长为6位",
    password: (v: string) =>
      this.passwordRegex(v) || "用户密码最少包含大写小写字母、数字、特殊符号",

    mobileRequired: (v: string) => !!v || "请填写手机号",
    mobile: (v: string) => this.mobileRegex(v) || "手机号格式错误",

    mobileCodeRequired: (v: string) => !!v || "请填写验证码",
    mobileCodeCounter: (v: string) => !(v.length > 4) || "验证码最长为4位",
  };

  // 校验form表单
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private validate = () => (this as any).$refs.form.validate();

  // 注册
  private register() {
    // 如果登录成功
    if (this.validate()) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.alertLogin = true;
        setTimeout(() => (this.alertLogin = false), 2000);
      }, 2000);
    }
  }

  // 获取手机验证码频次状态
  private getMobileCodeState = false;

  // 获取手机验证码
  private getMobileCode() {
    if (this.validate()) {
      return;
    }
  }

  // 登录已有账号 关闭注册页
  private setLoginExistState() {
    this.registerDrawer = false;

    // 设置已登录页面状态
    this.$store.commit("setLoginExistState", true);

    // 设置注册页面状态
    this.$store.commit("setRegisterState", false);
  }

  // 监听注册页状态
  @Watch("$store.getters.getRegisterState")
  watchRegisterState() {
    console.log("register", this.$store.getters.getRegisterState);
    this.registerDrawer = this.$store.getters.getRegisterState;
  }
}
</script>