"use client";

import React, { useState, ReactNode } from "react";
import GlobalStateContext from "@/contexts/components/GlobalStateContext";
import { RevalidateType } from "@/types/GenericsType";

type Props = {
    children: ReactNode;
};

const GlobalStateProvider = function ({ children }: Props) {
    const [revalidate, setRevalidate] = useState<RevalidateType>({
        follower: false,
        account: false,
        following: false,
    });

    return <GlobalStateContext.Provider value={{ revalidate, setRevalidate }}>{children}</GlobalStateContext.Provider>;
};

export default GlobalStateProvider;
