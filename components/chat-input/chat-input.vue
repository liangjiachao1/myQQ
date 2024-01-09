<template>
  <view class="chat-input-box">
    <view class="input-top">
      <input type="text" v-model='inptext' />
      <button size="mini" @click="sendMessage">发送</button>
    </view>
    <view class="input-bottom">
      <uni-icons type="camera" size="30" @click='chooseImage'></uni-icons>
      <image class="input-bottom-img" :src="expressColor"  @click='expressionBoxShow'></image>
      <uni-icons type="plus" size="30" :color='fileColor' @click='fileBoxShow'></uni-icons>
    </view>
    <!-- 表情区域 -->
    <view class="input-hidden" v-if='expressionShow'>
      <image src="@/static/31.png"></image>
      <image src="@/static/37.png"></image>
      <image src="@/static/53.png"></image>
      <image src="@/static/78.png"></image>
    </view>
    <!-- 文件区域 -->
    <view class="input-hidden" v-if='fileShow'>
      <view class='input-hidden-item' @click='chooseImage'>
        <uni-icons type="camera-filled" size="50"></uni-icons>
        <text>拍摄</text>
      </view>
      <view class='input-hidden-item' @click='chooseFiles'>
        <uni-icons type="folder-add-filled" size="50"></uni-icons>
        <text>文件</text>
      </view>
      <view class='input-hidden-item'>
        <uni-icons type="phone-filled" size="50"></uni-icons>
        <text>语音通话</text>
      </view>

      
    </view>
  </view>
</template>

<script>
  export default {
    name:"chat-input",
    props:{
      cancellayer:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      cancellayer(newvalue){
        if(newvalue) {
          this.expressionShow=false
          this.fileShow=false
          this.$emit('changeMarginBottom',this.isshow)
        }
        this.$emit('changeCancellayer')
      }
    },
    data() {
      return {
        expressionShow:false,
        fileShow:false,
        inptext:''
      };
    },
    computed:{
      fileColor(){
        if(this.fileShow) return '#1296db'
        return 'gray'
      },
      expressColor(){
        if(this.expressionShow) return '../../static/expression2.png'
        return '../../static/expression.png'
      },
      isshow(){
        return this.expressionShow||this.fileShow
      }
    },
    methods:{
      // 发送信息
      sendMessage(){
        this.$emit('sendMessage',this.inptext)
        this.inptext=''
      },
      expressionBoxShow(){
        this.expressionShow=!this.expressionShow
        this.fileShow=false
        
        this.$emit('changeMarginBottom',this.isshow)
      },
      fileBoxShow(){
        this.fileShow=!this.fileShow
        this.expressionShow=false
        
        this.$emit('changeMarginBottom',this.isshow)
      },
      chooseImage(){
        uni.chooseMedia({
          count: 9,
          mediaType: ['image','video'],
          sourceType: ['album', 'camera'],
          maxDuration: 30,
          camera: 'back',
          success(res) {
            console.log(res.tempFiles)
          }
        })
      },
      chooseFiles(){
        wx.chooseMessageFile({
          count: 6, //默认100
          extension:['.zip','.doc'],
        	success: function (res) {
            console.log(res)
        		console.log(JSON.stringify(res.tempFiles));
        	}
        });
      }
    }
  }
</script>

<style lang="scss">
.chat-input-box{
  width: 100%;
  position: fixed;
  left: 0;
  bottom:0;
  background-color: #f4f4f4;
  padding:5px 10px;
  border-top:1px solid #efefef;
  
  .input-top{
    display: flex;
    justify-content: space-between;

    input{
      width:570rpx;
      height:40px;
      background-color: #fff;
      line-height: 40px;
      padding-left: 10px;
    }
    
    button{
      height:40px;
      background-color: skyblue;
      padding:0 30rpx;
      color:#fff;
      line-height: 40px;
    }
  }
  
  .input-bottom{
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding:5px 10px;
    padding-left: 0;
    
    .input-bottom-img{
      width:27px;
      height:27px;
    }
  }
  
  .input-hidden{
    width:100%;
    height:150px;
    display:flex;
    justify-content: space-around;
    flex-wrap: wrap;
    
    .input-hidden-item{
      height:50%;
      display: flex;
      align-items: center;
      flex-direction: column;
          flex-wrap: wrap;
    }
    
    image{
      height:30px;
      width:30px;
    }
  }
  
}
</style>