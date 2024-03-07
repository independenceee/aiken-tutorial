import Image from "next/image";
import Vesting from "~/components/Vesting";
import readValidator from "~/utils/read-validator";

export default function Home() {
    const validator = readValidator();
    return (
        <main>
            <div className="max-w-2xl mx-auto mt-20 mb-10">
                <div className="mb-10">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Make a lock and un lock tAda to contract
                    </h2>
                    <h3 className="mt-4 mb-2 ">Vesting Contract</h3>
                    <div className="bg-gray-200 p-2 rounded overflow-x-auto">
                        {validator.script}
                    </div>
                </div>
                <Vesting />
            </div>
        </main>
    );
}
