import { LoadingBalls } from "@/components/LoadingBalls";
import { Modal } from "@/components/Modal";
import CreateExerciseModalHeader from "../CreateExerciseModal/CreateExerciseModalHeader";

export function LoadingSkeleton() {
  return (
    <Modal closeModal={() => {}} className="flex h-[70%] w-[70%] flex-row text-sm">
      <section className="h-full w-[30%] rounded-l-lg bg-[#faf8f6] p-6">
        <div className="flex flex-col gap-4">
          <div className="h-[30px] w-full animate-pulse rounded-md bg-stone-500" />
          <div className="h-[20px] w-full animate-pulse rounded-md bg-stone-500" />
        </div>
      </section>

      <section className="h-full flex-grow p-4">
        <CreateExerciseModalHeader loading={true} />

        <div className="mt-10 flex h-[80%] flex-col gap-4">
          <LoadingBalls />
        </div>

        <button
          disabled={true}
          className="absolute bottom-4 right-4 flex w-fit justify-center rounded-full bg-amber-500 px-4 py-2 text-white"
        >
          Edit Exercise
        </button>
      </section>
    </Modal>
  );
}
