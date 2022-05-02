import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import {dbConnection} from './db/connection';
import Routes from './common/interfaces/routes.interface';
import errorMiddleware from './api/middlewares/error.middleware';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public routes: Routes[];
  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
    this.routes = routes;
  }

  public async initializeApp() {
    await this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(this.routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      await dbConnection.initialize();
      console.log('🟢 The database is connected.');
    } catch (err) {
      console.log(`🔴 Unable to connect to the database: ${err}.`);
    }
  }

  private initializeMiddlewares() {
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
