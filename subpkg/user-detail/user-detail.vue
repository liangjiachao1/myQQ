<template>
  <view>
    <!-- 头像和昵称区域 -->
    <view class="avatar-box">
      <image class="avatar" :src='userinfo.user_avatarUrl||avatarUrl'></image>
      <text class="weui-input">昵称：{{userinfo.user_username}}</text>
      <text>账号：111111</text>
    </view>
    
    <!-- 个性签名区域 -->
    <textarea id="signsture" confirm-type='done' placeholder="个性签名"></textarea>
    
    <!-- 加好友和发信息区域 -->
    <view class="add-friend">
      <button type='default'>加好友</button>
      <button type='primary' @click='gotoUserChat'>发信息</button>
    </view>
    
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        avatarUrl:'../../static/avatar.png'
      };
    },
    computed:{
      ...mapState('m_user',["userinfo"])
    },
    methods:{
      gotoUserChat(){
        uni.navigateTo({
          url:"/subpkg/user_chat/user_chat"
        })
      }
    }
  }
</script>

<style lang="scss">
  page{
    background-color: #efefef;
  }
.avatar-box {
    width: 100%;
    display: flex;
    padding: 50px 0;
    align-items: center;
    flex-direction: column;

      .avatar {
        width: 90px;
        height: 90px;
        border-radius: 90px;
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
  
  #signsture{
    display: inline-block;
    width:370px;
    height:100px;
    padding:10px;
    margin:10px;
    border:1px solid #000;
    font-size: 14px;
  }
  
  .add-friend{
    width:100%;
    position: fixed;
    bottom:0;
    left: 0;
    display:flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    
    button{
      width:40%;
    }
  }
  
  
</style>
