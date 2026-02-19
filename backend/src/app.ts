import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
const { PORT = 3000 } = process.env;

const app = express();

interface ErrorResponse {
  error: {
    message: string;
    status?: number; // Optional error code
  };
}

function handleError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.status || 500; // Use provided status or default to 500
  const errorResponse: ErrorResponse = {
    error: {
      message: err.message || 'Internal Server Error', // Use provided message or default
      status: err.status, // Include error code if available
    },
  };
  res.status(statusCode).json(errorResponse);
}

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`);
});

app.use(bodyParser.json());
app.use(
  cors({
    exposedHeaders: 'total',
  })
);
app.use('/', routes);
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = {
    message: `Cant find ${req.originalUrl} on the server!`,
    status: 404,
  };
  next(err);
});
app.use(handleError);

export default app;
