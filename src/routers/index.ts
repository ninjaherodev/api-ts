import { Router, Express } from 'express';
import { RouterMovies } from './movies.router';

export class RouterApi {
    private router: Router;
    private app: Express;

    constructor(app: Express) {
        this.app = app;
        this.router = Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.app.use('/api/v1', this.router);
        new RouterMovies(this.router);
    }
}