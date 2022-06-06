import cookieParser from 'cookie-parser';
import express from 'express'

const app = express();
app.use(express.json());
app.use(cookieParser());

import { router } from './routes';
app.use('/api', router);

const PORT = process.env.PORT || '8080';

app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
});