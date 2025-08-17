// components/Nav/SideNavLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
};

export default function SideNavLink({ href, children, exact = false }: Props) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`
        text-white font-medium text-[24px] p-2 rounded-md
        hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20
        w-10/12 text-center
        ${isActive ? "bg-white/15 font-medium" : "text-white"}
      `}
    >
      {children}
    </Link>
  );
}
