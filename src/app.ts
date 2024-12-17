import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './module/user/user.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', UserRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

export default app;
