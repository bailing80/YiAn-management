import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  // srcollBehavior(to,from,savedPosition){
  srcollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  },
  routes: [
    //文件
    {
      path: '/TimeComponent',
      name: 'TimeComponent',
      component: resolve => require(['@/components/workorder/TimeComponent'], resolve)
    },
    // //文件
    // {
    //   path: '/fill',
    //   name: 'fill',
    //   component:() => import( './components/staff/fill.vue')
    // },

    // //pdf文件
    // {
    //   path:'/pdf',
    //   name:'pdf',
    //   component:()=> import ('./views/pdf.vue')
    // },


    // {
    //   path: '/index',
    //   name: 'index',
    //   component: () => import( './views/index.vue')
    // },
    //登录
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login'], resolve)
    },
    //是否登录过
    {
      path: '/islogin',
      name: 'islogin',
      component: resolve => require(['@/components/islogin'], resolve)
    },
    //登录
    {
      path: '/cesi',
      name: 'cesi',
      component:resolve => require(['@/views/cise'],resolve)
    },


    //微信客服  完
    {
      path: '/',
      name: 'wechatserve',
      component: resolve => require(['@/views/WeChatServe'], resolve)
    },

    //客服登录  渠道   员工
    {
      path: '/userlogin',
      name: 'userlogin',
      component: resolve => require(['@/components/userLogin'], resolve)

    },
    //个人信息  完   修改手机
    // {
    //   path: '/usertion',
    //   name: 'usertion',
    //   component: () => import( './views/usertion.vue')
    // },

    // 注册信息表

    {
      path: '/registerlogin',
      name: 'registerlogin',
      component: resolve => require(['@/components/registerLogin'], resolve)
    },
    //修改个人信息
    {
      path: '/registerupdate',
      name: 'registerupdate',
      component: resolve => require(['@/components/registerupdate'], resolve)
    },

    //提报工单  完
    {
      path: '/repairorder',
      name: 'repairorder',
      component: resolve => require(['@/components/repairorder'], resolve)
    },
   
    //提报工单  专项  白玲
    {
      path: '/chongxintibaoyemian',
      name: 'chongxintibaoyemian',
      component: resolve => require(['@/components/chongxintibaoyemian'], resolve)
    },
    {
      path: '/repairorder-zhuanxiang',
      name: 'repairorder-zhuanxiang',
      component: resolve => require(['@/components/repairorder-zhuanxiang'], resolve)
    },
     //提报工单  专项  白玲
     {
      path: '/repairconfirm-zhuanxiang',
      name: 'repairconfirm-zhuanxiang',
      component: resolve => require(['@/components/repairconfirm-zhuanxiang'], resolve)
    },
    //重新提报    白玲
    {
      path: '/repairconfirm-chongxintibao',
      name: 'repairconfirm-chongxintibao',
      component: resolve => require(['@/components/repairconfirm-chongxintibao'], resolve)
    },
    //修改客户信息
    {
      path: '/Customerinfo',
      name: 'Customerinfo',
      component: resolve => require(['@/components/Customerinfo'], resolve)
    },
    {
      //重新提报工单
      path: '/chongxintibao',
      name: 'chongxintibao',
      component: resolve => require(['@/components/chongxintibao'], resolve)
    },
    //产品报修
    {
      path: '/repairconfirm',
      name: 'repairconfirm',
      component: resolve => require(['@/components/repairconfirm'], resolve)

    },
    {
      path: '/repairconfirm2',
      name: 'repairconfirm2',
      component: resolve => require(['@/components/repairconfirm2'], resolve)

    },
    //客户服务  完
    {
      path: '/custser',
      name: 'custser',
      component: resolve => require(['@/views/custsur'], resolve)
    },

    //客服个人信息
    {
      path: '/userdetails',
      name: 'userdetails',
      component: resolve => require(['@/components/userdetail/userdetails'], resolve)
    },
    //修改个人信息
    {
      path: '/userupdate',
      name: 'userupdate',
      component: resolve => require(['@/components/userdetail/userupdate'], resolve)
    },


    //选择医院
    {
      path: '/cityYiyuan',
      name: 'cityYiyuan',
      component: resolve => require(['@/pages/city/City'], resolve)
    },

    //city  切换城市
    {
      path: '/city',
      name: 'city',
      component: resolve => require(['@/components/userdetail/city'], resolve)
    },

    //keshi  科室类别
    {
      path: '/keshilist',
      name: 'keshilist',
      component: resolve => require(['@/components/userdetail/keshilist'], resolve)
    },
    //position  职务类别
    {
      path: '/position',
      name: 'position',
      component: resolve => require(['@/components/userdetail/position'], resolve)
    },
    // //phone  电话编辑
    // {
    //   path: '/phone',
    //   name: 'phone',
    //   component:resolve => require(['@/components/userdetail/phone'],resolve)
    // },

    //产品报修  
    {
      path: '/prorepair',
      name: 'prorepair',
      component: resolve => require(['@/components/productrepair/proRepair'], resolve)
    },

    // //填写医院
    // {
    //   path: '/writehospital',
    //   name: 'writehospital',
    //   component:resolve => require(['@/components/productrepair/writehospital'],resolve)
    // },


    // //设备类型
    // {
    //   path: '/devicetype',
    //   name: 'devicetype',
    //   component:resolve => require(['@/components/productrepair/deviceType'],resolve)
    // },
    //故障类型
    {
      path: '/faultType',
      name: 'faultType',
      component: resolve => require(['@/components/productrepair/FaultType'], resolve)
    },

    //确认报修
    {
      path: '/confirmrepair',
      name: 'confirmrepair',
      component: resolve => require(['@/components/productrepair/ConfirmRepair'], resolve)
    },

    //进度查询
    {
      path: '/progress',
      name: 'progress',
      component: resolve => require(['@/components/progress/progress'], resolve)
    },

    //进度详情查询
    {
      path: '/progressdetail',
      name: 'progressdetail',
      component: resolve => require(['@/components/progress/progressdetail'], resolve)
    },
    //专项工单提报详情页面
    {
      path: '/zhuanxianggongdanxiangqing',
      name: 'zhuanxianggongdanxiangqing',
      component: resolve => require(['@/components/progress/zhuanxianggongdanxiangqing'], resolve)
    },

    //服务评价
    {
      path: '/evaluate',
      name: 'evaluate',
      component: resolve => require(['@/components/progress/evaluate'], resolve)
    },

    //产品信息查询
    {
      path: '/productclass',
      name: 'productclass',
      component: resolve => require(['@/components/service/productclass'], resolve)
    },
    //产品信息详情
    {
      path: '/prodetail',
      name: 'prodetail',
      component: resolve => require(['@/components/service/prodetail'], resolve)
    },

    //配件购买
    {
      path: '/purchase',
      name: 'purchase',
      component: resolve => require(['@/components/purchase'], resolve)
    },
    //配件购买详情
    {
      path: '/productdetail',
      name: 'productdetail',
      component: resolve => require(['@/components/productdetail'], resolve)
    },
    //在线咨询购买
    {
      path: '/onlinecustomer',
      name: 'onlinecustomer',
      component: resolve => require(['@/components/onlinecustomer'], resolve)
    },

    //意见反馈
    {
      path: '/opinio',
      name: 'opinio',
      component: resolve => require(['@/components/opinio'], resolve)
    },

    //family 家庭 个人注册
    {
      path: '/family',
      name: 'family',
      component: resolve => require(['@/components/family'], resolve)
    },
    //family  家庭个人修改
    {
      path: '/familyupdate',
      name: 'familyupdate',
      component: resolve => require(['@/components/familyupdate'], resolve)
    },



    // ---------------------------------------------------
    //员工登录
    {
      path: '/staffPassage',
      name: 'staffPassage',
      component: resolve => require(['@/components/staffPassage'], resolve)
    },
    //员工服务
    {
      path: '/staffserver',
      name: 'staffserver',
      component: resolve => require(['@/components/staff/server'], resolve)
    },
    //产品线  选择
    {
      path: '/productline',
      name: 'productline',
      component: resolve => require(['@/components/staff/productline'], resolve)
    },
    //设备机型  选择
    {
      path: '/DeviceNumber',
      name: 'DeviceNumber',
      component: resolve => require(['@/components/staff/DeviceNumber'], resolve)
    },

    //故障类型
    {
      path: '/fault',
      name: 'fault',
      component: resolve => require(['@/components/staff/fault'], resolve)
    },

    // -----------------------------------------------------
    //客户管理
    {
      path: '/customer',
      name: 'customer',
      component: resolve => require(['@/components/staff/customer'], resolve)
    },

    //客户管理
    {
      path: '/customerlist',
      name: 'customerlist',
      component: resolve => require(['@/components/staff/customerlist'], resolve)
    },
    // //客户管理
    // {
    //   path: '/customerAdd',
    //   name: 'customerAdd',
    //   component:resolve => require(['@/components/staff/customerAdd'],resolve)
    // },

    //客户详情
    {
      path: '/staffdetail',
      name: 'staffdetail',
      component: resolve => require(['@/components/staff/staffdetail'], resolve)
    },
    // ----------------------------------------------------
    //工单列表
    {
      path: '/orderlist',
      name: 'orderlist',
      component: resolve => require(['@/components/workorder/orderlist'], resolve)
    },

    //工单详情
    {
      path: '/orderdetail',
      name: 'orderdetail',
      component: resolve => require(['@/components/workorder/orderdetail'], resolve)
    },
    //工单签名    维修类型
    {
      path: '/toreport',
      name: 'toreport',
      component: resolve => require(['@/components/workorder/toreport'], resolve)
    },

    //工单签名    安装类型
    {
      path: '/installation',
      name: 'installation',
      component: resolve => require(['@/components/workorder/installation'], resolve)
    },
    //工单签名    培训记录单
    {
      path: '/TrainingRecord',
      name: 'TrainingRecord',
      component: resolve => require(['@/components/workorder/TrainingRecord'], resolve)
    },
    //专项服务报告单
    {
      path: '/SpecialReport',
      name: 'SpecialReport',
      component: resolve => require(['@/components/workorder/SpecialReport'], resolve)
    },


    //签名  回访   
    {
      path: '/returnvisit',
      name: 'returnvisit',
      component: resolve => require(['@/components/workorder/returnvisit'], resolve)
    },



    //签名  呼吸机报告单
    {
      path: '/Breathingmachine',
      name: 'Breathingmachine',
      component: resolve => require(['@/components/workorder/Breathingmachine'], resolve)
    },

    //签名  麻醉机报告单
    {
      path: '/Anesthesiamachine',
      name: 'Anesthesiamachine',
      component: resolve => require(['@/components/workorder/Anesthesiamachine'], resolve)
    },
    //签名  手术床报告单
    {
      path: '/Surgicalbed',
      name: 'Surgicalbed',
      component: resolve => require(['@/components/workorder/Surgicalbed'], resolve)
    },
    //签名  无影灯

    {
      path: '/Astrallamp',
      name: 'Astrallamp',
      component: resolve => require(['@/components/workorder/Astrallamp'], resolve)
    },
    //签名   塔桥
    {
      path: '/Towerbridge',
      name: 'Towerbridge',
      component: resolve => require(['@/components/workorder/Towerbridge'], resolve)
    },

    //维修知识技能指导
    {
      path: '/lead',
      name: 'lead',
      component: resolve => require(['@/components/guide/lead'], resolve)
    },


    // //维修知识
    // {
    //   path: '/maintain',
    //   name: 'maintain',
    //   component:resolve => require(['@/components/maintain'],resolve)
    // },

    //维修知识文字详情
    {
      path: '/maintaindetail',
      name: 'maintaindetail',
      component: resolve => require(['@/components/maintaindetail'], resolve)
    },
    //维修知识文字详情  (员工)
    {
      path: '/maintaindetailEmp',
      name: 'maintaindetailEmp',
      component: resolve => require(['@/components/maintaindetailEmp'], resolve)
    },

    //维修知识文字详情
    {
      path: '/commitment',
      name: 'commitment',
      component: resolve => require(['@/components/commitment'], resolve)
    },

    //医院维修指引
    {
      path: '/OnlineChat',
      name: 'OnlineChat',
      component: resolve => require(['@/components/OnlineChat'], resolve)
    },

    //员工维修指导
    {
      path: '/OnlineChatorder',
      name: 'OnlineChatorder',
      component: resolve => require(['@/components/OnlineChatorder'], resolve)
    },

    // //手写板
    // {
    //   path: '/signature',
    //   name: 'signature',
    //   component:resolve => require(['@/components/workorder/signature'],resolve)
    // },
    // //二维码
    // {
    //   path: '/erweima',
    //   name: 'erweima',
    //   component:resolve => require(['@/views/erweima'],resolve)
    // },

    //客户维修指导

    {
      path: '/guide',
      name: 'guide',
      component: resolve => require(['@/components/guide/guide'], resolve)
    },

  ]
})