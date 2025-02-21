import 'reflect-metadata'
require('module-alias/register');
import * as dotenv from 'dotenv';
dotenv.config();
import { useContainer, useExpressServer } from 'routing-controllers';
import express from 'express';
import { Container } from 'typedi';
import { Server } from 'node:http';
import { HttpErrorHandler } from './middlewares/httpError.middleware';
import { BillsController, LegislatorsController } from './modules';

useContainer(Container);

const port = Number(process.env.SERVER_PORT)
const host = process.env.SERVER_HOST_URL!


export const app = express()
app.use(express.json())
useExpressServer(app, {
    classTransformer: true,
    validation: { whitelist: true},
    cors: true,
    controllers: [BillsController, LegislatorsController],
    middlewares: [HttpErrorHandler],
    defaultErrorHandler: false,
});

let server: Server;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, host, () => {
        console.log(`Server started on ${host}:${port}`)
    })
}

export default app
export { server }


