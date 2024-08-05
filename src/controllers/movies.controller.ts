import { Request, Response, NextFunction } from 'express';
import { MovieService } from '../services/movies.services';
import { asyncHandler } from '../middlewares/asynchandler';
// import { validateMovie, validatePartialMovie } from '../schemas/movies.schema';

export class MovieController {
  static findAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { genre } = req.query as { genre?: string };
    const movies = await MovieService.findAll({ genre });
    res.status(200).json(movies);
  });

  static findOne = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    const movie = await MovieService.findOne({ id });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  });

  static create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const movie = req.body;
    // const movieValidated = validateMovie(movie);
    // if (!movieValidated.success) {
    //   return res.status(422).json({ error: movieValidated.error.errors });
    // }
    const newMovie = await MovieService.create({ input: movie });
    res.status(201).json(newMovie);
  });

  static update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    const movie = req.body;
    // const movieValidated = validatePartialMovie(movie);
    // if (!movieValidated.success) {
    //   return res.status(422).json({ error: movieValidated.error.errors });
    // }
    const updatedMovie = await MovieService.update({ id, input: movie });
    res.status(200).json(updatedMovie);
  });

  static delete = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    await MovieService.delete({ id });
    res.status(200).json({ message: 'Movie deleted' });
  });
}
