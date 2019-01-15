import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => (
  <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>loading...</div>
);
const router = [
  {
    title: 'Demo',
    children: [
      {
        title: 'Redux',
        name: 'ReactRedux',
        path: '/app/demo/redux',
        exact: true,
        component: Loadable({
          loader: () => import('../components/demo/reactRedux'),
          loading: Loading,
        }),
      },
      {
        title: 'Antd',
        name: 'antdDemo',
        path: '/app/demo/antd',
        exact: true,
        component: Loadable({
          loader: () => import('../components/demo/antdDemo'),
          loading: Loading,
        }),
      },
      {
        title: 'WangEditor',
        name: 'wangEditor',
        path: '/app/demo/editor',
        exact: true,
        component: Loadable({
          loader: () => import('../components/demo/wangEditor'),
          loading: Loading,
        }),
      },
      {
        title: 'Charts',
        name: 'charts',
        path: '/app/demo/charts',
        exact: true,
        component: Loadable({
          loader: () => import('../components/charts'),
          loading: Loading,
        }),
      },
      {
        title: 'Transition',
        name: 'transition',
        path: '/app/demo/transition',
        exact: true,
        component: Loadable({
          loader: () => import('../components/demo/transition'),
          loading: Loading,
        }),
      },
      {
        title: 'drag',
        name: 'drag',
        path: '/app/demo/drag',
        exact: true,
        component: Loadable({
          loader: () => import('../components/demo/drag'),
          loading: Loading,
        }),
      },
      {
        title: 'dragList',
        name: 'dragList',
        path: '/app/demo/dragList',
        exact: true,
        component: Loadable({
          loader: () => import('../components/demo/drag/drag'),
          loading: Loading,
        }),
      },
      {
        title: 'reactDnd',
        name: 'reactDnd',
        path: '/app/demo/reactDnd',
        exact: true,
        component: Loadable({
          loader: () => import('../components/demo/drag/reactdnd'),
          loading: Loading,
        }),
      },
    ]
  },
  {
    title: 'Test',
    children: [
      {
        title: 'Fall Flat',
        name: 'fallflat',
        path: '/app/Test/fallflat',
        exact: true,
        component: Loadable({
          loader: () => import('../components/test/fallFlat'),
          loading: Loading,
        }),
      },
      {
        title: 'Timer',
        name: 'timer',
        path: '/app/Test/timer',
        exact: true,
        component: Loadable({
          loader: () => import('../components/test/timer'),
          loading: Loading,
        }),
      },
      {
        title: 'PixiJs',
        name: 'pixijs',
        path: '/app/Test/pixijs',
        exact: true,
        component: Loadable({
          loader: () => import('../components/test/pixiJs'),
          loading: Loading,
        }),
      },
      {
        title: 'cude',
        name: 'cude',
        path: '/app/Test/cude',
        exact: true,
        component: Loadable({
          loader: () => import('../components/test/cude'),
          loading: Loading,
        }),
      },
      {
        title: 'carousel3D',
        name: 'carousel3D',
        path: '/app/Test/carousel3D',
        exact: true,
        component: Loadable({
          loader: () => import('../components/test/carousel'),
          loading: Loading,
        }),
      },
    ],
  },
  {
    title: 'Info',
    children: [],
  },
];

export default router;