import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import net from "net";
import { adminpath } from "./admin/admin.route";
import { config } from "./config";
import { ViewsPath } from "./view/view.route";

const server = express();

server.use(
    cors({
        origin: (origin, callback) => {
            return callback(null, true);
        },
        credentials: true,
    })
);
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser("thisIsSecret"));
server.use(morgan("tiny"));

server.use("/adminpath", adminpath);
server.use("/ViewsPath", ViewsPath);

server.get("/", (req: Request, res: Response) => {
    res.send("pong");
});
server.get("/webhook", async (req: Request, res: Response) => {
    let chalenge = req.get("hub_challenge");
    let verify_challenge = req.get("hub_verify_token");
    res.send(chalenge);
});
const portInUse = async (port: any) => {
    return new Promise((resolve) => {
        const tester: any = net
            .createServer()
            .once("error", () => resolve(true))
            .once("listening", () => tester.once("close", () => resolve(false)).close())
            .listen(port);
    });
};

const startServer = async () => {
    const isPortInUse = await portInUse(config.port);
    if (isPortInUse) {
        console.log(`Port ${config.port} is already in use. Server will not start.`);
    } else {
        server.listen(config.port);
        console.info("something new from port:", config.port);
        console.info({
            origin: "https://reviewsolution-production-d373.up.railway.app",
            credentials: true,
        });
    }
};

startServer();
