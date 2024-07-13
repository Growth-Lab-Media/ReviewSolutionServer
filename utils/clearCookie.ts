import { Response } from "express";

export const clearCookie = (res: Response, isAdmin?: boolean, isStreamer?: boolean) => {
    res.clearCookie(isAdmin ? "token-admin" : isStreamer ? "token-streamer" : "token", {
        domain: process.env.NEXT_PUBLIC_API_URI ?? "localhost",
        expires: new Date(new Date().setDate(new Date().getDate() + 10)),
        maxAge: 1 * 7 * 24 * 60 * 60 * 1000,
        path: "/",
        httpOnly: false,
        sameSite: "none",
        secure: true,
    });
};
