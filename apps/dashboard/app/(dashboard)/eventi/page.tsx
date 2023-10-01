import { prisma } from "db";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventi - IOWT",
  description: "Eventi in programma per l'IOWT 2023",
};

export default async function Page(): Promise<JSX.Element> {
  const competitions = await prisma.competition.findMany({
    include: {
      venue: true,
    },
  });

  return (
    <main className="flex flex-1 min-h-screen flex-col px-4 py-8 gap-8">
      <h1 className="text-2xl font-medium">Eventi</h1>
      <ul className="flex flex-col gap-4">
        {competitions.map((competition) => (
          <li key={competition.id} className="">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-teal-500">
                {competition.name}
              </h2>
              <p className="text-white/70">
                Dal{" "}
                <span className="font-medium text-white">
                  {format(competition.start_date, "do MMM y", { locale: it })}
                </span>{" "}
                al{" "}
                <span className="font-medium text-white">
                  {format(competition.end_date, "do MMM y", { locale: it })}
                </span>
              </p>
            </div>
            <div className="flex gap-2 mt-2 text-sm text-white/40">
              <span>{competition.venue.name}</span>
              <span>-</span>
              <span>{competition.venue.city}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
