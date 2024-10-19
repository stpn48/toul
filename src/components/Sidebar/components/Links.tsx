"use client";

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
          className="flex w-full items-center gap-2 rounded-lg p-2 text-main hover:bg-hover dark:text-dark-main dark:hover:bg-dark-hover"
          key={link.title}
          href={link.href}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
