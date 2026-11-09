import { store } from 'store';

const env = process.env.NODE_ENV || 'production';

const logs = [];
const app = {
  env,
  store,
  logs,
  log(message) {
    logs.push(message);
  },
};

global.app = app;

// Lbryinc needs access to the redux store for dispatching auth-related actions
global.store = app.store;

export default app;
