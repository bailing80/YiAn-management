 <template>
  <div class="container">
    <div class="firstMs" v-for="(item,index) in this.getMoreExpertList" :key="index">
      <p>{{item.content}}</p>
    </div>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
    <!-- 放在循环体下，当到此位置时会执行onInfinite方法 -->
  </div>
</template>
    <script type="text/ecmascript-6">
import InfiniteLoading from "vue-infinite-loading";
import baseUrl from "../../api/baseUrl.js";
export default {
  data() {
    return {
      getMoreExpertList: [], //用来存放数据的数组
      page_no: 1, //默认显示第一页数据
      page_size: 10 //每次请求7条
    };
  },
  components: {
    InfiniteLoading
  },
  methods: {
    getCourseList() {
      this.$Axios
        .get(
          baseUrl +
            "/customerService/queryContentList?page=" +
            this.page_no +
            "&size=" +
            this.page_size
        )
        .then(res => {
          if (res.data.code == 200) {
            // 如果查询结果为真
            if (res.data.data.list.length) {
              // 如果有数据则进入将新的数据与老的数据拼接
              // this.getMoreExpertList = res.data.data.list;
              this.getMoreExpertList = this.getMoreExpertList.concat(
                res.data.data.list
              );
              if(res.data.data.list.length > 0 ){
                 this.$refs.infiniteLoading.$emit("$InfiniteLoading:loaded");
              }else {
                 this.$refs.infiniteLoading.$emit("$InfiniteLoading:complete"); //没有数据显示没有更多
              }

              this.page_no += 1; //将页码加1
            } else {
              this.$refs.infiniteLoading.$emit("$InfiniteLoading:complete"); //没有数据显示没有更多
            }
          }
        })
        .catch(err => {
        });
    },
    onInfinite() {
      if (this.page_no != 1) {
        //是因为我在页面初始化时请求了第一页的数据，所以当页面等于2时才请求数据
        this.getCourseList();
      }
    }
  },
  created() {
    this.getMoreExpertList.length = 0;
    this.getCourseList();
  }
};
</script>
