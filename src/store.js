import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';
import { Toast } from "mint-ui";
import baseUrl from "./api/baseUrl.js";
import Cookie from './api/cookie.js';

Vue.use(Vuex)

//选择医院

//选择医院
export default new Vuex.Store({
  state: {
    token:'',
    ProductPictures:[
      {
        applyType:'WX',//类型  
        name:'麻醉机',
        type:'mz',
        img:require('./assets/Layout/anaesthesia.png'),
      },
      {
        name:'呼吸机',
        type:'hx',
        img:require('./assets/Layout/respirator.png'),
      },
      {
        name:'手术床',
        type:'ssc',
        img:require('./assets/Layout/OperatingBed.png'),
      },
      {
        name:'无影灯',
        type:'wyd',
        img:require('./assets/Layout/Shadowlesslamp.png'),
      },
      {
        name:'吊塔',
        type:'dt',
        img:require('./assets/Layout/Towercrane.png'),
      },
      {
        name:'吊桥',
        type:'ta',
        img:require('./assets/Layout/TowerBridge.png'),
      },
      {
        name:'空压机',
        type:'ky',
        img:require('./assets/Layout/compressor.png'),
      },{
        name:'蒸发罐',
        type:'zfg',
        img:require('./assets/Layout/Evaporationtank.png'),
      },{
        name:'升温毯',
        type:'swt',
        img:require('./assets/Layout/Heatingblanket.png'),
      }
      ,{
        name:'监护仪',
        type:'jhy',
        img:require('./assets/Layout/monitor.png'),
      }
      // ,{
      //   name:'净化',
      //   type:'ta',
      //   img:require('./assets/Layout/Purify.png'),
      // }



      
    ],
    
    // 工单类型
    WorkOrderType:[
      {
        applyType:'WX',//类型  
        img:require('./assets/type/wx.png'),
      },
      {
        applyType:'AZ',//类型  
        img:require('./assets/type/az.png'),
      },
      {
        applyType:'HF',//类型  
        img:require('./assets/type/hf.png'),
      },
      {
        applyType:'PX',//类型  
        img:require('./assets/type/px.png'),
      },
      {
        applyType:'ZX',//类型  
        img:require('./assets/type/zx.png'),
      }
     
    ],//

    //员工
    repairorder:{
      proID:"",//第一个产品Id
      ClassList:[],//多个设备号
      customerId:'',//客户id
      repairorderId:'',//员工编号
      repaiNameshow:"",//员工用户名
      signPic:'',//头像
      repaiName:'',//员工名称
      repaiPhone:'',//员工电话
      ApplicationType:'', //申请类型
      ApplicationType_id:'', //申请类型id
      DeviceNumber:"", //设备号
      DeviceType:[], 
      modelNumber:'',//机型
      modelNumber_id:'',//机型编码
      productLine:'', //产品线
      productLine_id:'', // //产品线 id
      level:'',  //级别
      time:new Date().getFullYear()+'-'+(new Date().getMonth() <9 ? '0'+parseInt(new Date().getMonth()+1):new Date().getMonth()+1)+'-'+  (new Date().getDate() <9 ? '0'+parseInt(new Date().getDate()+1) :new Date().getDate()),//时间
      repaiProvince:'',// 员工 省份
      image: "", //
      video: "", //视频
      
      // ===================================
      name:'',//医院或者渠道名称
      customer_code:'',//客户编码
      address:'',//地址
      country:'',//国家
      city:'',//城市
      province:'',//省份
      customer_level:'',//代理级别
      customer_level_id:'',//代理级别id

      customer_service_level:'',//客户服务等级
      zip_code:'',//邮编
      use_department:'',//使用科室
      customerType:'',//客户类型
      contact:'',//联系人
      contactPhone:'',//联系人电话
      position:'',//职位

      // ===================================
      isshifu:'',//是否更换配件
      solution:'',//解决方法
      accessories:'',//配件名称
      MaterialCode:'',//物料编码
      serviceContent:'',//服务内容
      repairWhy:''//报修原因
    },

    //用户信息
    is_ajax:true,
    Isregistered:'',
    letter:{
      "user":{
        
        power:'', //权限
        user_id:'', //'用户id(医院)',
        phone:'',//电话
        hospital_name:'',//医院名称
        channel_level:'', //代理级别
        channelLevel_id:'', //代理级别id
        department:'',//科室名称
        department_id:'', //科室id
        position:'',//职位名称
        position_id:'',//职位id
        name:'',//用户名称
        sex:'',//用户性别
        channel_name:'',//代理商名称
        is_signing:'0',//是否签约 0不是 1是
        contacts_name:'',//联系人名称
        userType:'',//医院   类型  0医院 1个人
        time:'',//预约时间
        personaladdress:'',//个人地址
        application:"",//申请类型 （医院提报）
        applicationid:"",//申请类型ID
      },
      "history":{
        customerId:'',//客户ID
        customer_code:'',//客户编码
        city:'',//城市
        province:'',//省份
        customer_level:'',//'终端客户级别'
        
        customer_service_level:'',//'客户服务等级'
        address:'',//'地址'
        zip_code:'',//'邮编'
        use_department:'',//'使用科室'
        customer_type:'',//'终端客户类型'
        country:'',//'国家'
        is_register:'',//'是否主动注册(0否  1是)',
        productLine:'',//产品线  个人登录
        productLine_id:'',
        model:'',//设备机型
        model_id:'',//设备机型id
        buy_date:'',//购买日期
      },
    },

    //产品报修 
    DeviceTypeIndex:'', //切换 - 第几组产品机型ID
    FaultTypeIndex:'',  //切换 - 第几组产品故障ID
    ClassList: [    //  数据 
      {
        list: [],    //设备号数组
        shebeihao_class: "", //输入时的设备号
        productLine:"",  //产品线
        productLine_id:"",  //产品线id
        title: "", //
        models:[], //机型
        type: "", //类型
        type_id: "", //类型id
        content: "",  //描述
        coding:"",//  物料编码
      }
    ],
  },
  mutations: {
    //publicData  回访数据
    setpublicData(state,c){
      state.publicData.HospitalName = c.applyJobGroupInfo.customerName;
      state.publicData.useDepartment =  c.applyJobGroupInfo.useDepartment;
      state.publicData.model = c.productInfo[0].model;
      state.publicData.deviceId =   c.productInfo[0].deviceId;
      state.publicData.installDate = c.productInfo[0].installDate;
    },

    //员工报修 0-------------------------------------------------------
    // 申报类型
    setApplicationType(state,c){
      state.repairorder.ApplicationType = c.name;
      state.repairorder.ApplicationType_id = c.id
    },
    //检查  设备号是否存在

    //员工报修产品线
    repairorderLine(state,c){
      state.repairorder.productLine = c.productLine;
      state.repairorder.productLine_id = c.productLine_id;
    },
    //员工报修机型
    setmodelNumber(state,c){
      state.repairorder.modelNumber = c.productLine;
      state.repairorder.modelNumber_id = c.productLine_id;
    },
    

    //设备号
    setDeviceNumber(state,c){
      state.repairorder.DeviceNumber = c;
    },

    //医院信息 或  渠道信息 
    repairorderName(state,c){
      Axios.post(baseUrl + "/dicCode/queryDicByMoreType?type=CUSTOMER_LEVEL").then(function(response) {
        for(let i = 0 ;i <= response.data.data.length-1; i++){
            if(c.customerLevel == response.data.data[i].value){
              state.repairorder.customer_level = response.data.data[i].lable;
           }
        }
        }).catch(function(error) {});
      state.repairorder.contact = c.contacts   //联系人
      state.repairorder.contactPhone = c.phone //联系人电话
      state.repairorder.level = c.customerLevel//级别
      state.repairorder.customerId = c.id//id
      state.repairorder.name = c.customerName;//客户名称  （医院名称）
      state.repairorder.customer_code = c.customerCode; //客户编码
      state.repairorder.address = c.address;//地址
      state.repairorder.country = c.country  // 国家
      state.repairorder.city = c.city //城市
      state.repairorder.province = c.province // 省份
      state.repairorder.customer_level_id = c.customerLevel //代理级别
      state.repairorder.customer_service_level = c.customerServiceLevel //客户服务等级
      state.repairorder.address = c.address //地址
      state.repairorder.zip_code = c.zipCode //邮编
      state.repairorder.use_department = c.useDepartment //使用科室
      state.repairorder.customerType = c.customerType //客户类型
    },
    //是否更换配件
    setisshifu(state,c){
      state.repairorder.isshifu = c;
    },

    //配件名称
    setaccessories(state,c){
      state.repairorder.accessories = c ;
    },
    //物料编码
    setMaterialCode(state,c){
      state.repairorder.MaterialCode = c;
    },

    //解决方法
    setsolution(state,c){
      state.repairorder.solution = c;
    },

    //服务内容
    setserviceContent(state,c){
      state.repairorder.serviceContent = c;

    },

    //报修原因
    setrepairWhy(state,c){
      state.repairorder.repairWhy = c;
    },

    //员工存数据
    setemployees(state,n){
      
      Cookie.setCookie('repairorderId',n.staffId) //ID
      Cookie.setCookie('repaiNameshow',n.userName) //ID
      Cookie.setCookie('repaiName',n.staffName) //员工名称
      Cookie.setCookie('signPic',n.signPic) //员工名称
      Cookie.setCookie('repaiPhone',n.phone) //电话
      Cookie.setCookie('repaiProvince',n.province) //员工省份

    },
    //员工获取数据
    getemployees(state){
      state.token  = Cookie.getCookie('token') ;

      state.repairorder.repairorderId = Cookie.getCookie('repairorderId')   //员工编号  或 id
      state.repairorder.repaiNameshow = Cookie.getCookie('repaiNameshow')   //员工编号  或 id
      state.repairorder.repaiName = Cookie.getCookie('repaiName')   //员工名称
      state.repairorder.signPic = Cookie.getCookie('signPic')   //员工头像
      state.repairorder.repaiPhone = Cookie.getCookie('repaiPhone')   //员工电话
      state.repairorder.province = Cookie.getCookie('repaiProvince')  //员工省份
    },

//-------------------------------------------------------------
    //设备机型
    DeviceType(state,data){
      state.ClassList[state.DeviceTypeIndex].models = data;
    },
    //设备类型
    FaultType(state,data){
      state.ClassList[state.FaultTypeIndex].type = data.lable;
      state.ClassList[state.FaultTypeIndex].type_id = data.value;
    },
    //加组
    ClassList_plus(state) {

      // if(state.ClassList.length-1 > 2){
      //   Toast('每条工单最多四个产品类型');
      //   return;
      // }

      state.ClassList.push({
        list: [],    //设备号数组
        shebeihao_class: "", //输入时的设备号
        productLine:"",  //产品线
        productLine_id:"",  //产品线id
        title: "", //
        models: [], //机型
        type: "", //类型
        content: "",  //描述
        coding:"",//  物料编码
      });
    },
    //减组
    ClassList_minus(state) {
      if (state.ClassList.length - 1 == 0) return;
      state.ClassList.splice(state.ClassList.length - 1, 1);
    },
//---------------------------------------------------------

      // 医院  --  查类型
    Qeruyhospital(state,c){
                             
        Axios.post(baseUrl + "/dicCode/queryDicByMoreType?type="+c.type1+','+c.type2).then(function(response) {
            for(let i = 0 ;i <= response.data.data.length-1; i++){
               if(c.type1 == response.data.data[i].type){
                if(c.position_id == response.data.data[i].value){
                  state.letter.user.position  = response.data.data[i].lable
                }
               }
               if(c.type2 == response.data.data[i].type){
                if(c.department_id == response.data.data[i].value){
                  state.letter.user.department  = response.data.data[i].lable
                }
               }
            }
            }).catch(function(error) { 
               
            });
    },


    // 家庭  --  查类型
    Qeruyfamily(state,c){

      Axios.post(baseUrl + "/dicCode/queryDicByMoreType?type="+c.type1+','+c.type2).then(function(response) {
          for(let i = 0 ;i <= response.data.data.length-1; i++){
            if(c.type1 == response.data.data[i].type){
              if(c.productLine_id == response.data.data[i].value){
                state.letter.history.productLine = response.data.data[i].lable
              }
            }
            if(c.type2 == response.data.data[i].type){
             if(c.model_id == response.data.data[i].value){
              state.letter.history.model  = response.data.data[i].lable
             }
            }
         }
        }).catch(function(error) {
         });
    },

    // 代理商
    Qeruyregister(state,c){
      Axios.post(baseUrl + "/dicCode/queryDicByMoreType?type="+c.type1+','+c.type2).then(function(response) {
          for(let i = 0 ;i <= response.data.data.length-1; i++){
            if(c.type1 == response.data.data[i].type){
              if(c.channelLevel_id == response.data.data[i].value){
                state.letter.user.channel_level  = response.data.data[i].lable
              }
            }
            if(c.type2 == response.data.data[i].type){
             if(c.position_id == response.data.data[i].value){
              state.letter.user.position  = response.data.data[i].lable
             }
            }
         }
        }).catch(function(error) {});
    },



    //设置token
    settoken(state, c){
      state.token = c;
      Cookie.setCookie('token',c,1);
    },

    //用户类型
    setuserType(state, c) {
      state.letter.user.userType = c;
      Cookie.setCookie('userType',c);
    },
    //用户名称
    setName(state, c) {
      state.letter.user.name = c
      Cookie.setCookie('name',c)
    },
    //用户名称
    setchannelname(state, c) {
      state.letter.user.contacts_name = c ;
      Cookie.setCookie('contactsName',c)
    },

    //家庭用户 地址 
    setaddress(state, c){
      state.letter.history.personaladdress = c;
      Cookie.setCookie('personaladdress',c)
    },


    //用户   --  医院名称
    sethistoryName(state, c) {
      state.letter.history.customerId = c.id   //客户id
      state.letter.user.hospital_name = c.customerName;//客户名称  （医院名称）
      state.letter.history.customer_code = c.customerCode; //客户编码
      state.letter.history.address = c.address;//地址
      state.letter.history.country = c.country  // 国家
      state.letter.history.city = c.city //城市
      state.letter.history.province = c.province // 省份
      state.letter.history.customer_level = c.customerLevel //代理级别
      
      state.letter.history.customer_service_level = c.customerServiceLevel //客户服务等级
      state.letter.history.zip_code = c.zipCode //邮编
      state.letter.history.use_department = c.useDepartment //使用科室
      state.letter.history.customerType = c.customerType //客户类型
    },

    //代理商名称
    setchannelName(state, c){
      
      state.letter.history.customerId = c.id   //客户id
      state.letter.user.channel_name = c.customerName;//客户名称  （医院名称）
      state.letter.history.customer_code = c.customerCode; //客户编码
      state.letter.history.address = c.address;//地址
      state.letter.history.country = c.country  // 国家
      state.letter.history.city = c.city //城市
      state.letter.history.province = c.province // 省份
      state.letter.history.customer_level = c.customerLevel //代理级别
      state.letter.history.customer_service_level = c.customerServiceLevel //客户服务等级
      state.letter.user.address = c.address //地址
      state.letter.history.zip_code = c.zipCode //邮编
      state.letter.history.use_department = c.useDepartment //使用科室
      state.letter.history.customerType = c.customerType //客户类型
      // state.letter.user.isRegister = Cookie.getCookie('isRegister');//是否主动注册
    },
    //代理商级别
    setchannelLevel(state, c){
       state.letter.user.channel_level = c.channelLevel;
       state.letter.user.channelLevel_id = c.channelLevel_id;
    },
   

    
    

    //家庭产品线
    setproductLine(state, c){
      state.letter.history.productLine = c.productLine;
      state.letter.history.productLine_id = c.productLine_id;
   },
    //家庭型号
    setmodelid(state, c){
      state.letter.history.model = c.model;
      state.letter.history.model_id = c.model_id;
   },
   //修改家庭  购买时间
   setbuyDate(state, c){
    state.letter.history.buy_date = c;
 },
    
    //用户手机号
    setPhone(state, phone){
      state.letter.user.phone = phone;
      Cookie.setCookie('phone',phone)
    },
    //科室
    setdepartment(state,n){
      state.letter.user.department = n.lable ;
      state.letter.user.department_id = n.value; 
    },
    //职位
    setjob(state,n){
      state.letter.user.position = n.lable;
      state.letter.user.position_id =  n.value;
    },
    //性别
    setsex(state,n){
      state.letter.user.sex = n;
      Cookie.setCookie('sex',n)
    },
    //是否签约 
    setisSigning(state,n){
      state.letter.user.is_signing = n;
    },
    //当前登录用户id 
    setuserId(state,n){
      state.letter.user.user_id = n;
    },
    //报修预约时间
    settime(state,n){
      state.letter.user.time = n;
    },
    //医院报修类型  
    setapplication(state,n){
      state.letter.user.application = n.name;
      state.letter.user.applicationid = n.id;
      
    },

    
    //进行医院选择 Isregistered   
    setIsregistered(state,n){
      Cookie.setCookie('Isregistered',n);
    },
    //进行科室选择 ID   
    setIsdepartment(state,n){
      Cookie.setCookie('Isdepartment',n);
    },
    //进行职位选择 ID 
    setIsposition(state,n){
      Cookie.setCookie('Isposition',n);
    },
    

    //存储医院信息
    setCookie(state,n){
      if( Cookie.getCookie('avatar')==0){
         //医院的
        Cookie.setCookie('hospitalName',n.hospitalName) //医院 名称
        Cookie.setCookie('department_id',n.department) //科室
        Cookie.setCookie('customerLevel',n.customerLevel) //客户终端级别

        Cookie.setCookie('name',n.name) //联系人名称
        Cookie.setCookie('model',n.model) //设备机型
        Cookie.setCookie('productLine',n.productLine) //产品线
        // Cookie.setCookie('buyDate',n.buyDate) //联系人名称
        Cookie.setCookie('userType',n.userType) //医院类型  0医院  1个人 
      }else if(Cookie.getCookie('avatar')==1){
        //渠道的
        Cookie.setCookie('channelName',n.channelName) //代理商名称
        Cookie.setCookie('channelLevel_id',n.channelLevel) //代理级别id
        Cookie.setCookie('isSigning',n.isSigning) //是否签约 
        Cookie.setCookie('contactsName',n.contactsName) //联系人名称
      }else if(Cookie.getCookie('avatar')==3){
        //个人的
        Cookie.setCookie('name',n.name) //联系人名称
        Cookie.setCookie('productLine_id',n.productLine) //产品线 
        Cookie.setCookie('model_id',n.model) //代理级别 
        Cookie.setCookie('buyDate',n.buyDate) //是否签约 
        Cookie.setCookie('userType',n.userType) //医院类型  0医院  1个人
        Cookie.setCookie('personaladdress',n.address) //个人地址

      }
      

      //共有的连接
      Cookie.setCookie('userId',n.userId) //ID
      Cookie.setCookie('customerId',n.customerId) //客户ID 
      Cookie.setCookie('phone',n.phone) //电话
      Cookie.setCookie('position_id',n.position) //职位
      Cookie.setCookie('sex',n.sex) //性别
      Cookie.setCookie('customerCode',n.customerCode) //客户编码
      Cookie.setCookie('city',n.city) //城市
      Cookie.setCookie('province',n.province) //省份
      Cookie.setCookie('customerServiceLevel',n.customerServiceLevel) //客户服务等级
      Cookie.setCookie('address',n.address) //地址
      Cookie.setCookie('zipCode',n.zipCode) //邮编
      Cookie.setCookie('useDepartment',n.useDepartment) //使用科室
      Cookie.setCookie('customerType',n.customerType) //终端客户类型
      Cookie.setCookie('country',n.country) //城市
      // Cookie.setCookie('isRegister',n.isRegister) //是否主动注册

    },

    getCookieUser(state){
      state.token  = Cookie.getCookie('token')
      
      state.letter.history.customerId = Cookie.getCookie('customerId')
      state.letter.user.user_id = Cookie.getCookie('userId');//用户ID
      state.letter.user.phone = Cookie.getCookie('phone');//用户电话
      state.letter.user.position_id = Cookie.getCookie('position_id');//职位id
      state.letter.history.customer_code = Cookie.getCookie('customerCode');
      state.letter.history.city = Cookie.getCookie('city');
      state.letter.history.province = Cookie.getCookie('province');
      state.letter.history.customer_service_level = Cookie.getCookie('customerServiceLevel');
      state.letter.history.address = Cookie.getCookie('address');//地址
      state.letter.history.zip_code =Cookie.getCookie('zipCode');
      state.letter.history.use_department =Cookie.getCookie('useDepartment');
      state.letter.history.customerType =Cookie.getCookie('customerType');
      state.letter.history.country =Cookie.getCookie('country');
      // state.letter.user.isRegister = Cookie.getCookie('isRegister');//是否主动注册
      if( Cookie.getCookie('avatar')==0){
        //医院的
        state.letter.user.name = Cookie.getCookie('name');//用户名
        state.letter.user.hospital_name = Cookie.getCookie('hospitalName');//医院名称
        state.letter.user.department_id =Cookie.getCookie('department_id');//科室id
        state.letter.history.customer_level =Cookie.getCookie('customerLevel'); //终端客户级别
      }else if(Cookie.getCookie('avatar')==1){
        //渠道
        state.letter.user.channel_name  = Cookie.getCookie('channelName'); //代理商名称
        state.letter.user.channelLevel_id = Cookie.getCookie('channelLevel_id');//代理级别id
        state.letter.user.is_signing  = Cookie.getCookie('isSigning'); //是否签约 
        state.letter.user.contacts_name = Cookie.getCookie('contactsName'); //联系人名称
      }else if(Cookie.getCookie('avatar')==3){
        //家庭
        state.letter.user.name = Cookie.getCookie('name');//用户名
        state.letter.history.productLine_id = Cookie.getCookie('productLine_id')//产品线  个人登录
        state.letter.history.model_id = Cookie.getCookie('model_id')    //设备机型
        state.letter.history.buy_date = Cookie.getCookie('buyDate') //购买日期
        state.letter.user.personaladdress = Cookie.getCookie('personaladdress'); //个人地址
      }
    },
 
  },
  actions: {

  }
})
