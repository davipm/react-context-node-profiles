import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import morgan from 'morgan';
import path from 'path';
import "colors";

import devRoute from './routes/dev';
import searchRoute from './routes/search';
import connectDb from "./config/db";
import { setupWebsocket } from "./websocket";

dotenv.config({ path: "./src/config/config.env" });
connectDb().then(() => console.log("Database connected".cyan.bold));

const app = express();
const server = http.Server(app);
setupWebsocket(server);

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('src/client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.use([devRoute, searchRoute]);

app.listen(process.env.PORT, () =>
  console.log(`Hello World running in port ${process.env.PORT}`.yellow.bold)
);
