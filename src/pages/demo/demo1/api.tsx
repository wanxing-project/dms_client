import { get, post } from '@/common/axios';

// 获取列表&搜索
export const getList = (params: object) => get('/demo1/getList', params);

// 添加&修改
export const add = (params: object) => post('/demo1/create', params);

// 下架&删除&改变状态......
// export const operate = (params: object) => post('/common/operate', params);
