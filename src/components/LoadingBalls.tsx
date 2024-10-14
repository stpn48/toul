"use client";

export function LoadingBalls({}) {
  return (
    <div className="mt-10 flex w-full justify-center gap-1">
      <div
        className="ball-animation h-2 w-2 animate-pulse rounded-full bg-stone-300 dark:bg-stone-900"
        style={{
          animationDelay: "0s",
        }}
      ></div>
      <div
        className="ball-animation h-2 w-2 animate-pulse rounded-full bg-stone-300 dark:bg-stone-900"
        style={{
          animationDelay: "0.1s",
        }}
      ></div>
      <div
        className="ball-animation h-2 w-2 animate-pulse rounded-full bg-stone-300 dark:bg-stone-900"
        style={{
          animationDelay: "0.2s",
        }}
      ></div>
    </div>
  );
}
