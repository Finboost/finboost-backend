import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/api.js";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";

const app = express();
const port = process.env.EXPRESS_PORT || 5000;

const swaggerDocument = JSON.parse(
    await readFile(new URL("../openapi.json", import.meta.url))
);

app.use(
    cors({
        credentials: true,
        origin: "*",
    })
);

app.use(cookieParser());
app.use(express.json());

app.use(
    `${process.env.API_VERSION}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use(`${process.env.API_VERSION}`, routes);

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
