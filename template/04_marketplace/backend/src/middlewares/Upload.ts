import multer from "multer";
import storage, { fileFilter } from "../configs/storageFile";

const UploadFile = multer({
    storage: storage,
});

export default UploadFile;
