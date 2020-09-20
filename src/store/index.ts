import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 登录状态
    loginState: false,
    // 轮播图列表
    carouseList: [],
    // 登录已有账号状态
    loginExistState: false,
    // 注册状态
    registerState: false,
  },
  mutations: {
    // 设置登录状态
    setLoginState: (state, val) => {
      state.loginState = val;
    },
    // 设置轮播图数据
    setCarouseList: (state, val) => {
      state.carouseList = val;
    },
    // 设置注册状态
    setRegisterState: (state, val) => {
      state.registerState = val;
    },
    // 登录已有账号
    setLoginExistState: (state, val) => {
      state.loginExistState = val;
    }
  },
  getters: {
    getLoginState: state => {
      return state.loginState;
    },
    getCarouseList: state => {
      return state.carouseList;
    },
    getRegisterState: state => {
      return state.registerState;
    },
    getLoginExistState: state => {
      return state.loginExistState;
    }
  },
  actions: {},
  modules: {}
});
