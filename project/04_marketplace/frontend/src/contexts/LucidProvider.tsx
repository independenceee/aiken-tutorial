"use client";

import React, { ReactNode, useState, createContext } from "react";
import { Lucid } from "lucid-cardano";

type Props = {
    children: ReactNode;
};

export type LucidContextType = {
    lucid: Lucid;
    setLucid: React.Dispatch<React.SetStateAction<Lucid>>;
};

export const LucidContext = createContext<LucidContextType>(null!);

const LucidProvider = function ({ children }: Props) {
    const [lucid, setLucid] = useState<Lucid>(null!);

    return (
        <LucidContext.Provider
            value={{
                lucid,
                setLucid,
            }}
        >
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
