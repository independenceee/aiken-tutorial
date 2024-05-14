"use client";

import React, { useState, MouseEvent } from "react";
import classNames from "classnames/bind";
import styles from "./Copy.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { CheckIcon, CopyIcon } from "~/components/Icons";
const cx = classNames.bind(styles);
type Props = {
    value: string;
};

const Copy = function ({ value }: Props) {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopyToClipboard = function (event: MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
        setCopied(true);
        toast.success("Copy to clipboard!");
        setTimeout(function () {
            setCopied(false);
        }, 1000);
    };

    return (
        <div onClick={handleCopyToClipboard}>
            <CopyToClipboard text={value}>
                {copied ? (
                    <div className={cx("icon__wrapper")}>
                        <CheckIcon width={"16px"} height={"16"} />
                    </div>
                ) : (
                    <div className={cx("icon__wrapper")}>
                        <CopyIcon width={"16px"} height={"16"} />
                    </div>
                )}
            </CopyToClipboard>
        </div>
    );
};

export default Copy;
