<template>
    <div class="box">
       <div class="header">
           <i class="icon" @click="toback"></i><p class="title">职务</p>
       </div>
       <div class="lstis">
           <p @click="qingkong">代理他人报修</p>
           <ul>
               
              <li @click="xuanzhe(index)"  v-for="(itme,index) in list[0].list1" :key="index">{{itme.name}}<i>{{itme.title}}</i><u></u></li>
              <li>名称<input type="text" placeholder="请输入名称" v-model="list[0].mingchen"></li>
              <li>电话<input type="text" placeholder="请输入电话" v-model="list[0].phone"></li>
           </ul>
       </div>
        <div class="sendbtn mt3" @click="toconfirmrepair">下一步</div>
        <div class="model" v-show="!bool">
            <div class="bg_yanse"></div>
            <div class="slots_list" :class="{demo_transform3:!bool,demo_transform4:bool}">
                <h2>{{title}}</h2>
                <span  @click="queding">确定</span>
                <mt-picker :slots="slots"  @change="onValuesChange"></mt-picker>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'position',
    data(){
        return {
          title_num01:'',
          title_num02:'',
          values:'',
          bool:'false',
          title:'',
          list:[
              {
                  list1:[
                      {'name':'北京协和医院','title':''},
                      {'name':'外科','title':''},
                      {'name':'职务','title':''},
                  ],
                  mingchen:'',
                  phone:''
              }
          ],
          list1:['北京协和医院', '中国人民解总医院', '中国解放绝总医院', '人民解放绝总医院', '北京协和医院1'],
          list2:['超声科', '多功能科', '儿科', '放射科', '风湿科', '骨科','肝胆外科','肛肠科','呼吸科','化疗科'],
          list3:['办公室主任', '处长', '党委书记', '副经理', '副科长', '护士','护士长','护理员','经理','技术员'],
          slots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slots',
                    textAlign: 'center'
                }
            ]
        }
    },
    methods:{
        toback(){
            this.$router.go(-1);
        },
        toconfirmrepair(){
            this.$router.push({
                path: "/confirmrepair"
            });
        },

        onValuesChange(picker, values) {
            this.values = values[0];
        },
        xuanzhe(n){
            if(n==0){
                this.title='选择医院',
                this.slots[0].values = this.list1;
            }else if(n==1){
                this.title='选择外科';
                this.slots[0].values = this.list2;
            }else if(n==2){
                this.title='选择职务';
                this.slots[0].values = this.list3;
            }
            this.bool = !this.bool;
            this.title_num01 = n
        },
        queding(){

            if(this.title_num01==0){
                this.list[0].list1[0].title = this.values;
            }else if(this.title_num01==1){
                this.list[0].list1[1].title = this.values;
            }else if(this.title_num01==2){
                this.list[0].list1[2].title = this.values;
            }

            this.bool = !this.bool
        },


        //清空页面数据
        qingkong(){
            this.list[0].list1[0].title = '';
            this.list[0].list1[1].title = '';
            this.list[0].list1[2].title = '';
            this.list[0].mingchen = '';
            this.list[0].phone = '';
        }
        
    }
}
</script>

<style>
.model {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 7.5rem;
    height: 100%;
    z-index: 9999;
}
.bg_yanse {
    width: 100% ;
    height: 100%;
    background: #000;
    opacity: .5;
}


.slots_list{
    width: 7.5rem;
    background: #fff;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
}
.slots_list h2{
    font-size: .4rem;
    line-height: 1rem;
    height: 1rem;
    font-weight: 500;
}
.slots_list span{
    width: 1.5rem;
    height: .4rem;
    font-size: .3rem;
    position: absolute;
    top: .3rem;
    right: 0;
}



.demo_transform3{
    animation: zhankai .3s ease-in both;
}
.demo_transform4{
    animation: shouqi .3s ease-in both;
}

.picker-slot.picker-slot-right {
    text-align: center;
}




@keyframes shouqi {
  0% {
      transform: translate(0,0);
  }
  100% {
      transform: translate(0,200px);
  }
}
@keyframes zhankai {
  0% {
      transform: translate(0,200px);
  }
  100% {
      transform: translate(0,0);

  }
}
</style>



<style scoped>

.main{
    margin: 0 .34rem;
}

.lstis p{
    height: 1.03rem;
    width: 7.15rem;
    padding-right: .35rem;
    text-align: right;
    font-size: .26rem;
    color: #592d8d;
    line-height: 1.03rem;
}
.lstis ul li i{
    position: absolute;
    top: 0;
    left: 2.4rem;
    width: 4.5rem;
    line-height: .97rem;
    height: .97rem;
    font-size: .3rem;
    color: #919191;
    text-align: right;
}
.lstis ul li input{
    position: absolute;
    top: 0;
    left: 2.4rem;
    width: 4.5rem;
    line-height: .97rem;
    height: .97rem;
    font-size: .3rem;
    color: #919191;
    text-align: right;
    
}

input::-webkit-input-placeholder {
    color: #919191;
}

.lstis ul li{
    width: 7.16rem;
    height: .97rem;
    background: #fff;
    font-size: .28rem ;
    color:#000;
    line-height: .97rem;
    padding-left: .34rem;
    margin-bottom: .17rem;
    border:.01rem #e3e3e4 solid;
    border-left: none;
    border-right: none;
    position: relative;
}

.lstis ul li u{
   display: block;
   width: .17rem;
   height: .28rem;
   background: url('../../assets/arrow_r.png')no-repeat;
   background-size: 100% 100%;
   position: absolute;
   top: .35rem;
   right: .35rem;
}
.lstis ul .ac{
    background: #f2f3f7;
}


.mt3 {
    margin: 2rem 0 1rem .35rem;
}




</style>

