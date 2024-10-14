"use client";

import Image from "next/image";
import Link from "next/link";

const links = [
  {
    title: "Your Workouts",
    href: "/app/your-workouts",
  },
  {
    title: "Completed Exercises",
    href: "/app/completed-exercises",
  },
];

export function SidebarLinks() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      {links.map((link) => (
        <Link
          prefetch={true}
          className="dark:hover:bg-dark-hover text-main dark:text-dark-main hover:bg-hover flex w-full items-center gap-2 rounded-lg p-2"
          key={link.title}
          href={link.href}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
