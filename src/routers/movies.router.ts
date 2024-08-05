import { Router } from 'express';
import { MovieController } from '../controllers/movies.controller';
import {movieSchema} from '../schemas/movies.schema'
import { schemaValidator} from '../middlewares/schemaValidator'
export class RouterMovies {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/movies', MovieController.findAll);
        this.router.get('/movies/:id', MovieController.findOne);
        this.router.post('/movies',schemaValidator(movieSchema,'body'), MovieController.create);
        this.router.patch('/movies/:id',schemaValidator(movieSchema,'body', true), MovieController.update);
        this.router.delete('/movies/:id', MovieController.delete);
    }
}