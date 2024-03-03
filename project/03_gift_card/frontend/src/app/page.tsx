import React, { lazy } from "react";
import readValidators from "~/utils/read-validators";

const Oneshot = lazy(() => import("~/components/Oneshot"));

type Props = {};

const Home = function ({}: Props) {
    const validators = readValidators();
    return (
        <main>
            <div className="max-w-2xl mx-auto mt-20 mb-10">
                <div className="mb-10">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Make a one shot minting and lock contract
                    </h2>

                    <h3 className="mt-4 mb-2">Redeem</h3>
                    <pre className="bg-gray-200 p-2 rounded overflow-x-scroll">
                        {validators.redeem.script}
                    </pre>

                    <h3 className="mt-4 mb-2">Gift Card</h3>
                    <pre className="bg-gray-200 p-2 rounded overflow-x-scroll">
                        {validators.giftCard.script}
                    </pre>
                </div>
                <Oneshot validators={validators} />
            </div>
        </main>
    );
};

export default Home;
