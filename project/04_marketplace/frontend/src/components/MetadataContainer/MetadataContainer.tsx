"use client";

import React, { useEffect, useState } from "react";
import styles from "./MetedataContainer.module.scss";
import classNames from "classnames/bind";
import { post } from "@/utils/http-request";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
type Props = {
    policyId: string;
    assetName: string;
};

const cx = classNames.bind(styles);

const MetadataContainer = function ({ policyId, assetName }: Props) {
    const [metadata, setMetadata] = useState<any>();

    useEffect(() => {
        const fetchMetadataFromPolicyIdAndAssetName = async function () {
            const metadata = await post("/blockfrost/assets/information", {
                policyId: policyId,
                assetName: assetName,
            });
            setMetadata(metadata.onchain_metadata);
        };

        fetchMetadataFromPolicyIdAndAssetName();
    }, [policyId, assetName]);

    if (metadata) {
        return (
            <div className={cx("wrapper")}>
                {Object.entries(metadata).map(([key, value]: any) => (
                    <div key={key} className={cx("container")}>
                        <div className={cx("key")}>{key}</div>{" "}
                        <div className={cx("value")}>{value}</div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={cx("wrapper")}>
            {new Array(8).fill(null).map(function (value: any, key: number) {
                return (
                    <div key={key} className={cx("container")}>
                        <SkeletonTheme highlightColor="#7000ff" />
                        <Skeleton width={120} height={17} />
                        <Skeleton width={450} height={17} />
                    </div>
                );
            })}
        </div>
    );
};

export default MetadataContainer;
