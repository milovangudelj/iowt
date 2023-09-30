import {
  prisma,
  Prisma,
  type User,
  type Athlete,
  type Team,
  type Venue,
  type Competition,
  type Race,
} from ".";

const DEFAULT_USERS: User[] = [
  {
    id: "188c1a55-6759-4844-8291-0091fe32fa9d",
    email: "me@milovangudelj.com",
    name: "Milovan",
    surname: "Gudelj",
    phone: "+31612345678",
    role: "ADMIN",
  },
  {
    id: "b0fab793-24a4-4892-a1a4-3d13694181fc",
    email: "tim@apple.com",
    name: "Tim",
    surname: "Apple",
    phone: "+31612345678",
    role: "USER",
  },
  {
    id: "c98d7120-2e6b-4d69-bf38-a6c518b770f2",
    email: "michael.phelps@gmail.com",
    name: "Michael",
    surname: "Phelps",
    phone: "+31612345678",
    role: "USER",
  },
];

const DEFAULT_TEAMS: Team[] = [
  {
    id: "af698501-6535-4403-aafb-71756838a391",
    name: "Team Italy",
    description: "The Italian national team",
    logo: "https://upload.wikimedia.org/wikipedia/it/8/8c/FIN_logo.png",
    website: "https://www.federnuoto.it/",
    country: "Italy",
  },
  {
    id: "d6840681-ba63-490a-928f-5e97ca6751c0",
    name: "Team USA",
    description: "The American national team",
    logo: "https://www.usaswimming.org/ResourcePackages/Usas/assets/dist/images/ShieldWebsiteMain.svg",
    website: "https://www.usaswimming.org/",
    country: "USA",
  },
];

const DEFAULT_ATHLETES: Athlete[] = [
  {
    id: "59e368a8-7c9e-4348-b73d-65033d9bf190",
    userId: "188c1a55-6759-4844-8291-0091fe32fa9d",
    teamId: "af698501-6535-4403-aafb-71756838a391",
    birth_date: new Date("1998-09-15"),
    birth_place: "Trebinje (Bosnia and Herzegovina)",
    nationality: "Italian",
    gender: "Male",
    fiscal_code: "XXXXXXXXXXXXXXXX",
    address: "Via Carrera 40",
    city: "Agordo",
    province: "Belluno",
    zip_code: "32021",
    country: "Italy",
    medical_certificate: null,
    medical_certificate_expiration_date: null,
    medical_certificate_valid: false,
  },
  {
    id: "03b8f439-ff90-4d33-a789-79d4ab0c1984",
    userId: "c98d7120-2e6b-4d69-bf38-a6c518b770f2",
    teamId: "d6840681-ba63-490a-928f-5e97ca6751c0",
    birth_date: new Date("1985-06-30"),
    birth_place: "Baltimore (USA)",
    nationality: "American",
    gender: "Male",
    fiscal_code: "XXXXXXXXXXXXXXXX",
    address: "Fulton Avenue 131",
    city: "Baltimore",
    province: "Maryland",
    zip_code: "21223",
    country: "USA",
    medical_certificate: null,
    medical_certificate_expiration_date: null,
    medical_certificate_valid: false,
  },
];

const DEFAULT_VENUES: Venue[] = [
  {
    id: "4491286a-f1ba-4689-976d-2244ccf83f4d",
    name: "Spiaggia dei Pescatori",
    description: "La spiaggia più bella di Ischia",
    address: "Spiaggia dei Pescatori",
    city: "Ischia",
    province: "Napoli",
    zip_code: "80077",
    country: "Italy",
    website: "https://maps.app.goo.gl/FnmZ5T8a6XVmVrRZ7",
    latitude: new Prisma.Decimal(40.737698),
    longitude: new Prisma.Decimal(13.955037),
  },
];

const DEFAULT_COMPETITIONS: Competition[] = [
  {
    id: "e9782456-c705-468b-8cd3-1d678ee2df10",
    name: "Ischia - 2023",
    description: "La gara di nuoto più bella della Campania",
    start_date: new Date("2023-10-07"),
    end_date: new Date("2023-10-08"),
    venueId: "4491286a-f1ba-4689-976d-2244ccf83f4d",
  },
];

