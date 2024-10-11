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
  {
    title: "Completed Workouts",
    href: "/app/completed-workouts",
  },
];

export function SidebarLinks() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      {links.map((link) => (
        <Link
          prefetch={true}
          className="dark:text-secondary text-black hover:text-[#454545] dark:hover:text-white"
          key={link.title}
          href={link.href}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
