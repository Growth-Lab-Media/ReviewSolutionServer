import { Response } from "express";

export const setCookie = (
    res: Response,
    token: string,
    isAdmin?: boolean,
    isStreamer?: boolean
) => {
    res.cookie(isAdmin ? "token-admin" : isStreamer ? "token-streamer" : "token", token, {
        domain: process.env.NEXT_PUBLIC_API_URI ?? "localhost",
        expires: new Date(new Date().setDate(new Date().getDate() + 10)),
        maxAge: 1 * 7 * 24 * 60 * 60 * 1000,
        path: "/",
        httpOnly: false,
        sameSite: "none",
        secure: true,
    });
};
