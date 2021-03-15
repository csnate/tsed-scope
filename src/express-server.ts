import * as express from 'express';
import { test2Middleware, testMiddleware } from './middlewares/testExpressMiddleware';
const app = express();
const port = 8080;

app.use(testMiddleware);
app.use(test2Middleware);

app.get('/health', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});