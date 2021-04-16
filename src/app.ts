import 'reflect-metadata';
import './database';
import path from 'path';
import express from 'express';
import router from "./routes";

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(router);

export default app