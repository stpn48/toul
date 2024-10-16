import React from "react";

export default function CompletedExercisesPageSkeleton() {
  return (
    <div>
      <h1 className="flex w-full justify-center text-2xl font-bold">your completed exercises</h1>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {Array(10)
          .fill("")
          .map((exercise) => (
            <div className="h-[120px] w-[200px] animate-pulse rounded-lg bg-stone-400 dark:bg-stone-900" key={exercise}></div>
          ))}
      </div>
    </div>
  );
}
