import * as process from "process";
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/ErrorHandlerMiddleware');
const router = require('./routes/index');
const db = require('./db');
const models = require('./models/models');


const app = express();
app.use(cors());
app.use('api',router);


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
        console.log(e)
    }
}
serverStart();