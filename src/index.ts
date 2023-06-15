import express, {Request, Response, NextFunction} from 'express'
import path from 'path'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { HttpError } from 'http-errors'
const app = express();
dotenv.config();
const route = require('./routes');
// require('./src/helpers/redis_client')


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));
app.use(morgan('combined'));

route(app);

app.use('/resource', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res, next) => {
    res.json()
})

app.use((err : HttpError, req : Request, res : Response, next : NextFunction) => {
    console.log(err);
    res.status(200).json({
        "error-message": err.message,
        "status": err.status || 500,
    })
})




app.listen(PORT, () => {
    console.log(`Listening on PORT::${PORT}`);
})






