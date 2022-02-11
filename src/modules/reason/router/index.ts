export default {
  name: 'reasons',
  component: () =>
    // import(/* webpackChunkName: "UsersPage" */ "../pages/UsersPage.vue"),
    import(/* webpackChunkName: "UsersLayout" */ '../layouts/ReasonLayout.vue'),
  children: [
    {
      path: 'admon',
      name: 'reasons-admon',
      component: () =>
        import(/* webpackChunkName: "UsersPage" */ '../pages/ReasonsPage.vue'),
    },
  ],
}
