import express from "express";
import rolesRouter from "./router/roles.router.js";
import authsRouter from "./router/auths.router.js";
import tokensRouter from "./router/tokens.router.js";
import usersRouter from "./router/users.router.js";
import worksRouter from "./router/works.router.js";
import educationsRouter from "./router/educations.router.js";
import chatRoomsRouter from "./router/chat-rooms.router.js";
import chatAiRouter from "./router/chat-ai.router.js";

const app = express();

app.use(rolesRouter);
app.use(authsRouter);
app.use(tokensRouter);
app.use(usersRouter);
app.use(worksRouter);
app.use(educationsRouter);
app.use(chatRoomsRouter)
app.use(chatAiRouter)

export default app;
