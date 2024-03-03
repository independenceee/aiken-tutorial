import React from "react";
import readValidator from "~/utils/read-validators";
import HelloWorld from "~/components/HelloWorld";

export default function Home() {
    const validators = readValidator();
    return (
        <main>
            <div className="max-w-2xl mx-auto mt-20 mb-10">
                <div className="mb-10">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Make a lock and un lock tada contract
                    </h2>

                    <h3 className="mt-4 mb-2">Hello world</h3>
                    <div className="bg-gray-200 p-2 rounded overflow-x-scroll">
                        {validators.script}
                    </div>
                </div>

                <HelloWorld />
            </div>
        </main>
    );
}
