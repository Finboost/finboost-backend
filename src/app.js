import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/api.js";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
import multer from "multer";

const app = express();
const port = process.env.EXPRESS_PORT || 8080;

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

app.use((err, req, res, next) => {
    let status;
    let message = "";
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            status = 400;
            message = "File too large. Maximum size is 2MB.";
        }
    } else {
        status = err.status || 500;
        message = err.message || "Internal Server Error";
    }
    res.status(status).send({
        status: "fail",
        message,
    });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
