import express from "express";
import rolesRouter from "./router/roles.router.js";
import authsRouter from "./router/auths.router.js";

const app = express();

app.use(rolesRouter);
app.use(authsRouter);

export default app;
