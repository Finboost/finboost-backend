import express from "express";
import rolesRouter from "./router/roles.router.js";
import authsRouter from "./router/auths.router.js";
import tokensRouter from "./router/tokens.router.js";

const app = express();

app.use(rolesRouter);
app.use(authsRouter);
app.use(tokensRouter);

export default app;
