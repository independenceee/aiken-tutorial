import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";

import Modal from "../Modal/Modal";
import {
    ProductType,
    SmartcontractContext,
    SmartcontractType,
} from "../../../contexts/SmartcontractProvider";
import {
    LucidContext,
    LucidContextType,
} from "../../../contexts/LucidProvider";

const convertIpfsAddressToUrl = function (
    ipfsAddress = "ipfs://QmTcV2Vr9ghyBq458cx8Us2jvgPvWwfUWYWUU3rCCcfNYC"
) {
    if (ipfsAddress.startsWith("ipfs://")) {
        const ipfsHash = ipfsAddress.slice("ipfs://".length);
        const ipfsURL = `https://ipfs.io/ipfs/${ipfsHash}`;
        return ipfsURL;
    } else {
        return null;
    }
};

type Props = {
    item: ProductType;
};

const NftCard = ({ item }: Props) => {
    const { sell } = useContext<SmartcontractType>(SmartcontractContext);
    const { lucid } = useContext<LucidContextType>(LucidContext);

    const handleSubmit = async function () {
        await sell({
            lucid: lucid,
            policyId: item.policyId,
            assetName: item.assetName,
            authorAddress: item.authorAddress!,
            price: BigInt(Number(value) * 1000000),
            royalties: BigInt((Number(value) * 1000000) / 100),
        });
    };

    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState(false);

    return (
        <div className="single__nft__card">
            <div className="nft__img">
                <img
                    src={convertIpfsAddressToUrl(item?.image) as string}
                    alt=""
                    className="w-100"
                />
            </div>

            <div className="nft__content">
                <h5 className="nft__title">
                    <Link to={`/market/`}>{item.name}</Link>
                </h5>

                <div className="creator__info-wrapper d-flex gap-3">
                    <div className="creator__info w-100 d-flex align-items-center justify-content-between">
                        <div>
                            <h6>Created By</h6>
                            <p>{item.authorAddress}</p>
                        </div>
                    </div>
                </div>

                <div className=" mt-3 d-flex align-items-center justify-content-between">
                    <button
                        className="bid__btn d-flex align-items-center gap-1"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="ri-shopping-bag-line"></i> Sell
                    </button>

                    {showModal && (
                        <Modal
                            onSubmit={handleSubmit}
                            setValue={setValue}
                            setShowModal={setShowModal}
                        />
                    )}

                    <span className="history__link">
                        <Link to="#">View History</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NftCard;
