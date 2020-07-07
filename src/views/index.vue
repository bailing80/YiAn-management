<template>
  <div >
    <canvas class='firstCanvas'
            canvas-id="firstCanvas"
            @touchmove='move'
            @touchend='end'
            @error="error"
            disable-scroll='true'>
    </canvas>
    <div class="operate-btn">
      <div class="button" @click='clearClick()'>清除</div>
      <div class="button" @click='saveClick()' >保存</div>
    </div>
  </div>
</template>
 
<script>
  let content = null;
  let touchs = [];
  let canvasw = 0;
  let canvash = 0;
  // wx.getSystemInfo({
  //   success: function (res) {
  //     canvasw = res.windowWidth;
  //     canvash = canvasw*9/16;
  //   },
  // });
  export default {
    data(){
      return {
        signImage : '',
      }
    },
    onLoad () {
      content = wx.createCanvasContext('firstCanvas',this);
      content.setStrokeStyle("#000000");
      content.setLineWidth(5);
      content.setLineCap('round');
      content.setLineJoin('round')
    },
    methods:{
      error(e){
        wx.showModal({
          title:"yes11"
        });
      },
      move(e) {
        let point = {x: e.touches[0].x, y: e.touches[0].y};
        touchs.push(point);
        if(touchs.length >= 2) {
          this.draw(touchs)
        }
      },
      end(e){
        for (let i = 0 ;i < touchs.length;i++ ){
          touchs.pop()
        }
      },
      clearClick() {
        content.clearRect(0,0,canvasw,canvash);
        content.draw(true)
      },
      saveClick() {
        let that = this;
        wx.canvasToTempFilePath({
          canvasId: 'firstCanvas',
          success:function(res) {
            that.signImage = res.tempFilePath;
            that.$emit("success",that.signImage);
          }
        },this)
      },
      draw(touchs) {
        let point1 = touchs[0];
        let point2 = touchs[1];
        touchs.shift();
        content.moveTo(point1.x, point1.y);
        content.lineTo(point2.x, point2.y);
        content.stroke();
        content.draw(true);
      }
    }
  }
</script>
 
<style scoped>
  .firstCanvas {
    background-color: #fff;
    width: 100%;
    height: 200px;
  }
  .operate-btn{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .button{
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 30rpx;
    text-align: center;
    color: deepskyblue;
    border-radius: 0;
    background-color: #fff;
    border-top: 1px solid #ddd;
    outline: none;
  }
  .button:first-of-type{
    border-right: 1px solid #ddd;
  }
  .button:last-of-type{
    border-left: 1px solid #ddd;
  }
</style>