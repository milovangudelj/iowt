import Link from "next/link";
import { Calendar, Goggles, Sun, Trophy, UsersThree } from "icons";

import { NavLink, Logo, NavUser } from "./";

export function Navbar(): JSX.Element {
  return (
    <div className="ui-flex-none ui-flex ui-flex-col ui-w-72 ui-px-4 ui-py-8 ui-gap-6 ui-border-outline-primary ui-border-r">
      <div className="ui-flex ui-items-center ui-justify-between ui-pb-6 ui-border-b ui-border-outline-primary">
        <Link href="/" className="ui-flex ui-gap-2 ui-items-center">
          <Logo />
          <span className="ui-text-[19.2px] ui-font-medium">IOWT</span>
        </Link>
        <button className="ui-p-2 hover:ui-bg-surface-2 ui-rounded ui-text-type-me hover:ui-text-type-he ui-transition ui-border-outline-primary">
          <Sun size={16} />
        </button>
      </div>
      <nav className="ui-flex-1">
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
      <div className="ui-pt-6 ui-border-t ui-border-outline-primary">
        <NavUser />
      </div>
    </div>
  );
}
