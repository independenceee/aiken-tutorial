import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./ConnectWallet.module.scss";
import Button from "@/components/Button";
import { LucidContextType } from "@/types/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import Link from "next/link";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
};

const ConnectWallet = function ({ className }: Props) {
    const { connectWallet, walletAddress } = useContext<LucidContextType>(LucidContext);
    return (
        <div className={cx("wrapper")}>
            {!walletAddress ? (
                <div className={cx("container")}>
                    <Button onClick={connectWallet} className={cx(className)}>
                        Connect Wallet
                    </Button>
                </div>
            ) : (
                <div className={cx("container")}>
                    <Button href={`/account/${walletAddress}`} className={cx(className)}>
                        Get Account
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ConnectWallet;
