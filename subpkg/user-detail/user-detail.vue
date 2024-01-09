<template>
  <view>
    <!-- 头像和昵称区域 -->
    <view class="avatar-box">
      <image class="avatar" :src='friendinfo.avatar||avatarUrl'></image>
      <text class="weui-input">昵称：{{friendinfo.username || friendinfo.phone}}</text>
      <text>账号：{{friendinfo.phone}}</text>
    </view>
    
    <!-- 个性签名区域 -->
    <view class="signsture-box">
      <view id="signsture">个性签名：{{friendinfo.signature||''}}</view>
      <!-- <textarea  confirm-type='done' placeholder="个性签名" v-model=""></textarea> -->
    </view>
    
    <!-- 加好友和发信息区域 -->
    <!-- 这里的v-if不能用!== 因为两个的类型不同 -->
    <view class="add-friend" v-if='friendid!=userinfo.user_id'>
      <button type='default' @click='gotoAddFriend' v-if='friendinfo.isFriend!==1'>加好友</button>
      <button type='primary' @click='gotoUserChat'>发信息</button>
    </view>
    
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        avatarUrl:'../../static/avatar.png',
        friendid:null,
        friendinfo:{}
      };
    },
    onLoad(options) {
      this.friendid=options.id
    },
    onShow(){
      this.getFriendinfo()
    },
    computed:{
      ...mapState('m_user',["userinfo"])
    },
    methods:{
      gotoUserChat(){
        uni.navigateTo({
          url:"/subpkg/user_chat/user_chat?id="+this.friendid
        })
      },
      async getFriendinfo(){
        const {data}=await uni.$http.get('/userinfo/friend?id='+this.friendid)
        if(data.status!==0) return uni.showMsg(data.message)
        this.friendinfo=data.data
      },
      gotoAddFriend(){
        uni.navigateTo({
          url:'/subpkg/user-add-friend/user-add-friend?userid='+this.friendid
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
      // width: 90px;
      height: 50px;
      color: gray;
      line-height: 50px;
      border-radius: 5px;
      text-align: center;
    }

  }
  
  .signsture-box{
    display: flex;
    width:100%;
    margin-top:10px;
    justify-content: center;
    
    
    #signsture{
      display: inline-block;
      width:300px;
      height:100px;
      padding:10px;
      border:1px solid #000;
      font-size: 14px;
    }
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
