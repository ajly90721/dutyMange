import request from '@/utils/request'

export function getCardById(id) {
    // console.log("tid:"+tid);
    return request({
        url: '/cards/getCardById',
        method: 'post',
        data: {cardId:id}
    })
}

export function getCardByDep(dep) {
    // console.log("tid:"+tid);
    return request({
        url: '/cards/getCardByDep',
        method: 'post',
        data: {department:dep}
    })
}

export function getStaffByDep(dep) {
    // console.log("tid:"+tid);
    return request({
        url: '/staff/getStaffByDep',
        method: 'post',
        data: {department:dep}
    })
}
export function getStaffList() {
    // console.log("tid:"+tid);
    return request({
        url: '/staff/getStaffList',
        method: 'post',
        data: {}
    })
}

export function getCardList() {
    // console.log("tid:"+tid);
    return request({
        url: '/cards/getCardList',
        method: 'post',
        data: {}
    })
}

export function getCardDetail(id) {
    // console.log("tid:"+tid);
    return request({
        url: '/card/getCardDetail',
        method: 'post',
        data: {cardId:id}
    })
}

export function editCardDetail(obj) {
    // console.log("str:"+obj);
    // console.log("obj"+JSON.parse(obj))
    return request({
        url: '/card/editCardDetail',
        method: 'post',
        data: JSON.parse(obj)
    })
}
export function getDeps() {
    // console.log("str:"+obj);
    // console.log("obj"+JSON.parse(obj))
    return request({
        url: '/cards/getDeps',
        method: 'post',
        data: {}
    })
}

export function getPlanList() {
    // console.log("tid:"+tid);
    return request({
        url: '/plan/getPlanList',
        method: 'post',
        data: {}
    })
}

export function getPlanListByPlan(obj) {
    // console.log("tid:"+tid);
    return request({
        url: '/plan/getPlanListByPlan',
        method: 'post',
        data: JSON.parse(obj)
    })
}

export function getPlan(id) {
    // console.log("tid:"+tid);
    return request({
        url: '/plan/getPlan',
        method: 'post',
        data: {planId:id}
    })
}
export function createPlan(obj) {
    // console.log("tid:"+tid);
    return request({
        url: '/plan/createPlan',
        method: 'post',
        data: JSON.parse(obj)
    })
}

export function getTaskByPlan(id) {
    // console.log("tid:"+tid);
    return request({
        url: '/task/getTaskListByPlan',
        method: 'post',
        data: {planId:id}
    })
}

export function getTaskListByTask(id) {
    // console.log("tid:"+tid);
    return request({
        url: '/task/getTaskListByTask',
        method: 'post',
        data: JSON.parse(id)
    })
}

export function getLocationList() {
    // console.log("tid:"+tid);
    return request({
        url: '/task/getLocationList',
        method: 'post',
        data: {}
    })
}

export function createTask(str) {
    // console.log("tid:"+tid);
    return request({
        url: '/task/createTask',
        method: 'post',
        data: JSON.parse(str)
    })
}

export function getPlanListByDep(str) {
    // console.log("tid:"+tid);
    return request({
        url: '/plan/getPlanListByDep',
        method: 'post',
        data: {department:str}
    })
}

export function getTaskListByDep(str) {
    // console.log("tid:"+tid);
    return request({
        url: '/task/getTaskListByDep',
        method: 'post',
        data: {department:str}
    })
}

export function getTaskList() {
    // console.log("tid:"+tid);
    return request({
        url: '/task/getTaskList',
        method: 'post',
        data: {}
    })
}

export function sendTasks(str) {
    // console.log("tid:"+tid);
    return request({
        url: '/task/sendTasks',
        method: 'post',
        data: JSON.parse(str)
    })
}

export function deleteTasks(str) {
    // console.log("tid:"+tid);
    return request({
        url: '/task/deleteTasks',
        method: 'post',
        data: JSON.parse(str)
    })
}

export function updateTask(str) {
    // console.log("tid:"+tid);
    return request({
        url: '/task/updateTask',
        method: 'post',
        data: JSON.parse(str)
    })
}

export function getRecordList() {
    // console.log("tid:"+tid);
    return request({
        url: '/taskrecord/getRecordList',
        method: 'post',
        data: {}
    })
}

export function getRecordListByDep(str) {
    // console.log("tid:"+tid);
    return request({
        url: '/taskrecord/getRecordListByDep',
        method: 'post',
        data: {department:str}
    })
}

export function getRecordListByRecord(str) {
    // console.log("tid:"+tid);
    return request({
        url: '/taskrecord/getRecordListByRecord',
        method: 'post',
        data: JSON.parse(str)
    })
}

export function addRecord(str) {
    // console.log("tid:"+tid);
    return request({
        url: '/taskrecord/addRecord',
        method: 'post',
        data: JSON.parse(str)
    })
}

export function addCard(str) {
    // console.log("tid:"+tid);
    return request({
        url: '/cards/addCard',
        method: 'post',
        data: JSON.parse(str)
    })
}

export function login(str) {
    // console.log("tid:"+tid);
    var obj=JSON.parse(str)
    obj.position="hhh"
    return request({
        url: '/staff/login',
        method: 'post',
        data: obj
    })
}


