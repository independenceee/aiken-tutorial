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
import {
    WalletContext,
    WalletContextType,
    WalletType,
} from "../../../contexts/WalletProvider";

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
    const { buy, refund } = useContext<SmartcontractType>(SmartcontractContext);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { wallet } = useContext<WalletContextType>(WalletContext);

    const handleSubmit = async function () {
        if (wallet?.address === item.sellerAddress) {
            refund({
                lucid: lucid,
                policyId: item.policyId,
                assetName: item.assetName!,
            });
        }
        await buy({
            lucid: lucid,
            sellerAddress: item.sellerAddress!,
            royaltiesAddress: item.authorAddress!,
            policyId: item.policyId,
            assetName: item.assetName!,
        });
    };

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
                            <h6>Price</h6>
                            <p>{String(Number(item?.price) / 1000000)}</p>
                        </div>
                    </div>
                </div>

                <div className=" mt-3 d-flex align-items-center justify-content-between">
                    <button
                        className="bid__btn d-flex align-items-center gap-1"
                        onClick={handleSubmit}
                    >
                        <i className="ri-shopping-bag-line"></i>{" "}
                        {wallet?.address === item.sellerAddress
                            ? "Refund"
                            : "Buy"}
                    </button>

                    <span className="history__link">
                        <Link to="#">View History</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NftCard;
