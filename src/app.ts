import "express-async-error"
import "reflect-metadata"
import express from "express"

import userRouter from "./routes/users/users.routes";
import loginRouter from "./routes/sessions/session.routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import categoriesRouter from "./routes/categories/categories.routes";
import propertiesRouter from "./routes/properties/properties.routes";
import schedulesRouter from "./routes/schedules/schedules.routes";

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/properties', propertiesRouter);
app.use('/schedules', schedulesRouter)

app.use(handleErrorMiddleware);

export default app