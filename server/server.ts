import express from 'express'
import { router } from './routes';

const app = express();
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || '8080';

app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
});