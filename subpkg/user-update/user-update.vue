<template>
  <view>
    <!-- 修改密码 -->
    <view class='password-box' v-if='rule==="password"'>
      <view class="pwd-box">
        <view class="pwd-input-box">
          <text>原密码：</text>
          <input type="password" v-model='oldPwd' placeholder="请输入你的原密码" @blur="oldPwdRule">
        </view>
        <view class='errmessage' v-show='olderr'>请输入8到16位的非空字符！</view>
      </view>
      <view class="pwd-box">
        <view class="pwd-input-box">
          <text>新密码：</text>
          <input type="password" v-model='newPwd' placeholder="请输入你的新密码" @blur="newPwdRule">
        </view>
        <view class='errmessage' v-show='newerr'>{{errMessage}}</view>
      </view>
      <button class='btnpassword' type="primary" @click='updatePwd'>确认修改</button>
    </view>
    
    <!-- 修改个性签名 -->
    <view class='signature-box' v-else-if='rule==="signature"'>
      <textarea id="signsture-box" cols="30" rows="10" v-model='signature' placeholder="请输入你的个性签名"></textarea>
      <button class='btnsignature' type="primary" @click='updateSignature'>确认修改</button>
    </view>
  </view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
  export default {
    onLoad(options) {
      this.rule=options.rule
    },
    data() {
      return {
        rule:'',
        oldPwd:'',
        newPwd:'',
        errMessage:'请输入8到16位的非空字符！',
        newerr:false,
        olderr:false,
        signature:''
      };
    },
    onShow(){
      this.getSignature()
    },
    computed:{
      ...mapState('m_user',['userinfo'])
    },
    methods:{
      ...mapMutations('m_user',['updateUserInfo','updateToken']),
      // 由于data内无法获取vuex中的内容，所以只能间接获取
      getSignature(){
        this.signature=this.userinfo.user_signature||''
      },
      oldPwdRule() {
        const reg = /^\S{8,16}$/
        if (!reg.test(this.oldPwd)) {
          this.olderr = true
          return false
        }
        this.olderr = false
        return true
      },
      newPwdRule() {
        const reg = /^\S{8,16}$/
        if (!reg.test(this.newPwd)) {
          this.newerr = true
          return false
        }
        if(this.newPwd===this.oldPwd){
          this.errMessage='新密码不能与旧密码一样！'
          this.newerr = true
          return false
        }
        this.newerr = false
        return true
      },
      async updatePwd(){
        if(!this.oldPwdRule()||!this.newPwdRule()) return uni.showMsg('请检查输入的密码是否符合标准！')
        const {data} = await uni.$http.post('/updateinfo/updatepassword',{
          newPwd:this.newPwd,
          oldPwd:this.oldPwd
        })
        if(data.status!==0) return uni.showMsg(data.message)
        // 清除userinfo和token
        this.updateToken('')
        this.updateUserInfo('')
        uni.showMsg('修改密码成功！')
        // 跳转到my页面
        uni.navigateTo({
          url:"/pages/my/my"
        })
      },
      async updateSignature(){
        if(this.signature===this.userinfo.user_signature) return 
        const {data}=await uni.$http.post('/updateinfo/updatesignature',{signature:this.signature})
        if(data.status!==0) return uni.showMsg(data.message)
        this.updateUserInfo({...this.userinfo,user_signature:this.signature})
        uni.showMsg('修改个性签名成功')
      },
    }
  }
</script>

<style lang="scss">
  .password-box{
    
    .pwd-box{
      position: relative;
          
      .pwd-input-box{
        display:flex;
        width:100%;
        justify-content: space-between;
        font-size: 16px;
        line-height: 40px;
        padding:10px;
        
        text{
          width:20%;
        }
        
        input{
          width:70%;
          height:40px;
          border:1px solid gray;
          margin-right: 20px;
          padding-left:10px ;
          border-radius: 5px;
        }
      }
      
      .errmessage{
        position: absolute;
        width:70%;
        right:0;
        bottom:-5px;
        margin-right: 20px;
        padding-left:10px ;
        font-size: 12px;
        line-height: 12px;
        color:red;
      }
    }


    
    .btnpassword{
      margin: 10px 10px;
    }
  }
  
  .signature-box{
    display: flex;
    justify-content: center;
    flex-direction: column;
    
    #signsture-box{
      width:80%;
      border:1px solid gray;
      border-radius: 5px;
      margin:10px 8%;
      padding:10px;
    }
    
    .btnsignature{
      width:80%;
    }
  }
</style>
