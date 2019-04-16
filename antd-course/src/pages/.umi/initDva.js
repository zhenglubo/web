import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'order', ...(require('D:/workspace/web/antd-course/src/models/order.js').default) });
app.model({ namespace: 'route', ...(require('D:/workspace/web/antd-course/src/models/route.js').default) });
app.model({ namespace: 'sender', ...(require('D:/workspace/web/antd-course/src/models/sender.js').default) });
app.model({ namespace: 'user', ...(require('D:/workspace/web/antd-course/src/models/user.js').default) });
