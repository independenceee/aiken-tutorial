"use client";
import React, { useState, useContext, ChangeEvent, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./Donate.module.scss";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types/LucidContextType";
import { ModalContextType } from "@/types/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";
import Button from "@/components/Button";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

type Props = {};
const Donate = function ({}: Props) {
    const { lucidWallet, walletItem, setNetworkPlatform, connectWallet } = useContext<LucidContextType>(LucidContext);
    const { isShowingConnectWalletMainnet, toggleShowingConnectWalletMainnet } = useContext<ModalContextType>(ModalContext);
    const [price, setPrice] = useState<string>("");

    const [loadingDonatePlatform, setLoadingDonatePlatform] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null!);
    const handleChangePrice = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setPrice(event.target.value);
    };

    const handleDonate = async function () {
        setLoadingDonatePlatform(true);
        try {
            if (walletItem.walletAddress?.includes("_test")) {
                toggleShowingConnectWalletMainnet();
                setNetworkPlatform("Mainnet");
            }

            if (lucidWallet || !price) {
                if (lucidWallet.network === "Mainnet") {
                    const tx = await lucidWallet
                        .newTx()
                        .payToAddress("addr1qy2z60lx2zdfs7gvjn3mt47mlx20dhqyrt8xu0m7d685x2ng64psekpurtcrh0esrtgkyk3pn5ehv5njx745rqp5ts7s3zfapl", {
                            lovelace: BigInt(Number(price) * 1000000),
                        })
                        .complete();
                    const signedTx = await tx.sign().complete();
                    const txHash = await signedTx.submit();
                    setPrice("");
                    inputRef.current.focus();
                    toast.success("Thank you for Donate !");
                    return;
                }
            }
            toggleShowingConnectWalletMainnet();
            setNetworkPlatform("Mainnet");
        } catch (error) {
            toast.error(String("Donate failed! You can try, please!"));
        } finally {
            setLoadingDonatePlatform(false);
        }
    };

    return (
        <div className={cx("wrapper")} data-aos="fade-up">
            <div className={cx("container")}>
                <section className={cx("image__wrapper")}>
                    <iframe
                        className={cx("iframe-video")}
                        src="https://www.youtube.com/embed/bA_0YiNfma8?si=bVvN7wXIy5D2lVyz"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </section>

                <section className={cx("about__content")} data-aos="fade-left">
                    <h2>Support Our Team Efforts</h2>
                    <p>
                        We are proud to introduce our community to our first NFT exchange platform - DEMARKET. This is not just a project but a
                        journey that the BlockAlpha team has tirelessly worked on to develop the first MVP test version. Every stage, every line of
                        code, and every feature has been built with dedication and relentless effort to bring an excellent NFT trading experience to
                        the community.
                    </p>

                    <p>
                        Be part of the supportive community, accompany us so that demarket is not just a place to trade NFTs but also a destination to
                        share knowledge and Web3 experiences. Thank you for being with us and supporting us on this journey.
                    </p>

                    <div className={cx("about__button")}>
                        <input
                            ref={inputRef}
                            value={price}
                            onChange={handleChangePrice}
                            className={cx("input_donate")}
                            type="text"
                            placeholder="Enter the price"
                        />
                        <Button className={cx("button")} onClick={handleDonate}>
                            Donate us
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Donate;
