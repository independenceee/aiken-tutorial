import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        callback(null, true);
    } else {
        callback(null, true);
    }
};

const storage = multer.diskStorage({
    destination: function (request: Request, file: Express.Multer.File, callback: DestinationCallback): void {
        const { destination } = request.query;

        if (destination) {
            callback(null, `public/${destination}`);
        } else {
            callback(null, `public`);
        }
    },

    filename: function (request: Request, file: Express.Multer.File, callback: FileNameCallback): void {
        callback(null, Date.now() + "-" + file.originalname);
    },
});

export default storage;
