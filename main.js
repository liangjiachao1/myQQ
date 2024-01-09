
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

import { $http } from "@escook/request-miniprogram"
import { pathToBase64, base64ToPath } from 'image-tools'

uni.$http=$http

uni.pathToBase64=pathToBase64
uni.base64ToPath=base64ToPath

// 请求的根路径
$http.baseUrl='http://127.0.0.1:8080'

// 请求拦截器
$http.beforeRequest=function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
  
  // 检测是否需要权限
  if(options.url.indexOf('/api/')===-1){
    options.header={
      Authorization:store.state.m_user.token
    }
  }
}

// 响应拦截器
$http.afterRequest = function (e) {
  wx.hideLoading()
  if(e.data.message==="身份认证失败！"){

    uni.switchTab({
      url:'/pages/my/my',
      complete:()=>{
        uni.setStorageSync('token','')
        uni.setStorageSync('userinfo','')
      }
    })
  }
}

// 封装请求失败后的弹窗
uni.showMsg=(title='数据请求失败',duration=1500)=>{
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

uni.$showMsg=function(title='数据请求失败',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif