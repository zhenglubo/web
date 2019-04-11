export default {
    plugins: [
      ['umi-plugin-react', {
        antd: true,
        dva: true,
        
      }],
    ],
    routes: [{
      path: '/',
      component: '../layout',
      routes: [
        {
          path: '/',
          component: 'User/User',
        },
        {
          path: '/user/user',
          component: 'User/User'
        },
        {
          path:'/order',
          routes:[
            {path:'/order/order',component:'Order/Order'}
          ]
        },
        {
          path:'/analyse',
          routes:[
            {
              path:'/analyse/aa',component:'Analyse/Aa'
            },
            {
              path:'/analyse/bb',component:'Analyse/Bb'
            },
            {
              path:'/analyse/cc',component:'Analyse/Cc'
            },
            
          ]
        },
        {
          path:'/summary',
          routes:[
            {
              path:'/summary/month',component:'Summary/month'
            },
            {
              path:'/summary/money',component:'Summary/money'
            },
            {
              path:'/summary/settle',component:'Summary/Settle'
            },
            
          ]
        },
        {
          path:'/fleet',
          routes:[
            {
              path:'/fleet/car',component:'Fleet/car'
            },
            {
              path:'/fleet/driver',component:'Fleet/driver'
            },
            
          ]
        },
        {
          path:'/route',
          routes:[
            {
              path:'/route/route',component:'route/route'
            },
            {
              path:'/route/company',component:'route/company'
            },
            
          ]
        }
      ]
    }],
};