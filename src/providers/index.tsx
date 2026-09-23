import React, { ReactNode } from "react";
import QuesryProvider from "./query.provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return <QuesryProvider>{children}</QuesryProvider>;
};

export default Providers;
