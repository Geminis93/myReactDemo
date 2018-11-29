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
          loader: () => import('../components/reactRedux'),
          loading: Loading,
        }),
      },
      {
        title: 'Antd',
        name: 'antdDemo',
        path: '/app/demo/antd',
        exact: true,
        component: Loadable({
          loader: () => import('../components/antdDemo'),
          loading: Loading,
        }),
      },
      {
        title: 'WangEditor',
        name: 'wangEditor',
        path: '/app/demo/editor',
        exact: true,
        component: Loadable({
          loader: () => import('../components/wangEditor'),
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
          loader: () => import('../components/transition'),
          loading: Loading,
        }),
      },
      {
        title: 'drag',
        name: 'drag',
        path: '/app/Text/drag',
        exact: true,
        component: Loadable({
          loader: () => import('../components/drag'),
          loading: Loading,
        }),
      },
      {
        title: 'dragList',
        name: 'dragList',
        path: '/app/Text/dragList',
        exact: true,
        component: Loadable({
          loader: () => import('../components/drag/drag'),
          loading: Loading,
        }),
      },
      {
        title: 'reactDnd',
        name: 'reactDnd',
        path: '/app/Text/reactDnd',
        exact: true,
        component: Loadable({
          loader: () => import('../components/drag/reactdnd'),
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
        path: '/app/Text/fallflat',
        exact: true,
        component: Loadable({
          loader: () => import('../components/fallFlat'),
          loading: Loading,
        }),
      },
      {
        title: 'Timer',
        name: 'timer',
        path: '/app/Text/timer',
        exact: true,
        component: Loadable({
          loader: () => import('../components/timer'),
          loading: Loading,
        }),
      },
      {
        title: 'CreateJs',
        name: 'createjs',
        path: '/app/Text/createjs',
        exact: true,
        component: Loadable({
          loader: () => import('../components/createJs'),
          loading: Loading,
        }),
      },
      {
        title: 'PixiJs',
        name: 'pixijs',
        path: '/app/Text/pixijs',
        exact: true,
        component: Loadable({
          loader: () => import('../components/pixiJs'),
          loading: Loading,
        }),
      },
      {
        title: 'GameDemo',
        name: 'gameDemo',
        path: '/app/Text/gameDemo',
        exact: true,
        component: Loadable({
          loader: () => import('../components/gameDemo'),
          loading: Loading,
        }),
      },
      {
        title: 'cude',
        name: 'cude',
        path: '/app/Text/cude',
        exact: true,
        component: Loadable({
          loader: () => import('../components/cude'),
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