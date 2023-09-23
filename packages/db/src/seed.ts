import type { PublicProfile } from "@prisma/client";
import { prisma } from ".";

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Milovan Gudelj",
    email: "me@milovangudelj.com",
  },
  {
    name: "Tim Apple",
    email: "tim@apple.com",
  },
] as Partial<PublicProfile>[];

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((publicProfile) =>
        prisma.publicProfile.upsert({
          where: {
            email: publicProfile.email!,
          },
          update: {
            ...publicProfile,
          },
          create: {
            ...publicProfile,
          },
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
