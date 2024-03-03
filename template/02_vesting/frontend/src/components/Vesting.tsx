"use client";

import { Blockfrost, Constr, Data, Lucid, fromText } from "lucid-cardano";
import React, {
    ChangeEvent,
    useEffect,
    useState,
    lazy,
    useContext,
} from "react";

import Link from "next/link";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";

type Props = {};

const HelloWorld = function ({}: Props) {
    const {
        tADA,
        setTADA,
        lockUntil,
        setLockUntil,
        lockVesting,
        unLockVesting,
        lockTxHash,
        unlockTxHash,
        waitingLockTx,
        waitingUnlockTx,
    } = useContext<SmartContractContextType>(SmartContractContext);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { connect } = useContext<WalletContextType>(WalletContext);

    return (
        <div>
            {!lucid && (
                <div className="mt-10 grid grid-cols-1 gap-y-8">
                    <button
                        className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                        onClick={connect}
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
                            value={tADA}
                            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                            onChange={(e) => setTADA(e.target.value)}
                        />
                        <input
                            type="datetime-local"
                            value={lockUntil}
                            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                            onChange={(e) => setLockUntil(e.target.value)}
                        />

                        <button
                            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                            onClick={() => lockVesting({ lucid })}
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
                                    onClick={() => unLockVesting({ lucid })}
                                    disabled={waitingLockTx || !!unlockTxHash}
                                >
                                    {waitingUnlockTx
                                        ? "Waiting for Tx..."
                                        : "Unlocks ADA"}
                                </button>
                            </div>
                        )}
                        {unlockTxHash && (
                            <>
                                <h3 className="mt-4 mb-2">ADA Unlocked</h3>
                                <Link
                                    className="mb-2"
                                    target="_blank"
                                    href={`https://preprod.cardanoscan.io/transaction/${unlockTxHash}`}
                                >
                                    {unlockTxHash}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelloWorld;
