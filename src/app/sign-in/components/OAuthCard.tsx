"use client";

import { signInWithProvider } from "@/app/actions/supabaseAuth";
import { Provider } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

type Props = {
  imgSrc: string;
  providerName: Provider;
  disabled: boolean;
  startSigningIn: React.TransitionStartFunction;
};

export function OAuthCard({ providerName, imgSrc, disabled, startSigningIn }: Props) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    startSigningIn(async () => {
      const { error, url } = await signInWithProvider(providerName);

      if (error) {
        toast.error(error);
        return;
      }

      if (url) {
        router.push(url);
      }
    });
  }, [providerName, startSigningIn]);

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="flex w-full cursor-pointer items-center justify-center gap-3 border px-4 py-3 text-base first:rounded-t-lg first:border-b-0 last:rounded-b-lg hover:bg-stone-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Image src={imgSrc} alt={providerName} width={25} height={25} />
    </button>
  );
}
