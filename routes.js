define([], function () {
  return [
    {
      path: '/',
      component: view('home'),
      props: {menu_items:"no" }
    },
    {
      path: '/stores',
      component: view('default'),
      children: [
        {
          path: '',
          component: view('stores'),
          name: 'storeList'
        },
        {
          path: ':id',
          component: view('store_details'),
          name: 'storeDetails'
        }
      ]
    },
    {
      path: '/promotions',
      component: view('default'),
      children: [
        {
          path: '',
          component: view('promotions'),
          name: 'storeList'
        },
        {
          path: ':id',
          component: view('promotion_details'),
          name: 'promotionDetails'
        }
      ]
    },
    {
      path: '/map',
      component: view('default'),
      children: [
        {
          path: '',
          component: view('map'),
          name: 'map'
        },
        {
          path: ':id',
          component: view('map_stores'),
          name: 'mapStores'
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: view('notfoundcomponent')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]

  /**
   * Asynchronously load view (lazy-loading)
   * @param {string} name the filename (basename) of the view to load.
   */
  function view(name) {
    return function(resolve) {
      require(['vue!' + name + '.vue'], resolve);
    }
  };
});
