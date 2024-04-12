import prisma from "@/lib/db";
import { config } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function handle(req, res) {
  try {
    const session = await getServerSession(req, res, config);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findMany({
      where: {
        email: session.user.email,
      }, select :  {
        id: true,
        name: true,
        gamertag: true,
        role: true,
        emailVerified: true,
        image: true,
        isVerified: true,
        lightningAddress: true,
        publicBio: true,
        publicStaticCharge: true,
        social: true,
        balance: true,
        remainingAmountLimits: true,
        skill: true,
        location: true,
        availability: true
      }
    });

    res.json(user[0]);
  } catch (error) {
    console.log(error);
  }
}
