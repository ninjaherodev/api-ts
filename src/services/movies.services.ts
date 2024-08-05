import { randomUUID } from 'node:crypto';
import { CustomError } from '../errors/CustomError';
import movies from '../../movies.json';

interface FindAllParams {
  genre?: string;
}

interface CreateParams {
  input: {
    title: string;
    year: number;
    director: string;
    duration: number;
    rate: number;
    poster: string;
    genre: string[];
  };
}

interface UpdateParams {
  id: string;
  input: Partial<{
    title: string;
    year: number;
    director: string;
    duration: number;
    rate: number;
    poster: string;
    genre: string[];
  }>;
}

export class MovieService {
  static async findAll({ genre }: FindAllParams) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  }

  static async findOne({ id }: { id: string }) {
    const movie = movies.find((movie) => movie.id === id);
    return movie;
  }

  static async create({ input }: CreateParams) {
    const newMovie = {
      id: randomUUID(),
      ...input
    };
    movies.push(newMovie);
    return newMovie;
  }

  static async delete({ id }: { id: string }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      throw new CustomError('Movie not found', 404);
    }
    movies.splice(movieIndex, 1);
    return true;
  }

  static async update({ id, input }: UpdateParams) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      throw new CustomError('Movie not found', 404);
    }
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    };
    return movies[movieIndex];
  }
}