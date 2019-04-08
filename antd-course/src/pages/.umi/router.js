import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layout').default,
    "routes": [
      {
        "path": "/",
        "component": require('../User/User').default,
        "exact": true
      },
      {
        "path": "/user/user",
        "component": require('../User/User').default,
        "exact": true
      },
      {
        "path": "/order",
        "routes": [
          {
            "path": "/order/order",
            "component": require('../Order/Order').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/antd-course/node_modules/_umi-build-dev@1.7.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/analyse",
        "routes": [
          {
            "path": "/analyse/aa",
            "component": require('../Analyse/Aa').default,
            "exact": true
          },
          {
            "path": "/analyse/bb",
            "component": require('../Analyse/Bb').default,
            "exact": true
          },
          {
            "path": "/analyse/cc",
            "component": require('../Analyse/Cc').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/workspace/antd-course/node_modules/_umi-build-dev@1.7.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": () => React.createElement(require('D:/workspace/antd-course/node_modules/_umi-build-dev@1.7.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('D:/workspace/antd-course/node_modules/_umi-build-dev@1.7.7@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
