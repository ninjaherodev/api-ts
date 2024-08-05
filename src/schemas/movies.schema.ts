import { z } from 'zod';

const genreEnum = z.enum([
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Thriller',
  'Sci-Fi',
  'Crime',       
  'Romance',     
  'Animation',   
  'Biography'
]);

export const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required',
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: 'Poster must be a valid URL',
  }),
  genre: z.array(genreEnum, {
    invalid_type_error: 'Movie genre is required',
    required_error: 'Movie genre must be an array of enum Genre',
  }),
});

// const movieSchema = movieInputSchema.extend({
//   id: z.string(),
// });

// export type MovieInput = z.infer<typeof movieInputSchema>;
// export type Movie = z.infer<typeof movieSchema>;
// export type PartialMovie = Partial<Movie>;

// export const validateMovieInput = (object: any) => {
//   return movieInputSchema.safeParse(object);
// };

// export const validateMovie = (object: any) => {
//   return movieSchema.safeParse(object);
// };

// export const validatePartialMovie = (object: any) => {
//   return movieSchema.partial().safeParse(object);
// };