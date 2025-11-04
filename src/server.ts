import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { Server } from "http";
import seedSuperAdmin from "./app/db";

let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        seedSuperAdmin();

        server = app.listen(config.port, () => {
            console.log(`Tex University Server is Runing on ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
};
main();

process.on('unhandledRejection', () => {
    console.log(`🔐 unhandledRejection is detected! shutting down.`);
    if (server) {
        server.close(() => {
            process.exit();
        });
    }
    process.exit(1);
});

process.on('uncaughtException', () => {
    console.log(`🔐 uncaughtException is detected! shutting down.`);
    process.exit(1);
});