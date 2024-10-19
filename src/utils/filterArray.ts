import { ExerciseWithSets, Filter } from "@/types/types";
import { Workout } from "@prisma/client";

export const filterArray = (filter: Filter, query: string, array: Workout[] | ExerciseWithSets[]) => {
  const filteredArrayByQuery = array.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  switch (filter) {
    case "a-z":
      return filteredArrayByQuery.sort((a, b) => a.name.localeCompare(b.name));

    case "z-a":
      return filteredArrayByQuery.sort((a, b) => b.name.localeCompare(a.name));

    case "times completed lowest to highest":
      return filteredArrayByQuery.sort((a, b) => a.timesCompleted - b.timesCompleted);

    case "times completed highest to lowest":
      return filteredArrayByQuery.sort((a, b) => b.timesCompleted - a.timesCompleted);

    case "last completed latest to oldest":
      return filteredArrayByQuery.sort((a, b) => {
        const timeA = a.lastCompletedAt ? a.lastCompletedAt.getTime() : Infinity;
        const timeB = b.lastCompletedAt ? b.lastCompletedAt.getTime() : Infinity;

        return timeA - timeB;
      });

    case "last completed oldest to latest":
      return filteredArrayByQuery.sort((a, b) => {
        const timeA = a.lastCompletedAt ? a.lastCompletedAt.getTime() : Infinity;
        const timeB = b.lastCompletedAt ? b.lastCompletedAt.getTime() : Infinity;

        return timeB - timeA;
      });

    case "created latest to oldest":
      return filteredArrayByQuery.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    case "created oldest to latest":
      return filteredArrayByQuery.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    default:
      return array;
  }
};
