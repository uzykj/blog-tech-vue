<template>
  <div>
    <v-sheet style="position: relative;">
      <v-navigation-drawer v-model="drawer" temporary right app width="600">
        <v-sheet width="300" class="mx-auto card_vertical_center">
          <v-alert
            dense
            type="error"
            transition="scale-transition"
            :value="alertLogin"
            text
          >用户名或密码错误!</v-alert>
          <v-form v-model="valid">
            <div class="text-center mx-auto">
              <v-card-subtitle class="text-h4">Twon</v-card-subtitle>
            </div>
            <v-col cols="12" lg="12" sm="12" md="12">
              <v-row>
                <v-text-field label="用户名" v-model="username" :rules="usernameRules" required></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="12" lg="12" sm="12" md="12">
              <v-row>
                <v-text-field label="密码" v-model="password" :rules="passwordRules" required></v-text-field>
              </v-row>
            </v-col>
            <div class="text-center mx-auto">
              <v-btn color="primary" block @click="login()" :loading="loading">登录</v-btn>
            </div>
            <v-card-actions>
              <v-checkbox label="记住密码" color="primary" dense></v-checkbox>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                style="font-size: 16px;line-height: unset;margin-top: -4px"
              >忘记密码</v-btn>
            </v-card-actions>
            <div class="text-center mx-auto">
              <v-btn color="nomary" block @click="1">注册</v-btn>
            </div>
          </v-form>
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
import { Component, Vue } from "vue-property-decorator";
import { mdiWechat, mdiQqchat, mdiSinaWeibo, mdiGithub } from "@mdi/js";

@Component({
  name: "Login",
  components: {},
})
export default class Login extends Vue {
  private icons = {
    mdiWechat,
    mdiQqchat,
    mdiSinaWeibo,
    mdiGithub,
  };

  private drawer = true;
  private terms = false;
  private conditions = false;
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
  private valid = false;
  private loading = false;
  private alertLogin = false;
  private username = "";
  private usernameRules = [!!this.username || "Name is required"];
  private password = "";
  private passwordRules = [!!this.password || "password is required"];
  private loginValidate() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).$refs.form.validate();
  }
  private login() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.alertLogin = true;
      setTimeout(() => (this.alertLogin = false), 2000);
    }, 2000);
  }
}
</script>