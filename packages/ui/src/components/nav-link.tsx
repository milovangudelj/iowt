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
      className={`ui-flex ui-text-base ui-leading-[1.25] ui-h-min ui-flex-shrink ui-items-center ui-rounded-lg ui-p-3 ui-gap-3 ui-border ui-border-transparent hover:ui-border-outline-primary ui-group ui-transition ${
        active
          ? "ui-bg-surface-2 ui-text-type-he"
          : "ui-bg-surface-1 ui-text-type-me hover:ui-text-type-he"
      }`}
    >
      {icon ? (
        <span className="ui-text-type-me group-hover:ui-text-type-he ui-transition">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </Link>
  );
}
