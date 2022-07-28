// import Footer from '@/components/Footer';
// import RightContent from '@/components/RightContent';
// import { BookOutlined, LinkOutlined } from '@ant-design/icons';
// import type { Settings as LayoutSettings } from '@ant-design/pro-components';
// import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
// import type { RunTimeLayoutConfig } from 'umi';
// import { history, Link } from 'umi';
// import defaultSettings from '../config/defaultSettings';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

// const isDev = process.env.NODE_ENV === 'development';
// const loginPath = '/user/login';

// // 在构建时是无法使用 dom 的，所以有些配置可能需要运行时来配置，一般而言我们都是在 src/app.tsx 中管理运行时配置。

// /** 获取用户信息比较慢的时候会展示一个 loading */
// // initialStateConfig 是 getInitialState 的补充配置，getInitialState 支持异步的设置，在初始化没有完成之前我们展示了一个 loading，initialStateConfig 可以配置这个 loading。
// export const initialStateConfig = {
//   loading: <PageLoading />,
// };

// /**
//  * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
//  *
//  * 用于获取初始化数据，初始化数据使用 useModel 在各个组件中使用，在请求中 getInitialState 会堵塞页面加载。
//  * */
// export async function getInitialState(): Promise<{
//   settings?: Partial<LayoutSettings>;
//   currentUser?: API.CurrentUser;
//   loading?: boolean;
//   fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
// }> {
//   const fetchUserInfo = async () => {
//     try {
//       const msg = await queryCurrentUser();
//       return msg.data;
//     } catch (error) {
//       history.push(loginPath);
//     }
//     return undefined;
//   };
//   // 如果不是登录页面，执行
//   if (history.location.pathname !== loginPath) {
//     const currentUser = await fetchUserInfo();
//     return {
//       fetchUserInfo,
//       currentUser,
//       settings: defaultSettings,
//     };
//   }
//   return {
//     fetchUserInfo,
//     settings: defaultSettings,
//   };
// }

// // ProLayout 支持的api https://procomponents.ant.design/components/layout
// // 在构建时是无法使用 dom 的，所以有些配置可能需要运行时来配置，我们可以在src/app.tsx 中 export 一个 layout 来进行配置
// export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
//   return {
//     rightContentRender: () => <RightContent />,
//     disableContentMargin: false,
//     waterMarkProps: {
//       content: initialState?.currentUser?.name,
//     },
//     footerRender: () => <Footer />,
//     onPageChange: () => {
//       const { location } = history;
//       // 如果没有登录，重定向到 login
//       if (!initialState?.currentUser && location.pathname !== loginPath) {
//         history.push(loginPath);
//       }
//     },
//     links: isDev
//       ? [
//         <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
//           <LinkOutlined />
//           <span>OpenAPI 文档</span>
//         </Link>,
//         <Link to="/~docs" key="docs">
//           <BookOutlined />
//           <span>业务组件文档</span>
//         </Link>,
//       ]
//       : [],
//     menuHeaderRender: undefined,
//     // 自定义 403 页面
//     // unAccessible: <div>unAccessible</div>,
//     // 增加一个 loading 的状态
//     childrenRender: (children, props) => {
//       // if (initialState?.loading) return <PageLoading />;
//       return (
//         <>
//           {children}
//           {!props.location?.pathname?.includes('/login') && (
//             <SettingDrawer
//               disableUrlParams
//               enableDarkTheme
//               settings={initialState?.settings}
//               onSettingChange={(settings) => {
//                 setInitialState((preInitialState) => ({
//                   ...preInitialState,
//                   settings,
//                 }));
//               }}
//             />
//           )}
//         </>
//       );
//     },
//     ...initialState?.settings,
//   };
// };
