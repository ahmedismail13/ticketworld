import 'dotenv/config';
import './common/utils/handleRunErrors';
import App from './app';
import AuthRoute from './api/routes/auth.route';
import IndexRoute from './api/routes/index.route';
// import UsersRoute from './api/routes/users.route';
import ReservationsRoute from './api/routes/reservations.route';

import validateEnv from './common/utils/validateEnv';
import EventsRoute from './api/routes/events.route';

(async () => {
  validateEnv();
  // , new UsersRoute()
  const app = new App([new IndexRoute(), new AuthRoute(), new ReservationsRoute(), new EventsRoute()]);
  await app.initializeApp();
  app.listen();
})();
