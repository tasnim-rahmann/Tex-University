import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

// persers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


// global error handler middleware
app.use(globalErrorHandler);

// not found response middleware
app.use(notFound);

export default app;