import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllViews = async (input: string): Promise<any> => {
    try {
        const view = await prisma.view.findMany({
            where: {
                restaurant: input,
            },
        });

        if (!view) {
            return { err: true, msg: "views introuvables" };
        }
        return {
            err: false,
            response: { data: view },
        };
    } catch (error) {
        console.error(error);
        return { err: true, msg: "Erreur interne du serveur" };
    }
};

const CreateView = async (input: any): Promise<any> => {
    try {
        const view = await prisma.view.create({
            data: { ...input },
        });
        if (!view) {
            return { err: true, msg: "Error create view" };
        }
        return {
            err: false,
            msg: "view créée",
            response: { data: view },
        };
    } catch (error) {
        console.error(error);
        return { err: true, msg: "Erreur interne du serveur" };
    }
};

export { CreateView, getAllViews };
