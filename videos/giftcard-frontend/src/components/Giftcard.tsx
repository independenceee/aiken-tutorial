"use client";

import Link from "next/link";
import React, { useContext } from "react";
import LucidContext from "~/contexts/components/LucidContext";
import SmartcontractContext from "~/contexts/components/SmartcontractContext";
import WalletContext from "~/contexts/components/WalletContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import { SmartcontractContextType } from "~/types/contexts/SmartcontractContextType";
import { WalletContextType } from "~/types/contexts/WalletContextType";

type Props = {};

const Giftcard = function ({}: Props) {
    const {
        tokenName,
        setTokenName,
        submitTokenName,
        parameterizedContracts,
        tAda,
        setTAda,
        lockGiftcard,
        lockTxHash,
        unLockGiftcard,
        unLockTxHash,
        waitingLockTx,
        waitingUnLockTx,
    } = useContext<SmartcontractContextType>(SmartcontractContext);
    const { connect } = useContext<WalletContextType>(WalletContext);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    return (
        <div>
            {!lucid ? (
                <div className="mt-10 grid grid-cols-1 gap-y-8">
                    <button
                        onClick={connect}
                        className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                    >
                        Connect Wallet
                    </button>
                </div>
            ) : (
                <div className="mt-10 grid grid-cols-1 gap-y-8">
                    <h3 className="mt-2 mb-2">Token name</h3>
                    <input
                        value={tokenName}
                        onChange={(event) => setTokenName(event.target.value)}
                        type="text"
                        className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                    {tokenName && (
                        <button
                            onClick={submitTokenName}
                            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                        >
                            Make contracts
                        </button>
                    )}
                </div>
            )}
            {lucid && parameterizedContracts && (
                <div className="mt-10 grid grid-cols-1 gap-8">
                    <h3 className="mt-2 mb-2">Ada:</h3>
                    <input
                        value={tAda}
                        onChange={(event) => setTAda(event.target.value)}
                        type="text"
                        className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />

                    <button
                        onClick={lockGiftcard}
                        disabled={waitingLockTx || !!lockTxHash}
                        className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                    >
                        {waitingLockTx
                            ? "waiting for tx"
                            : "Create Gift card (Lock ADA)"}
                    </button>

                    {lockTxHash && (
                        <>
                            <h3 className="mt-4 mb-2 ">
                                Ada locked: <Link href={""}>{lockTxHash}</Link>
                            </h3>

                            <button
                                onClick={unLockGiftcard}
                                disabled={waitingLockTx || !!unLockTxHash}
                                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                            >
                                {waitingUnLockTx
                                    ? "Waiting for tx ..."
                                    : "Redeem Gift card (UnLocks Ada)"}
                            </button>
                        </>
                    )}

                    {unLockTxHash && (
                        <>
                            <h3 className="mt-4 mb-2">
                                Ada un locked:
                                <Link href={""}>{unLockTxHash}</Link>
                            </h3>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Giftcard;
