import express, { Request, Response, Router } from "express";
import { verifyToken } from "../TokenCheck";
import { clearCookie, setCookie } from "../utils";
import { getAdmin, signIn, updateAdmin } from "./admin.service";

const adminpath: Router = express.Router();

adminpath.post("/signin", async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const newUser = await signIn({ email: data.email, password: data.password });
    const { err, response } = newUser;
    if (!err && response) setCookie(res, response.token, true);
    res.json(newUser);
});
adminpath.get("/getprofile/:id", verifyToken, async (req: Request, res: Response) => {
    const id = req.user.id;
    if (id) {
        const admin = await getAdmin(parseInt(id));
        if (admin) {
            res.json(admin);
        } else {
            return res.status(404).json({ message: "Administrateur introuvable" });
        }
    } else {
        return res.status(400).json({ message: "ID d'administrateur invalide" });
    }
});
adminpath.post("/updateAdmin", verifyToken, async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const admin = await updateAdmin(data.id, data);
    res.json(admin);
});
adminpath.get("/logout", verifyToken, async (req: Request, res: Response) => {
    clearCookie(res, true);
    return res.status(200).send({ err: false, msg: "deconnecter !", response: null });
});
adminpath.get("/session", verifyToken, async (req: Request, res: Response) => {
    const session = req.user;
    if (session)
        return res.status(200).send({ err: false, response: session, msg: "session found" });
    return res.status(403).send({ err: true, response: null, msg: "not authorized" });
});
export { adminpath };
