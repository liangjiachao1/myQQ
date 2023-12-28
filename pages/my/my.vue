<template>
  <view>
    <!-- 用户信息区域 -->
    <view class="userinfo-box" v-if='token!==""'>
      <!-- 头像和昵称区域 -->
      <view class="avatar-box">
        <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <image class="avatar" :src=' userinfo.user_avatarUrl||avatarUrl'></image>
        </button>
        <input type="nickname" class="weui-input" :value="userinfo.user_username" @blur="changeUserName" placeholder="请输入昵称" />
      </view>
      <view class='set-box'>
        <!-- 好友动态 -->
        <!-- 修改密码 -->
        <!-- 退出登录 -->
        <view class="set-item">
          <text>好友动态</text>
          <uni-icons type="right" size="16"></uni-icons>
        </view>
        <view class="set-item">
          <text>修改密码</text>
          <uni-icons type="right" size="16"></uni-icons>
        </view>
        <view class="set-item">
          <text>退出登录</text>
          <uni-icons type="right" size="16"></uni-icons>
        </view>
      </view>

    </view>

    <!-- 登录区域 -->
    <view class="login-box" v-else>
      <image class='login-img' src="../../static/avatar.png"></image>
      <view class='login-form'>
        <input type="text" v-model='phone' placeholder="请输入你的手机号" @blur="phoneRule"/>
        <image src='../../static/error.png' v-show='phoneErr'></image>
      </view>
      <view class="login-form">
        <input type="password" v-model='possword' placeholder="请输入你的密码" @blur="posswordRule">
        <image src='../../static/error.png' v-show='posswordErr'></image>
      </view>
      <button class='login-btn' type='primary' @click='clickLogin'>登录</button>
      <text>未注册的用户自动注册</text>
    </view>
  </view>
</template>

<script>
  import {
    mapState,mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        phone:'',
        possword:'',
        phoneErr:false,
        posswordErr:false,
        avatarUrl:'../../static/avatar.png',
      };
    },
    computed: {
      ...mapState('m_user', ['token','userinfo']),
    },
    methods: {
      ...mapMutations('m_user',['updateToken','updateUserInfo']),
      phoneRule(){
        const reg=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if(!reg.test(this.phone)) {
          this.phoneErr=true
          uni.$showMsg('请输入正确的手机号！')
          return false
        }
        this.phoneErr=false
        return true
      },
      posswordRule(){
        const reg=/^\S{8,16}$/
        if(!reg.test(this.possword)) {
          this.posswordErr=true
          uni.$showMsg('请输入8到16位的非空字符！')
          return false
        }
        this.posswordErr=false
        return true
      },
      clickLogin(){
        if(!this.phoneRule()||!this.posswordRule()){
          return 
        }
        this.updateToken(''+this.phone+this.possword)
      },
      onChooseAvatar(e){
        if(e.detail.avatarUrl) this.updateUserInfo({
          ...this.userinfo,
          user_avatarUrl:e.detail.avatarUrl
        })
      },
      changeUserName(e){
        if(e.detail.value===this.userinfo.user_username) return 
       
        this.updateUserInfo({
          ...this.userinfo,
          user_username:e.detail.value
        })
      }
    }
  }
</script>

<style lang="scss">
  .avatar-box {
    width: 100%;
    display: flex;
    padding: 50px 0;
    align-items: center;
    flex-direction: column;

    .avatar-wrapper {
      width: 90px;
      height: 90px;
      padding: 0;
      border-radius: 90px;

      .avatar {
        width: 100%;
        height: 100%;
      }
    }

    .weui-input {
      width: 90px;
      height: 50px;
      color: gray;
      line-height: 50px;
      border-radius: 5px;
      text-align: center;
    }

  }

  .set-box{
    
    .set-item{
      display: flex;
      justify-content: space-between;
      padding: 10px 10px;
    }
  }
  
  .login-box {
    width: 100%;
    padding: 50px 0;
    display: flex;
    align-items: center;
    flex-direction: column;

    .login-img {
      width: 90px;
      height: 90px;
      border-radius: 90px;
    }
    
    .login-form{
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      align-items: center;
      
      input {
        width: 350px;
        height: 50px;
        border: 1px solid gray;
        border-radius: 5px;
        padding-left: 10px;
        margin-top: 15px
      }
      
      image{
        float: left;
        width:25px;
        height:25px;
        margin-left: -25px;
        padding-top: 12px;
        padding-left: -5px;
      }
    }

   

    .login-btn {
      height: 50px;
      width: 350px;
      background-color: #c00000;
      border-radius: 50px;
      text-align: center;
      line-height: 50px;
      margin: 15px 0;
    }

    text {
      font-size: 13px;
      color: gray;
    }
  }
</style>