<template>
  <div>
    <el-row class="demo-autocomplete">
      <el-col :span="12">
        <el-autocomplete
          class="inline-input"
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import baseUrl from "../api/baseUrl.js";
export default {
  data() {
    return {
      restaurants: [],
      state1: ""
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      let arr = [];
      this.$Axios
        .post(baseUrl + "/customerAdmin/queryContactsByName", {
          id: "13e91d7021bc431097dd8e28a2bb06d2"
        })
        .then(res => {
          if (res.data.code == 200) {
            let data = res.data.data;
            for (let i = 0; i <= data.length - 1; i++) {
              arr.push({ value: data[i].contacts, phone: data[i].phone });
            }
          }
        })
        .catch(() => {});
      return arr;
    },
    handleSelect(item) {

    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
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
