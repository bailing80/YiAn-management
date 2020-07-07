<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">选择医院</p>
    </div>
    <div class="main">
      <div class="grabble">
        <input type="text" placeholder="请输入查询地区" >
        <i>
          <u></u>
        </i>
        <span @click="city">切换城市</span>
      </div>
      <div class="region">
        <p>热门城市</p>
        <ul class="list">
          <li
            v-for="(tuijians,tj_index) in tuijian"
            :key="tj_index"
            @click="saixuan(tj_index)"
          >{{tuijians.title}}</li>
        </ul>
      </div>
    </div>
    <div class="lstis" v-for="(item,index) in list01" :key="index">
      <h3 class="floor"  v-show="list01.length-1 != 0">{{item.name}}</h3>
      <ul>
        <li
          :class="{ac:i%2==0}"
          @click="xuanzhe(listsuju.text)"
          v-for="(listsuju,i) in item.list"
          :key="i"
        >{{listsuju.text}}</li>
      </ul>
    </div>
    <div class="dingwei_right">
      <ol class="xuhao">
        <li v-for="(No_num,num) in No" :key="num" @click="anchors(num)">{{No_num}}</li>
      </ol>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { nextTick } from 'q';
var _this;
export default {
  name: "repair",
  data() {
    return {
      // ------------------
      tuijian: [],
      list01: [],
      hospital: [
        {
          list: [
            {
              name: "A",
              list: [
                {
                  text: "河南创伤外科医院"
                },
                {
                  text: "衢州市华美整形医院"
                },
                {
                  text: "广元第三人民医院（原铁路医院）"
                },
                {
                  text: "云南星欣商贸有限公司"
                },
                {
                  text: "合肥市铁路医院"
                },
                {
                  text: "北京金卫润业商贸有限公司"
                },
                {
                  text: "黑龙江省军队医院"
                }
              ]
            },
            {
              name: "B",
              list: [
                {
                  text: "哈尔滨正通和经贸有限公司"
                },
                {
                  text: "丹东市元宝区第一医院"
                },
                {
                  text: "陕西捷康医疗有限公司"
                },
                {
                  text: "上海华美女子整形医院"
                },
                {
                  text: "威海港务局医院"
                },
                {
                  text: "温州市人民东路"
                },
                {
                  text: "新疆富蕴县人民医院"
                }
              ]
            },
            {
              name: "C",
              list: [
                {
                  text: "新疆阿不达乡卫生院"
                },
                {
                  text: "新疆阿克齐镇卫生院"
                },
                {
                  text: "新疆冲呼尔乡卫生院"
                },
                {
                  text: "新疆杜来提乡卫生院"
                },
                {
                  text: "新疆禾木哈纳斯乡卫生院"
                },
                {
                  text: "新疆吉木乃县人民医院"
                }
              ]
            },
            {
              name: "D",
              list: [
                {
                  text: "新疆阿不达乡卫生院"
                },
                {
                  text: "新疆阿克齐镇卫生院"
                },
                {
                  text: "新疆冲呼尔乡卫生院"
                },
                {
                  text: "新疆杜来提乡卫生院"
                },
                {
                  text: "新疆禾木哈纳斯乡卫生院"
                },
                {
                  text: "新疆吉木乃县人民医院"
                }
              ]
            },
            {
              name: "E",
              list: [
                {
                  text: "新疆阿不达乡卫生院"
                },
                {
                  text: "新疆阿克齐镇卫生院"
                },
                {
                  text: "新疆冲呼尔乡卫生院"
                },
                {
                  text: "新疆杜来提乡卫生院"
                },
                {
                  text: "新疆禾木哈纳斯乡卫生院"
                },
                {
                  text: "新疆吉木乃县人民医院"
                }
              ]
            },
            {
              name: "F",
              list: [
                {
                  text: "新疆阿不达乡卫生院"
                },
                {
                  text: "新疆阿克齐镇卫生院"
                },
                {
                  text: "新疆冲呼尔乡卫生院"
                },
                {
                  text: "新疆杜来提乡卫生院"
                },
                {
                  text: "新疆禾木哈纳斯乡卫生院"
                },
                {
                  text: "新疆吉木乃县人民医院"
                }
              ]
            }
          ]
        }
      ],
      remen: [
        { name: "A", title: "北京" },
        { name: "B", title: "上海" },
        { name: "C", title: "广州" },
        { name: "D", title: "河北" },
        { name: "E", title: "廊坊" },
        { name: "F", title: "深圳" },
        { name: "G", title: "天津" },
        { name: "H", title: "石家庄" }
      ],
      No: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  created() {
    _this = this;
    _this.list01 = _this.hospital[0].list;
    _this.tuijian = _this.remen;
    // axios.get('./data.json').then(res => {
    //       _this.list01 = res.data.hospital[0].list;
    //       _this.tuijian = res.data.hospital[1].remen;
    // })
  },
  methods: {
    
    // ---------------------------------------------------
    toback() {
      this.$router.push({
        path:'/userdetails'
      });
    },
    toyiyuan() {
      this.$router.push({
        path: "/custser"
      });
    },

    //切换城市
    city() {
      this.$router.push({
        path: "/city"
      });
    },
    xuanzhe(data) {
      if (this.$store.state.user.power == "0") {
        this.$store.commit("sethistoryName", data);
        this.$router.push({
          path: "/userdetails"
        });
      } else if (this.$store.state.user.power == "1") {
        
      }
    },
    //筛选
    saixuan(data) {
      // axios.get('./data.json').then( res => {
      //     _this.list01 = res.data.hospital[0];
      // })
    },
    anchors(n){
      
    }
  }

  }
 
</script>
<style scoped>
.dingwei_right {
  position: fixed;
  top: 1.2rem;
  bottom: 0;
  right: 0;
  text-align: center;
  justify-content: center;
  width: 0.5rem;
  display: flex;
  flex-direction: column;
}
.xuhao {
  font-size: 0.26rem;
  color: #919191;
  margin: 0;
  max-height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.xuhao li {
  height: 0.42rem;
  width: 0.25rem;
  margin: 0 auto;
}

.main {
  margin: 0 0.34rem 0.25rem;
}
.grabble {
  width: 100%;
  margin: 0.16rem 0;
  height: 0.96rem;
}
.grabble input {
  width: 4.45rem;
  height: 0.96rem;
  border: 0.01rem #b8b8ba solid;
  line-height: 0.96rem;
  font-size: 0.25rem;
  padding-left: 0.25rem;
  float: left;
}
.grabble i {
  display: block;
  float: left;
  width: 0.83rem;
  height: 0.98rem;
  line-height: 0.96rem;
  background: #919191;
  position: relative;
}
.grabble i u {
  display: block;
  width: 0.33rem;
  height: 0.37rem;
  position: absolute;
  top: 0.34rem;
  left: 0.26rem;
  background: url("../../assets/b_fadajing.png") no-repeat;
  background-size: 100% 100%;
}
.grabble span {
  color: #592d8d;
  font-size: 0.26rem;
  line-height: 0.96rem;
  height: 0.96rem;
  float: left;
  margin-left: 0.16rem;
}

.region {
  position: relative;
  width: 6.11rem;
  height: 1.8rem;
  background: #fff;
  padding: 0.69rem 0.34rem 0.4rem 0.34rem;
}
.region p {
  position: absolute;
  top: 0.28rem;
  left: 0.27rem;
  font-size: 0.25rem;
  color: #919191;
}
.region .list li {
  width: 1.23rem;
  height: 0.62rem;
  line-height: 0.62rem;
  text-align: center;
  margin: 0.14rem;
  float: left;
  background: #dcdcdc;
  font-size: 0.25rem;
}

.lstis h3 {
  width: 7.16rem;
  height: 0.97rem;
  background: #fff;
  font-size: 0.28rem;
  color: #000;
  line-height: 0.97rem;
  padding-left: 0.34rem;
  font-weight: 500;
}
.lstis ul li {
  width: 7.16rem;
  height: 0.97rem;
  background: #fff;
  font-size: 0.28rem;
  color: #000;
  line-height: 0.97rem;
  padding-left: 0.34rem;
}
.lstis .ac {
  background: #f2f3f7;
}
.pointer-event {
  pointer-events: none;
}
</style>

