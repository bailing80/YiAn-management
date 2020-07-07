<template lang="html">
  
     <div class='pull-dou' @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend'>
        <div class='up-loading' v-el:uploading='' v-bind:class='{showing:state=="loading-up"}'>loading...</div>
               <slot></slot> 
        <div class='down-loading' v-el:downloading>{{state=='loading-down'?'加载中':'下滑加载更多'}}</div>
    </div>
</template>

<script>
export default {
  name:'scroll',
  
  attached: function() {
    this.init();
  },
  computed: {
    uploading: function() {
      return this.$els.uploading;
    },
    downloading: function() {
      return this.$els.downloading;
    },
    scrollEl: function() {
      return this.$el;
    }
  },
  data: function() {
    return {
      bottomReached: false,
      distanceIndex: 2,
      state: "",
      startY: 0,
      beforeDiff: 0,
      diff: 0,
      startScrollTop: 0
    };
  },

  props: {
    //下滑阈值
    triggerDistance: { default: 70 },
    triggerDistanceBottom: { default: 60 },
    topPull: {
      default: function(next) {
        setTimeout(next, 1200);
      }
    },
    bottomPull: {
      default: function(next) {
        setTimeout(next, 500);
      }
    }
  },
  methods: {
    checkBottomReached() {
      return (
        this.scrollEl.scrollTop + this.scrollEl.offsetHeight + 1 >=
        this.scrollEl.scrollHeight
      );
    },

    _endTopPull: function() {
      var m = this;
      m.state = "";
    },
    _endBottomPull: function() {
      var m = this;
      m.state = "";
    },

    touchstart(event) {
      this.startY = event.touches[0].clientY;
      this.beforeDiff = this.diff;
      this.startScrollTop = this.scrollEl.scrollTop;
      this.bottomReached = this.checkBottomReached();
    },
    touchmove(event) {
      var m = this;
      this.currentY = event.touches[0].clientY;
      this.distance =
        (this.currentY - this.startY) / this.distanceIndex + this.beforeDiff;
      this.direction = this.distance > 0 ? "down" : "up";

      if (this.startScrollTop === 0 && this.direction === "down") {
        event.preventDefault();
        event.stopPropagation();

        if (
          this.distance >= this.triggerDistance &&
          this.state !== "loading-up" &&
          this.state !== "loading-down"
        ) {
          this.state = "loading-up";
          this.topPull(m._endTopPull);
        }
      } else if (this.bottomReached && this.direction === "up") {
        if (this.state !== "loading-up" && this.state !== "loading-down") {
          this.state = "loading-down";
          this.bottomPull(m._endBottomPull);
        }
      }
    },
    touchend(event) {},
    init: function() {
      var m = this;
      m._up_height = m.uploading.offsetHeight;
      m._down_height = m.downloading.offsetHeight;
    }
  }
};
</script>
<style>
.pull-dou {
  height: 100%;
  overflow-y: auto;
  position: relative;
}
.pull-dou > .up-loading {
  line-height: 60px;
  text-align: center;
  width: 100%;
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.6s;
}
.pull-dou > .up-loading.showing {
  transform: translateY(0);
}

.pull-dou > .down-loading {
}
</style>