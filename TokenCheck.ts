import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            user?: any; // Change 'any' to the type of your user object if available
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Get token from headers, query parameters, or request body
    const token = req.cookies["token-admin"]; // Assuming token is in the format: Bearer <token>
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Non autorisé : token non fourni" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET ? process.env.JWT_SECRET : "THEWEBISMINE"
        );
        req.user = decoded;
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(401).json({ message: "Non autorisé : token invalide" });
        }
    } catch (error) {
        return res.status(403).json({ message: "Interdit : token invalide" });
    }
};
const verifyTokenUser = (req: Request, res: Response, next: NextFunction) => {
    // Get token from headers, query parameters, or request body
    const token = req.cookies["token"]; // Assuming token is in the format: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Non autorisé : token non fourni" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET ? process.env.JWT_SECRET : "THEWEBISMINE"
        );
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Interdit : token invalide" });
    }
};
const verifyTokenStreamer = (req: Request, res: Response, next: NextFunction) => {
    // Get token from headers, query parameters, or request body
    const token = req.cookies["token-streamer"]; // Assuming token is in the format: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Non autorisé : token non fourni" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET ? process.env.JWT_SECRET : "THEWEBISMINE"
        );
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Interdit : token invalide" });
    }
};

export { verifyToken, verifyTokenStreamer, verifyTokenUser };
