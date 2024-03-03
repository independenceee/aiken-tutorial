import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";

const logEvents = async function (message: string, logFileName: any) {
    const dateTime: string = format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logItem: string = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
        }

        await fsPromise.appendFile(
            path.join(__dirname, "..", "logs", logFileName),
            logItem,
        );
    } catch (error) {
        console.log(error);
    }
};

export default logEvents;
