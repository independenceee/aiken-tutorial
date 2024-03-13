"use client";

import React, { useContext } from "react";
import LucidContext from "~/contexts/components/LucidContext";
import WalletContext from "~/contexts/components/WalletContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import { WalletContextType } from "~/types/contexts/WalletContextType";

type Props = {};

const Giftcard = function ({}: Props) {
    const { connect } = useContext<WalletContextType>(WalletContext);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    return (
        <div>
            {!lucid ? (
                <div className="mt-10 grid grid-cols-1 gap-y-8">
                    <button onClick={connect} className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100">
                        Connect Wallet
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Giftcard;
