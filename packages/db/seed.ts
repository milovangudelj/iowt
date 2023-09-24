import { prisma, type PublicProfile } from ".";

const DEFAULT_PROFILES = [
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
      DEFAULT_PROFILES.map((profile) =>
        prisma.publicProfile.upsert({
          where: {
            email: profile.email!,
          },
          update: {
            ...profile,
          },
          create: {
            ...profile,
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
