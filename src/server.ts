import 'dotenv/config';
import './common/utils/handleRunErrors';
import App from './app';
import validateEnv from './common/utils/validateEnv';
import AuthRoute from './api/routes/auth.route';
import IndexRoute from './api/routes/index.route';
// import UsersRoute from './api/routes/users.route';
import ReservationsRoute from './api/routes/reservations.route';
import EventsRoute from './api/routes/events.route';
import TicketsRoute from './api/routes/tickets.route';

(async () => {
  validateEnv();
  // , new UsersRoute()
  const app = new App([new IndexRoute(), new AuthRoute(), new ReservationsRoute(), new EventsRoute(), new TicketsRoute()]);
  await app.initializeApp();
  app.listen();
})();
