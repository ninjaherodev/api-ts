export class CustomError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      
      // Asegura que el stack trace sea generado correctamente en el contexto de un Error extendido.
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }