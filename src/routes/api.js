import express from "express";
import rolesRouter from "./router/roles.router.js";

const app = express();

app.use(rolesRouter);

export default app;
