"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
}

export function NavLink({ children, href, icon }: NavLinkProps): JSX.Element {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`ui-flex ui-text-base ui-leading-[1.25] ui-h-min ui-flex-shrink ui-items-center ui-rounded-lg ui-p-3 ui-gap-3 ui-border ui-border-transparent hover:ui-border-white/[0.06] ui-group ui-transition ${
        active
          ? "ui-bg-gray-900 ui-text-white"
          : "ui-bg-gray-950 ui-text-white/70 hover:ui-text-white"
      }`}
    >
      {icon ? (
        <span className="ui-text-white/70 group-hover:ui-text-white ui-transition">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </Link>
  );
}
