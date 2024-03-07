"use client";

import React, { ReactNode, useState } from "react";
import LucidContext from "../components/LucidContext";
import { Lucid } from "lucid-cardano";

type Props = {
    children: ReactNode;
};

const LucidProvider = function ({ children }: Props) {
    const [lucid, setLucid] = useState<Lucid>(null!);
    return (
        <LucidContext.Provider value={{ lucid, setLucid }}>
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
