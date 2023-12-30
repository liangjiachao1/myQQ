<template>
  <view>
    <!-- 消息区域 -->
    <view class='chat-message-box' @touchstart="touchStart" @touchend="touchEnd" :style='messagemarginbottom'>
      <you-chat-message></you-chat-message>
      <you-chat-message ismy='true'></you-chat-message>
      <you-chat-message></you-chat-message>
      <you-chat-message ismy='true'></you-chat-message>
      <you-chat-message></you-chat-message>
      <you-chat-message ismy='true'></you-chat-message>
      <you-chat-message></you-chat-message>
      <you-chat-message ismy='true'></you-chat-message>
    </view>
    <!-- 输入框区域 -->
    <chat-input @changeMarginBottom='changeMarginBottom' @changeCancellayer='changeCancellayer' :cancellayer='cancellayer'></chat-input>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        messagemarginbottom: 'padding-bottom: 100px;',
        touchStartX: 0, // 触屏起始点x  
        touchStartY: 0, // 触屏起始点y 
        cancellayer:false  //用来告诉子组件关闭弹层
      };
    },
    onShow() {
      this.arriveBottom()
    },
    computed: {},
    methods: {
      // 将视图移动到最底部
      arriveBottom() {
        this.$nextTick(() => {
          uni.createSelectorQuery().select('.chat-message-box').boundingClientRect((res) => {
            uni.pageScrollTo({
              scrollTop: res.height,
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