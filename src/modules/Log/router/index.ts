export default {
  name: 'logs',
  component: () =>
    import(/* webpackChunkName: "LogLayout" */ '../layouts/LogLayout.vue'),
  children: [
    {
      path: 'admon',
      name: 'logs-admon',
      component: () =>
        import(/* webpackChunkName: "LogPage" */ '../pages/LogPage.vue'),
    },
  ],
}