const DEFAULT_RACES: (Race & { athletes: string[] })[] = [
  {
    id: "66730295-d67b-4050-b30d-62a989a99a4f",
    name: "Smile Swim",
    description: "",
    distance: 1800,
    fraction: 1800,
    indoors: false,
    relay: false,
    max_time: 1000 * 60 * 60,
    when: new Date("2023-10-08T13:30:00Z"),
    competitionId: "e9782456-c705-468b-8cd3-1d678ee2df10",
    athletes: [],
  },
  {
    id: "35bc35db-f390-4c6c-b4ea-f63363656d61",
    name: "Super Smile Swim",
    description: "",
    distance: 3000,
    fraction: 3000,
    indoors: false,
    relay: false,
    max_time: 1000 * 60 * 105,
    when: new Date("2023-10-07T12:00:00Z"),
    competitionId: "e9782456-c705-468b-8cd3-1d678ee2df10",
    athletes: ["59e368a8-7c9e-4348-b73d-65033d9bf190"],
  },
  {
    id: "a16de8b7-f8c2-425c-a2fd-26805722f0c2",
    name: "Hard Swim",
    description: "",
    distance: 6000,
    fraction: 6000,
    indoors: false,
    relay: false,
    max_time: 1000 * 60 * 165,
    when: new Date("2023-10-08T09:30:00Z"),
    competitionId: "e9782456-c705-468b-8cd3-1d678ee2df10",
    athletes: ["03b8f439-ff90-4d33-a789-79d4ab0c1984"],
  },
  {
    id: "39fa2989-1954-4e00-a338-088909aa9f07",
    name: "Relay Swim",
    description: "",
    distance: 2700,
    fraction: 900,
    indoors: false,
    relay: true,
    max_time: 1000 * 60 * 75,
    when: new Date("2023-10-07T14:45:00Z"),
    competitionId: "e9782456-c705-468b-8cd3-1d678ee2df10",
    athletes: [],
  },
];

(async () => {
  try {
    const d_users = await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            id: user.id,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        })
      )
    );

    const d_teams = await Promise.all(
      DEFAULT_TEAMS.map((team) =>
        prisma.team.upsert({
          where: {
            id: team.id,
          },
          update: {
            ...team,
          },
          create: {
            ...team,
          },
        })
      )
    );

    const d_athletes = await Promise.all(
      DEFAULT_ATHLETES.map((athlete) =>
        prisma.athlete.upsert({
          where: {
            id: athlete.id,
          },
          update: {
            ...athlete,
          },
          create: {
            ...(() => {
              const { userId, teamId, ...rest } = athlete;
              return rest;
            })(),
            user: {
              connect: {
                id: athlete.userId,
              },
            },
            team: athlete.teamId
              ? {
                  connect: {
                    id: athlete.teamId,
                  },
                }
              : undefined,
          },
        })
      )
    );

    const d_venues = await Promise.all(
      DEFAULT_VENUES.map((venue) =>
        prisma.venue.upsert({
          where: {
            id: venue.id,
          },
          update: {
            ...venue,
          },
          create: {
            ...venue,
          },
        })
      )
    );

    const d_competitions = await Promise.all(
      DEFAULT_COMPETITIONS.map((competition) =>
        prisma.competition.upsert({
          where: {
            id: competition.id,
          },
          update: {
            ...competition,
          },
          create: {
            ...(() => {
              const { venueId, ...rest } = competition;
              return rest;
            })(),
            venue: {
              connect: {
                id: competition.venueId,
              },
            },
          },
        })
      )
    );

    const d_races = await Promise.all(
      DEFAULT_RACES.map((race) =>
        prisma.race.upsert({
          where: {
            id: race.id,
          },
          update: {
            ...(() => {
              const { athletes, ...rest } = race;
              return rest;
            })(),
          },
          create: {
            ...(() => {
              const { competitionId, athletes, ...rest } = race;
              return rest;
            })(),
            competition: {
              connect: {
                id: race.competitionId,
              },
            },
            athletes:
              race.athletes.length === 0
                ? undefined
                : {
                    connect: race.athletes.map((athleteId) => ({
                      id: athleteId,
                    })),
                  },
          },
        })
      )
    );

    console.log({
      users: d_users,
      athletes: d_athletes,
      teams: d_teams,
      venues: d_venues,
      competitions: d_competitions,
      races: d_races,
    });
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
