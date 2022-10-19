// import "reflect-metadata"
// import "express-async-errors"
// import express from "express"


// const app = express()
// app.use(express.json())



// export default app
import "reflect-metadata"
import express from "express"
import { Request, Response, NextFunction} from 'express'
import userRouter from "./routes/users/users.routes";
import loginRouter from "./routes/sessions/session.routes";
import { AppError } from "./errors/appErrors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/users', userRouter);
app.use('/login', loginRouter);

app.use(handleErrorMiddleware);

export default app