"use client";

import React, { ReactNode, lazy } from "react";
const SmartcontextProvider = lazy(
    () => import("~/contexts/providers/SmartcontractProvider")
);

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return <SmartcontextProvider>{children}</SmartcontextProvider>;
};

export default ContextProvider;
