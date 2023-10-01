import Link from "next/link";
import { Calendar, Goggles, Sun, Trophy, UsersThree } from "icons";

import { NavLink, Logo } from "./";

export function Navbar(): JSX.Element {
  return (
    <div className="ui-flex-1 ui-flex ui-flex-col ui-max-w-xs ui-px-4 ui-py-8 ui-gap-6 ui-bg-gray-950">
      <div className="flex ui-items-center ui-justify-between ui-pb-6 ui-border-b ui-border-white/[0.06]">
        <Link href="/" className="flex ui-gap-2 ui-items-center">
          <Logo />
          <span className="ui-text-[19.2px] ui-font-medium">IOWT</span>
        </Link>
        <button className="ui-p-1">
          <Sun size={16} />
        </button>
      </div>
      <nav>
        <ul className="ui-gap-1 ui-flex ui-flex-col">
          <li>
            <NavLink href="/eventi" icon={<Calendar size={20} />}>
              Eventi
            </NavLink>
          </li>
          <li>
            <NavLink href="/gare" icon={<Goggles size={20} />}>
              Gare
            </NavLink>
          </li>
          <li>
            <NavLink href="/risultati" icon={<Trophy size={20} />}>
              Risultati
            </NavLink>
          </li>
          <li>
            <NavLink href="/team" icon={<UsersThree size={20} />}>
              I miei team
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
