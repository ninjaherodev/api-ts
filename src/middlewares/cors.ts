import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';

const ACCEPTED_ORIGINS: string[] = [
  'http://172.20.217.217:8080',
  'http://localhost:80',
  'http://production.com',
  'http://fabio.com:8080'
];

interface CorsMiddlewareOptions {
  acceptedOrigins?: string[];
}

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS }: CorsMiddlewareOptions = {}) => {
  const corsOptions: CorsOptions | CorsOptionsDelegate = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (acceptedOrigins.includes(origin ?? '') || !origin) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Puedes ajustar los métodos permitidos aquí
    allowedHeaders: ['Content-Type', 'Authorization'] // Puedes ajustar los encabezados permitidos aquí
  };

  return cors(corsOptions);
};