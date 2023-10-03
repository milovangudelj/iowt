import { format } from "date-fns";
import { it } from "date-fns/locale";
import { prisma } from "db";

export default async function Page(): Promise<JSX.Element> {
  const races = await prisma.race.findMany({
    include: {
      athletes: true,
    },
  });

  return (
    <>
      <h1 className="text-2xl font-medium">Gare</h1>
      <ul className="flex flex-col gap-4">
        {races.map((race) => (
          <li key={race.id} className="">
            <div className="flex gap-2">
              <h2>{race.name}</h2>
              <span>-</span>
              <p>{format(race.when, "do MMM y", { locale: it })}</p>
            </div>
            <div className="flex gap-2">
              <span>{race.distance}m</span>
              <span>-</span>
              <span>
                {race.athletes.length} / {race.max_athletes}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
