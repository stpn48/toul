import React from "react";

export function UserDetails() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-5 w-5 rounded-full bg-black"></div>
        <h1>User Name</h1>
      </div>
    </div>
  );
}
