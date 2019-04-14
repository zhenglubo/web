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

app.model({ namespace: 'order', ...(require('E:/项目/web/web/antd-course/src/models/order.js').default) });
app.model({ namespace: 'user', ...(require('E:/项目/web/web/antd-course/src/models/user.js').default) });
