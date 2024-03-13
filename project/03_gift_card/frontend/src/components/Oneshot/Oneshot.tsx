"use client";

import { Blockfrost, Constr, Data, Lucid, fromText } from "lucid-cardano";
import React, {
    ChangeEvent,
    useEffect,
    useState,
    lazy,
    useContext,
} from "react";
import { Validators } from "~/utils/read-validators";
import { AppliedValidators, applyParams } from "~/utils/apply-params";
import Link from "next/link";
import { SmartcontractContextType } from "~/types/contexts/SmartcontractContextType";
import SmartcontextContext from "~/contexts/components/SmartcontractContext";

type Props = {};

const Oneshot = function () {
    const {
        lucid,
        createGiftCard,
        redeemGiftCard,
        connectWallet,
        submitTokenName,
        tokenName,
        parameterizedContracts,
        giftADA,
        setGiftADA,
        lockTxHash,
        unlockTxHash,
        waitingLockTx,
        waitingUnlockTx,
        setTokenName,
    } = useContext<SmartcontractContextType>(SmartcontextContext);

    return (
        <div>
            {!lucid ? (
                <div className="mt-10 grid grid-cols-1 gap-y-8">
                    <button
                        className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </button>
                </div>
            ) : (
                <div className="mt-10 grid grid-cols-1 gap-y-8">
                    <h3 className="mt-4 mb-2">Asset name:</h3>
                    <input
                        value={tokenName}
                        onChange={(event) =>
                            setTokenName(event.target.value as string)
                        }
                        className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                        type="text"
                    />

                    {tokenName && (
                        <button
                            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                            onClick={submitTokenName}
                        >
                            Make Contracts
                        </button>
                    )}
                </div>
            )}

            {lucid && parameterizedContracts && (
                <div>
                    <h3 className="mt-4 mb-2">Redeem</h3>
                    <div className="bg-gray-200 p-2 rounded overflow-x-scroll">
                        {parameterizedContracts.redeem.script}
                    </div>

                    <h3 className="mt-4 mb-2">Gift Card</h3>
                    <div className="bg-gray-200 p-2 rounded overflow-x-scroll">
                        {parameterizedContracts.giftCard.script}
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-y-8">
                        <h3 className="mt-4 mb-2">ADA:</h3>
                        <input
                            type="text"
                            name="giftADA"
                            id="giftADA"
                            value={giftADA}
                            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                            onChange={(e) => setGiftADA(e.target.value)}
                        />

                        <button
                            className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                            onClick={createGiftCard}
                            disabled={waitingLockTx || !!lockTxHash}
                        >
                            {waitingLockTx
                                ? "Waiting for Tx..."
                                : "Create Gift Card (Locks ADA)"}
                        </button>

                        {lockTxHash && (
                            <>
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
                                    onClick={redeemGiftCard}
                                    disabled={waitingLockTx || !!unlockTxHash}
                                >
                                    {waitingUnlockTx
                                        ? "Waiting for Tx..."
                                        : "Redeem Gift Card (Unlocks ADA)"}
                                </button>
                            </>
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

export default Oneshot;
