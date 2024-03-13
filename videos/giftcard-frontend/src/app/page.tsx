import Image from "next/image";
import readValidators from "~/utils/read-validator";
import Giftcard from "~/components/Giftcard";
export default function Home() {
    const validators = readValidators();
    return (
        <main>
            <div className="max-w-2xl mx-auto mt-20 mb-10">
                <div className="mb-10">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Make a contract minting and lock, unlock
                    </h2>
                    <h3 className="mt-4 mb-2">Redeem</h3>
                    <p className="bg-gray-200 p-2 rounded overflow-x-auto">
                        {validators.redeem.script}
                    </p>
                    <h3 className="mt-4 mb-2">Giftcard</h3>
                    <p className="bg-gray-200 p-2 rounded overflow-x-auto">
                        {validators.giftCard.script}
                    </p>
                </div>
                <Giftcard />
            </div>
        </main>
    );
}
