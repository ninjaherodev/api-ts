import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

// Definir los tipos permitidos para 'property'
type RequestProperties = 'body' | 'params' | 'query';

export const schemaValidator = <T>(
  schema: AnyZodObject,
  property: RequestProperties,
  isPartial = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property as keyof Request]; // Asegura que 'property' es una clave válida

    if (!data) {
      return next(new Error('Property invalid in schemaValidator'));
    }

    const result = isPartial
      ? schema.partial().safeParse(data)
      : schema.safeParse(data);

    if (result.success) {
        const validatedData = result.data;
        (req as any)[property] = validatedData;
      next();
    } else {
      next(result.error);
    }
  };
};
  