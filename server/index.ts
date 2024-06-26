import * as process from "process";
require('dotenv').config();
import express, {Express} from 'express';
const cors = require('cors');
const errorHandler = require('./middleware/ErrorHandlerMiddleware');
const router = require('./routes/index');
const db = require('./db');
const models = require('./models/models');
const fileUploader = require('express-fileupload');
const path = require('path');


const app: Express = express();
app.use(cors());
app.use(fileUploader({}));
app.use(express.static(path.resolve(__dirname,'static')));
app.use(express.json());
app.use('/api',router);


app.use(errorHandler);
const PORT = process.env.PORT || 5001;

const serverStart = async()=>{
    try {
        await db.authenticate();
        await db.sync();
        app.listen(PORT, ()=>{
            console.log("SERVER STARTEN ON PORT " + PORT);
        })
    } catch (e) {
        console.log(e);
    }
}
serverStart();