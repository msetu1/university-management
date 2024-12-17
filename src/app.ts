import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './module/user/user.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFoundError';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', UserRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
