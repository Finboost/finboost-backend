import { Storage } from "@google-cloud/storage";
import path from "path";

const serviceAccountPathKey = path.resolve("./serviceaccount.json");

const gcs = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: serviceAccountPathKey,
});

const bucketName = process.env.GCLOUD_BUCKET_NAME;
const bucket = gcs.bucket(bucketName);

export const deleteFileFromBucket = async (fileName) => {
    try {
        await bucket.file(fileName).delete();
    } catch (error) {
        throw error;
    }
};

export const getPublicUrl = (fileName) => {
    return `https://storage.googleapis.com/${bucketName}/${fileName}`;
};

export const getFileNameFromUrl = (url) => {
    return url.split("/").pop();
};
