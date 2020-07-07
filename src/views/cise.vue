<template>
  <div>
    <swiper :options="swiperOption" class="daxiongmao">
      <swiper-slide>
        <div class="swiper-zoom-container">
          <img src="../assets/index/bg.jpg" alt class="tpimg" />
          <pdf class="mosmoosl" v-for="i in numPages" :key="i" :page="i" :src="pdfImg"></pdf>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  data() {
    return {
      swiperOption: {
        zoom: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      pdfImg: "",
      numPages: []
    };
  },
  components: {
    pdf
  },
  props: {
    pdfimglist: String
  },
  watch: {
    pdfimg() {
      this.pdfImg = this.pdfimglist;
      pdf.createLoadingTask(this.pdfImg).then(pdf => {
        this.numPages = pdf.numPages;
      });
    }
  },
  created() {},
  mounted() {
    this.lsit();
  },
  methods: {
    lsit() {
      this.pdfImg = "/pdf/special4eebc44400354debb62310cc6e8b15fe.pdf";
      pdf.createLoadingTask(this.pdfImg).then(pdf => {
        this.numPages = pdf.numPages;
      });
    }
  },
  destroyed() {}
};
</script>
<style scoped>
.daxiongmao {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 7.5rem;
  height: calc(100% - 2rem);
}
.tpimg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.mosmoosl {
  max-width: 100%;
  max-height: 100%;
}
</style>
