import express from "express";
import rolesRouter from "./router/roles.router.js";
import authsRouter from "./router/auths.router.js";
import tokensRouter from "./router/tokens.router.js";
import usersRouter from "./router/users.router.js";
import worksRouter from "./router/works.router.js";

const app = express();

app.use(rolesRouter);
app.use(authsRouter);
app.use(tokensRouter);
app.use(usersRouter);
app.use(worksRouter);

export default app;
