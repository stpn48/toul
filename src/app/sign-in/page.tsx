"use client";

import { Provider } from "@supabase/supabase-js";
import React, { useTransition } from "react";
import { OAuthCard } from "./components/OAuthCard";

type OAuthProvider = {
  providerName: Provider; // Here we specify the providerName type
  imgSrc: string;
};

const oAuthProviders: OAuthProvider[] = [
  {
    providerName: "google",
    imgSrc: "/google.png",
  },
  {
    providerName: "github",
    imgSrc: "/github.png",
  },
];

export default function SignInPage() {
  const [isSigningIn, startSigningIn] = useTransition();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-8 rounded-md border p-10">
        <h1 className="text-2xl font-bold">Sign in to Toul</h1>
        <div className="flex w-[250px] flex-col">
          {oAuthProviders.map((provider) => (
            <OAuthCard
              key={provider.providerName}
              providerName={provider.providerName}
              imgSrc={provider.imgSrc}
              disabled={isSigningIn}
              startSigningIn={startSigningIn}
            />
          ))}
        </div>
      </div>
      <p className="w-[250px] text-center text-xs text-[#bababa]">
        By signing in you agree to our Terms of Service and Privacy Policy.
      </p>
      <p className="absolute bottom-4 left-4 text-xs text-[#bababa]">
        Toul® 2024 All Rights Reserved
      </p>
    </div>
  );
}
