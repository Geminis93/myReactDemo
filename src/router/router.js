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
    ],
  },
  {
    title: 'Info',
    children: [],
  },
];

export default router;