import express, { Request, Response, Router } from "express";
import { verifyToken } from "../TokenCheck";
import { CreateView, getAllViews } from "./view.service";
const ViewsPath: Router = express.Router();

ViewsPath.post("/getAllViews/:input", verifyToken, async (req: Request, res: Response) => {
    const input = req.params.input;
    if (input) {
        const response = await getAllViews(input);
        if (response) {
            res.json(response);
        } else {
            return res.status(404).json({ message: "Views introuvables" });
        }
    }
});

ViewsPath.post("/CreateView/", async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const Views = await CreateView(data);

    if (Views) {
        res.json(Views);
    } else {
        return res.status(404).json({ message: "erreur des utilisateurs" });
    }
});

export { ViewsPath };
