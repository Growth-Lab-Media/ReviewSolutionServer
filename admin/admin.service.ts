import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
interface interfaceSignin {
    email: string;
    password: string;
}
const signIn = async ({
    email,
    password,
}: interfaceSignin): Promise<{
    err: boolean;
    msg: string;
    response?: {
        id: number;
        token: string;
    };
}> => {
    try {
        // Find admin by email
        const admin = await prisma.admin.findFirst({ where: { email: email } });
        console.log(admin);
        if (!admin) {
            return { err: true, msg: "Email ou mot de passe invalide" };
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return { err: true, msg: "Email ou mot de passe invalide" };
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
                isAdmin: true,
            },
            process.env.JWT_SECRET ? process.env.JWT_SECRET : "THEWEBISMINE"
        );

        return {
            err: false,
            msg: "Connecté avec succès",
            response: {
                id: admin.id,
                token: token,
            },
        };
    } catch (error) {
        console.error(error);
        return { err: true, msg: "Erreur interne du serveur" };
    }
};
const getAdmin = async (id: number): Promise<any> => {
    try {
        // Find admin by id
        const admin = await prisma.admin.findUnique({ where: { id } });

        if (!admin) {
            return { err: true, msg: "Administrateur introuvable" };
        }
        return {
            err: false,
            response: { admin: admin },
        };
    } catch (error) {
        console.error(error);
        return { err: true, msg: "Erreur interne du serveur" };
    }
};

const updateAdmin = async (id: number, input: any): Promise<any> => {
    try {
        const Admin = await prisma.admin.update({
            where: {
                id: id,
            },
            data: { ...input, updateDate: new Date() },
        });
        return {
            err: false,
            response: { Admin },
            msg: "Administrateur mis à jour avec succès ",
        };
    } catch (error) {
        return { err: true, msg: "Administrateur erreur mise à jour" };
    }
};

export { getAdmin, signIn, updateAdmin };
