import React, { ReactNode } from "react";
import PublicHeader from "./_components/publicHeader/publicHeader";

const PublicGroupLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default PublicGroupLayout;
