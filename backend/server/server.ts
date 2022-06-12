import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors({
  credentials: true,
  origin: true
}));
app.use(express.json());
app.use(cookieParser());

import { router } from './routes';
app.use('/api', router);

const PORT = process.env.PORT || '8080';

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});