import { getServerSession } from "next-auth";
import { authOptions } from "../libs/config/authOptions";

import prisma from "@/app/libs/Prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();
        if (!session?.user?.email) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }
        return currentUser;
        // {
        //     ...currentUser,
        //         createdAt: currentUser.createdAt.toISOString(),
        //             updatedAt: currentUser.updatedAt.toISOString(),
        //                 emailVerified: currentUser.emailVerified?.toISOString() || null,
        // };
    } catch (error: any) {
        return null;
    }
}