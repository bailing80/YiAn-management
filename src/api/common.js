import request from 'request'

//获取所有字典值
export function getAllDict(data) {
  return request({
    url: `/dicCode/queryAdminDicByType?type=${data}`,
    method: 'post'
  })
};

// 添加字典值
export function addDicCode(data) {
  return request({
    url: `/dicCode/addDicCode`,
    method: 'post',
    data
  })
};

// 根据type查询value是否存在
export function queryDicValueByType(data) {
  return request({
    url: `/dicCode/queryDicValueByType`,
    method: 'post',
    data
  })
};

// 根据id查询字典数据
export function queryDicById(data) {
  return request({
    url: `/dicCode/queryDicById`,
    method: 'post',
    data
  })
};

// 修改字典信息保存
export function updateDicCode(data) {
  return request({
    url: `/dicCode/updateDicCode`,
    method: 'post',
    data
  })
};

// 删除字典
export function deleteDicCode(data) {
  return request({
    url: `/dicCode/deleteDicCode`,
    method: 'post',
    data
  })
};

// 获取省份对应的城市
export function getCity(data) {
  return request({
    url: `/dicCode/queryAdminDicByType?type=CITY&parentId=${data}`,
    method: 'post'
  })
}

// 获取产品线对应的型号
export function getModel(data) {
  return request({
    url: `/dicCode/queryAdminDicByType?type=EQUI_MODEL&parentId=${data}`,
    method: 'post'
  })
}

// 获取一级类型对应的二级类型
export function getTwoTyep(data) {
  return request({
    url: `/dicCode/queryAdminDicByType?type=PARTS_TYPE_TWO&parentId=${data}`,
    method: 'post'
  })
}

// 获取二级类型对应的三级型号
export function getThreeTyep(data) {
  return request({
    url: `/dicCode/queryAdminDicByType?type=PARTS_TYPE_THREE&parentId=${data}`,
    method: 'post'
  })
}

//获取树结构数据
export function getTreeList(data) {
  return request({
    url: `/dicCode/getList?types=${data}`,
    method: 'post'
  })
};

// 导出数据
export function excelTable(data) {
  return request({
    url: `download/excel`,
    method: 'post',
    responseType: 'blob',
    params: data,
  })
};

// 图片上传
export function uploading(data) {
  return request({
    url: `/upload/image`,
    method: 'post',
    data
  })
}


// 后台操作流程 监控
export function Monitoringoperation(data) {
  return request({
    url: `/applyJob/addApplyRecord`,
    method: 'post',
    data
  })
}

// 工单详情 拒绝理由
export function queryApplyJobGroupchaxun(data) {
  return request({
    url: `/applyJob/queryApplyJobGroup`,
    method: 'post',
    data
  })
}

export function fileurl(data) {
  return request({
    url: `/excel/uploadExcel`,
    method: 'post',
    data
  })
}






