<script>
  import {mapState,mapMutations} from 'vuex'
  
  export default{
    data() {
      return {
        socketOpen:false
      };
    },
  computed:{
    ...mapState('m_user',['token','userinfo']),
  },
  methods:{
    ...mapMutations('m_chat',['updateChatMessage']),
    // 页面一打开就发送一个无返回参数的网络请求，用于检测token是否过期
    async detectToken(){
      if(this.token==='') return 
      const res=await uni.$http.get('/cs')
      if(res.data.status!==0) {
        uni.setStorageSync('token','')
        uni.setStorageSync('userinfo','')
        uni.switchTab({
          url:'/pages/my/my'
        })
      }
    },
    // 页面进入调用接口，更新登录时间，以便于后续猜测是否还在登录
    async showPage(){
      if(this.token!=='') await uni.$http.post('/userinfo/showpage')
    },
    // 页面进入后台调用接口，服务端开启定时器，猜测是否还在登录
    async hidePage(){
      await uni.$http.post('/userinfo/hidepage')
    },
    // 页面进入，连接websocket
    connSocket(){
      // 没有token，说明没有登录，就不需要链接websocket了
      if(this.token==='')  return 
      uni.connectSocket({
        url: 'ws://127.0.0.1:8001'
      });
      uni.onSocketOpen((res)=>{
        console.log('WebSocket连接已打开！');
        this.socketOpen=true
        const data={
          value:'用户加入聊天',
          id:this.userinfo.user_id
        }
        if(this.socketOpen===true) {
          uni.sendSocketMessage({data:JSON.stringify(data)})
          
          // uni.onSocketMessage((res) =>{
          //   console.log('收到服务器内容：' + res.data);
          //   this.updateChatMessage(res.data)
          // })
        }
        
      });
      uni.onSocketError((res)=>{
        this.socketOpen=false
        console.log('WebSocket连接打开失败，请检查！');
      });

    },
    // 离开页面，断开websocket
    disconnSocket(){
      uni.closeSocket()
      uni.onSocketClose((res)=>{
        this.socketOpen=false
        console.log('WebSocket 已关闭！');
      })
    }
  },
   onShow() {
     this.detectToken(),
     this.showPage(),
     this.connSocket()
   },
   onHide() {
     if(this.token!=='') {this.disconnSocket();this.hidePage()}
     
   },
}
</script>

<style lang="scss">

</style>
