<template>
  <view>
    <!-- 显示好友头像和昵称 -->
    <view class='friendinfo-box'>
      <image :src='friendinfo.avatar||"../../static/avatar.png"'></image>
      <text>{{friendinfo.username||friendinfo.phone}}</text>
    </view>
    <!-- 分组 -->
    <view class="friendclass-box">
      <uni-section title="选择分组" type="line">
        <uni-data-select v-model="value" :localdata="range" :clear="false" @change="change">
        </uni-data-select>
      </uni-section>
    </view>
    <!-- 加好友按钮  -->
    <view class="add-friend-btn">
      <button size='default' v-if='userid' @click='sendApplication'>发送</button>
      <button size='default' v-if='friendid' @click='sendApplication'>同意</button>
    </view>

    <!-- 添加分类弹出层 -->
    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog ref="inputClose" mode="input" title="添加分类" value="" placeholder="请输入内容"
        @confirm="confirm" @close="close"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    onLoad(options) {
      this.friendid = options.friendid
      this.userid = options.userid
    },
    data() {
      return {
        friendid: null, //好友申请id，
        userid: null, //用户id,
        friendinfo: {}, //好友信息
        value: 0,
        range: [],
      };
    },
    onShow() {
      this.getfriendinfo()
      this.getfriendClass()
    },
    computed: {
      ...mapState('m_newfriend', ['newfriendsList']),
    },
    methods: {
      async getfriendinfo() {
        // friendid存在，说明是同意好友申请 
        // userid存在，说明是发送好友申请，此时我们就需要调用接口，获取好友信息
        if (this.userid) {
          const {
            data
          } = await uni.$http.get('/userinfo/friend?id=' + this.userid)
          if (data.status !== 0) return uni.showMsg(data.message)
          this.friendinfo = data.data
        } else if (this.friendid) {
          this.friendinfo = this.newfriendsList.find(item => item.id === +this.friendid).userSender
        }
      },
      // 获取好友分类
      async getfriendClass(e) {
        const {
          data
        } = await uni.$http.get('/userinfo/friendclassify')
        if (data.status !== 0) return uni.showMsg(data.message)
        this.range = data.data
        this.range.forEach(item => {
          item.text = item.classname;
          delete item.classname
        })
        this.range.push({
          value: -1,
          text: '+ 添加分类'
        })
        if (this.range.length === 1) return this.value=0
        if(e===1) return this.value = this.range[this.range.length-2].value
        this.value = this.range[0].value
      },
      change(e) {
        if (e === -1) {
          this.$refs.inputDialog.open()
        }
      },
      // 点击确定按钮
      async confirm(value) {
        // 输入框消失
        // this.$refs.popup.close()
        const {data}=await uni.$http.post('/userinfo/addfriendclass',{classname:value})
        if(data.status!==0) return uni.showMsg(data.message) 
        this.getfriendClass(1)
      },
      // 点击取消按钮
      close() {
      	if (this.range.length === 1) return this.value=0
        this.value = this.range[0].value
      },
      async sendApplication(){
        if(this.userid){
          if(this.value===-1) return 
          const {data}=await uni.$http.post('/friend/send/friendapplication',{userRecipients:this.userid,classid:this.value})
          uni.showMsg(data.message)
        }
        else if(this.friendid){
          if(this.value===-1) return 
          const {data}=await uni.$http.post('/friend/handle/friendapplication',{application:1,id:this.friendid,recipientsclassid:this.value})
          uni.showMsg(data.message)
        }
        uni.navigateBack()
      }
    }
  }
</script>

<style lang="scss">
  .friendinfo-box {
    display: flex;
    flex-wrap: nowrap;
    padding: 10px;

    & image {
      width: 90px;
      height: 90px;
      margin-right: 10px;
    }

    & text {
      font-size: 20px;
      font-weight: bold;
      line-height: 90px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
    }
  }

  .add-friend-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    padding: 10px 0;

    & button {
      width: 90%;
      background-color: dodgerblue;
      color: #fff;
    }
  }
  
  .friendclass-box{
    box-sizing: border-box;
    width:100%;
    padding:0 10px;
  }
</style>