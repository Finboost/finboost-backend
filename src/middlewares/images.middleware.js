import multer from "multer";
import dateFormat from "dateformat";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { getPublicUrl } from "../utils/bucket.util.js";
import { getUserById } from "../service/users.service.js";
import { NotFoundError } from "../exceptions/client.exception.js";

const serviceAccountPathKey = path.resolve("./serviceaccount.json");

const gcs = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: serviceAccountPathKey,
});

const bucketName = process.env.GCLOUD_BUCKET_NAME;
const bucket = gcs.bucket(bucketName);

const multerStorage = multer.memoryStorage();

// Validasi file extensions
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ["image/jpeg", "image/png"];
    if (!allowedExtensions.includes(file.mimetype)) {
        const error = new Error(
            "Invalid file type. Only JPG, PNG are allowed!"
        );
        error.status = 400;
        return cb(error);
    }
    cb(null, true);
};

export const uploadAvatar = multer({
    storage: multerStorage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter,
});

export const uploadToGcs = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

        await getUserById(req.params.userId, res);

        const uniqueId = uuidv4();
        const extension = req.file.mimetype.split("/")[1];
        const fileName = `${req.params.userId}-${dateFormat(
            new Date(),
            "yyyymmdd-HHMMss"
        )}.${extension}`;
        const file = bucket.file(fileName);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        stream.on("error", (err) => {
            req.file.cloudStorageError = err;
            next(err);
        });

        stream.on("finish", () => {
            req.file.cloudStorageObject = fileName;
            req.file.cloudStoragePublicUrl = getPublicUrl(fileName);
            next();
        });

        stream.end(req.file.buffer);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return;
        }
    }
};
