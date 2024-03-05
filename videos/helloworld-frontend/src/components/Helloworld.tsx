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

const Helloworld = function ({}: Props) {
    const {
        lockHelloworld,
        lockTxHash,
        setTAda,
        tAda,
        unLockHelloworld,
        unLockTxHash,
        waitingLockTx,
        waitingUnLockTx,
    } = useContext<SmartcontractContextType>(SmartcontractContext);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { connect } = useContext<WalletContextType>(WalletContext);
    return (
        <div>
            {!lucid && (
                <div className="mt-10 grid grid-cols-1 gap-y-8">
                    <button
                        onClick={connect}
                        className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                    >
                        Connect Wallet
                    </button>
                </div>
            )}

            {lucid && (
                <div>
                    <div className="mt-10 grid grid-cols-1 gap-y-8">
                        <input
                            type="text"
                            name="giftADA"
                            id="giftADA"
                            value={tAda}
                            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                            onChange={(e) => setTAda(e.target.value)}
                        />

                        <button
                            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                            onClick={() => lockHelloworld({ lucid })}
                            disabled={waitingLockTx || !!lockTxHash}
                        >
                            {waitingLockTx ? "Waiting for Tx..." : "Locks ADA"}
                        </button>

                        {lockTxHash && (
                            <div className="mt-10 grid grid-cols-1 gap-y-8">
                                <h3 className="mt-4 mb-2">ADA Locked</h3>
                                <Link
                                    className="mb-2"
                                    target="_blank"
                                    href={`https://preprod.cardanoscan.io/transaction/${lockTxHash}`}
                                >
                                    {lockTxHash}
                                </Link>
                                <button
                                    className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                                    onClick={() => unLockHelloworld({ lucid })}
                                    disabled={waitingLockTx || !!unLockTxHash}
                                >
                                    {waitingUnLockTx
                                        ? "Waiting for Tx..."
                                        : "Unlocks ADA"}
                                </button>
                            </div>
                        )}
                        {unLockTxHash && (
                            <>
                                <h3 className="mt-4 mb-2">ADA Unlocked</h3>
                                <Link
                                    className="mb-2"
                                    target="_blank"
                                    href={`https://preprod.cardanoscan.io/transaction/${unLockTxHash}`}
                                >
                                    {unLockTxHash}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Helloworld;
