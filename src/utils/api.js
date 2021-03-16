import request from '@/utils/request'

export function getCardById(id) {
    // console.log("tid:"+tid);
    return request({
        url: '/cards/getCardById',
        method: 'post',
        data: {cardId:id}
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




