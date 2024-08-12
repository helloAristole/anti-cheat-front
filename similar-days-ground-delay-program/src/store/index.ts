import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息，这里可以存放token、用户名等
    user: null
  },
  getters: {
    // 获取当前用户信息
    getUser: state => state.user
  },
  mutations: {
    // 设置用户信息
    SET_USER(state, user) {
      state.user = user
    },
    // 清除用户信息，模拟登出操作
    CLEAR_USER(state) {
      state.user = null
    }
  },
  actions: {
    // 登录操作，这里假设是异步获取用户信息并提交到mutation
    
    // 退出操作，调用mutation清除用户信息
    logout({ commit }) {
      commit('CLEAR_USER')
      // 可以在此处添加额外的登出逻辑，如清除token等
    }
  },
  modules: {}
})