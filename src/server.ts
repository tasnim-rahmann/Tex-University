import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function main() {
    try {
        await mongoose.connect(config.database_url as string);

        app.listen(config.port, () => {
            console.log(`Tex University Server is Runing on ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
};
main();