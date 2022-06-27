import { post } from '@/common/axios';

// 添加&修改
export const add = (params: object) => post('/common/create', params);

// 获取列表&搜索
export const getList = (params: object) => post('/common/getList', params);

// 下架&删除&改变状态......
export const operate = (params: object) => post('/common/operate', params);
