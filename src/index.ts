import express, { Request, Response } from 'express';
import router from './routes/router';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
