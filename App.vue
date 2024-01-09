<script>
  import {mapState} from 'vuex'
  
  export default{
  computed:{
    ...mapState('m_user',['token']),
  },
  methods:{
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
  },
   onShow() {
     this.detectToken(),
     this.showPage()
   },
   onHide() {
     if(this.token!=='') this.hidePage()
   },
}
</script>

<style lang="scss">

</style>
