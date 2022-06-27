export default [
  {
    path: '/user', // 用户登录界面
    layout: false, // 不显示左边菜单栏
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/demo',
    name: '开发模板',
    access: 'canAdmin', // 猜测是权限管理
    routes: [
      {
        path: '/demo/demo1',
        name: '模板1',
        component: './demo/demo1',
      },
      {
        path: '/demo/demo2',
        name: '模板2',
        component: './demo/demo2',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/', // 设置默认打开界面是welcome
    redirect: '/welcome',
  },
  {
    component: './404', // 路由失败默认打开404界面
  },
];
