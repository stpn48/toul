import Button from "@/components/Button";
import { LoadingBalls } from "@/components/LoadingBalls";
import { Modal } from "@/components/Modal";
import CreateExerciseModalHeader from "../CreateExerciseModal/CreateExerciseModalHeader";

export function LoadingSkeleton() {
  // TODO: Improve design
  return (
    <Modal closeModal={() => {}} className="flex h-[70%] w-[70%] flex-row text-sm">
      <section className="bg-secondary dark:bg-dark-secondary h-full w-[30%] rounded-l-lg p-6">
        <div className="flex flex-col gap-4">
          <div className="h-[30px] w-full animate-pulse rounded-md bg-stone-300 dark:bg-stone-900" />
          <div className="h-[20px] w-full animate-pulse rounded-md bg-stone-300 dark:bg-stone-900" />
        </div>
      </section>

      <section className="h-full flex-grow p-4">
        <CreateExerciseModalHeader loading={true} />

        <div className="mt-10 flex h-[80%] flex-col gap-4">
          <LoadingBalls />
        </div>

        <Button disabled={true} className="absolute bottom-4 right-4">
          Edit Exercise
        </Button>
      </section>
    </Modal>
  );
}
