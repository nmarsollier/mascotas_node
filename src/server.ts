"use strict";

import { MongoError } from "mongodb";
import * as mongoose from "mongoose";
import * as env from "./server/environment";
import { Config } from "./server/environment";
import * as express from "./server/express";

// Variables de entorno
const conf: Config = env.getConfig(process.env);

// Establecemos conexión con MongoDD
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.connect(conf.mongoDb, {}, function (err: MongoError) {
    if (err) {
        console.error("No se pudo conectar a MongoDB!");
        console.error(err.message);
        process.exit();
    } else {
        console.log("MongoDB conectado.");
    }
});

// Se configura e inicia express
const app = express.init(conf);

app.listen(conf.port, () => {
    console.log(`Mascotas escuchando en puerto ${conf.port}`);
});

module.exports = app;
