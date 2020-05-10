export default({
  Vue,
  options,
  router,
  siteData,
  isServer
}) =>  {
  router.addRoutes([
    { path: '/', redirect: '/zh/' },
    { path: '/en/', redirect: '/zh/' }
  ]);
}
