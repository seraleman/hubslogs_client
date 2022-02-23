export default {
  name: 'reasons',
  component: () =>
    import(
      /* webpackChunkName: "ReasonLayout" */ '../layouts/ReasonLayout.vue'
    ),
  children: [
    {
      path: 'admon',
      name: 'reasons-admon',
      component: () =>
        import(
          /* webpackChunkName: "ReasonsPage" */ '../pages/ReasonsPage.vue'
        ),
    },
  ],
}
