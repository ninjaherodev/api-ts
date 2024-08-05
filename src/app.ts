import express, {Express} from 'express'
import {corsMiddleware} from './middlewares/cors'
import { RouterApi } from './routers/index';
import { errorHandler,logError} from './middlewares/errorHandler';

export class Server {
    private app: Express
    private port: number

    constructor(port: number) {
        this.port =  port
        this.app = express()
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
    }
    configureMiddleware(): void {
        this.app.disable('x-powered-by')
        this.app.use(express.json());
        this.app.use(corsMiddleware());
    }

    configureRoutes(): void {
      new RouterApi(this.app);
    }
    configureErrorHandling(): void {
      this.app.use(logError);
      this.app.use(errorHandler);
  }

    public start(): void {
        this.app.listen(this.port, () => {
          console.log(`Server is running on http://localhost:${this.port}`);
        });
      }
    

}