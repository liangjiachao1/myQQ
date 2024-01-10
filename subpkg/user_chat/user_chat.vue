<template>
  <view>
    <!-- 消息区域 -->
    <view class='chat-message-box' @touchstart="touchStart" @touchend="touchEnd" :style='messagemarginbottom'>
      <view v-for='(item) in chatDetail' :key='item.id'>
        <you-chat-message :avatar='avatar' :chatmessage='item'></you-chat-message>
      </view>
    </view>
    <!-- 输入框区域 -->
    <chat-input @sendMessage='sendMessage' @changeMarginBottom='changeMarginBottom' @changeCancellayer='changeCancellayer' :cancellayer='cancellayer'></chat-input>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        messagemarginbottom: 'padding-bottom: 100px;',
        touchStartX: 0, // 触屏起始点x  
        touchStartY: 0, // 触屏起始点y 
        cancellayer:false  ,//用来告诉子组件关闭弹层
        recipients:null,  //聊天方id
        pagesize:10,   //获取聊天条数
        pagenum:1,   //获取聊天页数
        chatDetail:[],
        avatar:null
      };
    },
    onLoad(options) {
      this.recipients=options.id
    },
    onShow() {
      this.getChatDetail(0)
      this.getavatar()
      this.arriveBottom()
      uni.onSocketMessage(async (res) =>{
        await this.getChatDetail(0)
        this.$nextTick(() => {this.arriveBottom()})
        
      })
    },
    // 下拉刷新
    async onPullDownRefresh(){
      this.pagenum+=1
      await this.getChatDetail(1)
      uni.stopPullDownRefresh()
    },
    computed:{
      ...mapState('m_user',['userinfo']),
      ...mapState('m_chat',['chatMessage'])
    },
    methods: {
      // 发送信息
      async sendMessage(message){
        const {data}=await uni.$http.post('/user/chat/sendmessage',{
          recipients:this.recipients,
          message:message
        })
        if(data.status!==0) return uni.showMsg(data.message)
        // 成功后重新获取数据
        await this.getChatDetail(0)
        // 重新将视图拉到最底部
        this.arriveBottom()
        // 将数据发送到websocket服务器上，用于即时通讯
        const value={
            id:this.userinfo.user_id,
            friendid:this.recipients,
            value:message
          }
        uni.sendSocketMessage({
          data:JSON.stringify(value)
        })
      },
      // 获取对面头像
      async getavatar(){
        const {data}=await uni.$http.get('/userinfo/friend?id='+this.recipients)
        if(data.status!==0) return uni.showMsg(data.message)
        this.avatar=data.data.avatar||'../../static/avatar.png'
      },
      // 调用接口，接收聊天详情
      async getChatDetail(x){
        const {data}=await uni.$http.get(`/user/chat/getdetail?recipients=${this.recipients}&pagesize=${this.pagesize}&pagenum=${this.pagenum}`)
        if(data.status!==0) return uni.showMsg(data.message)
        if(data.message==="已经到顶了") {
          this.pagenum-=1
          return uni.showMsg(data.message)
        }
        if(data.message==="没有找到相关聊天记录"){ return }
        if(x===0) this.chatDetail=[...data.data,...this.chatDetail]
        if(x===1) this.chatDetail=[...this.chatDetail,...data.data]
        // 需要对chatDetail进行去重操作
        this.chatDetail=this.chatDetail.filter((item,index)=>this.chatDetail.findIndex(item1=>item1.id===item.id)===index)
      },
      // 将视图移动到最底部
      arriveBottom() {
        this.$nextTick(() => {
          uni.createSelectorQuery().select('.chat-message-box').boundingClientRect((res) => {
            uni.pageScrollTo({
              scrollTop: res.height ,
              duration: 0
            })
          }).exec() //注意：这里的exec()必须要写
        })
      },
      changeMarginBottom(e) {
        if(e) this.messagemarginbottom = 'padding-bottom:250px'
        else this.messagemarginbottom = 'padding-bottom:100px'
        
      },
      /**  
       * 触摸开始  
       **/
      touchStart(e) {
        // console.log("触摸开始")
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      },

      /**  
       * 触摸结束  
       **/
      touchEnd(e) {
        let deltaX = e.changedTouches[0].clientX - this.touchStartX;
        let deltaY = e.changedTouches[0].clientY - this.touchStartY;
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX >= 0) {
            // console.log("左滑")
            uni.switchTab({
              url:'/pages/message/message'
            })
          } else {
            // console.log("右滑")
          }
        } else if (Math.abs(deltaY) > 50 && Math.abs(deltaX) < Math.abs(deltaY)) {
          if (deltaY < 0) {
            // console.log("上滑")
            
          } else {
            // console.log("下滑")
            this.cancellayer=true
          }
        } else {
          // console.log("可能是误触！")
          this.cancellayer=true
        }
      },
      changeCancellayer(){
        this.cancellayer=false
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #efefef;
  }

  .chat-message-box {
    display: flex;
    flex-direction: column-reverse;

  }
</style>