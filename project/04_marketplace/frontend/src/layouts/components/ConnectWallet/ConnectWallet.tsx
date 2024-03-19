import React, { useContext } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./ConnectWallet.module.scss";
import { LucidContextType } from "@/types/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import Button from "@/components/Button";
import { IoIosArrowDown } from "react-icons/io";
import wallets from "@/constants/wallets";
import Modal from "@/components/Modal";
import { ModalContextType } from "@/types/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";
import { WalletItemType } from "@/types/GenericsType";
import { CloseIcon, CopyIcon } from "@/components/Icons";
import Tippy from "@tippyjs/react";
import { LuRefreshCw } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { AccountContextType } from "@/types/AccountContextType";
import AccountContext from "@/contexts/components/AccountContext";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
};

const ConnectWallet = function ({ className }: Props) {
    const { connectWallet, lucidWallet, disconnectWallet, walletItem, setWalletItem, loadingConnectWallet } =
        useContext<LucidContextType>(LucidContext);
    const {
        isShowingNotificationConnectWallet,
        toggleNotificationConnectWallet,
        isShowingWalletShort,
        toggleShowingWalletShort,
        isShowingDownloadWallet,
        toggleDownloadWallet,
        isShowingWalletLong,
        toggleShowingWalletLong,
        isShowingInfomationAccount,
        toggleShowingInfomationAccount,
        isShowingConnectWalletMainnet,
        toggleShowingConnectWalletMainnet,
    } = useContext<ModalContextType>(ModalContext);

    const { setAccount } = useContext<AccountContextType>(AccountContext);

    const handleConnectWallet = async function (wallet: WalletItemType) {
        try {
            if (!(await wallet.walletCheckApi())) {
                setWalletItem(function (walletPrevious: WalletItemType) {
                    return {
                        ...walletPrevious,
                        walletDownloadApi: wallet.walletDownloadApi,
                        walletName: wallet.walletName,
                    };
                });
                if (isShowingWalletShort) {
                    toggleDownloadWallet();
                    toggleShowingWalletShort();
                }
                toggleDownloadWallet();
                toggleShowingWalletShort();
                return;
            }

            connectWallet({
                walletApi: wallet.walletApi,
                walletCheckApi: wallet.walletCheckApi,
                walletName: wallet.walletName,
                walletImage: wallet.walletImage,
            });
            if (walletItem) {
                toggleShowingWalletShort();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDisconnecWallet = async function () {
        try {
            if (isShowingInfomationAccount) {
                toggleShowingInfomationAccount();
            }
            setAccount(null!);
            await disconnectWallet();
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowAllWallet = function () {
        toggleShowingWalletShort();
        toggleShowingWalletLong();
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {!lucidWallet ? (
                    <Button onClick={toggleShowingWalletShort} RightIcon={IoIosArrowDown} className={cx(className)}>
                        Connect Wallet
                    </Button>
                ) : (
                    <Button onClick={toggleShowingInfomationAccount} RightIcon={IoIosArrowDown}>
                        <div className={cx("wallet")}>
                            <Image className={cx("image")} src={walletItem.walletImage} alt="Wallet Image" />
                            <Tippy content={`${walletItem.walletBalance} lovelace`}>
                                <span>{walletItem.walletBalance}&nbsp;₳</span>
                            </Tippy>
                        </div>
                    </Button>
                )}
            </div>

            <Modal transparent isShowing={isShowingWalletShort} toggle={toggleShowingWalletShort}>
                <div className={cx("wallet__short--wrapper")}>
                    {wallets.slice(0, 5).map(function (wallet, index) {
                        return (
                            <div key={index} onClick={() => handleConnectWallet(wallet)} className={cx("wallet__short--container")}>
                                <div className={cx("wallet__short--item")}>
                                    <Image className={cx("wallet__short--image")} src={wallet.walletImage} alt="" />
                                    <span className={cx("wallet__short--name")}>{wallet.walletName}</span>
                                </div>
                            </div>
                        );
                    })}
                    <div className={cx("wallet__short--container")} onClick={handleShowAllWallet}>
                        <div className={cx("wallet__short--item")}>
                            <span className={cx("wallet__short--name")}>View all</span>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal isShowing={isShowingWalletLong} toggle={toggleShowingWalletLong}>
                <div className={cx("wallet__long--wrapper")}>
                    <header className={cx("wallet__long--header")}>
                        <h2 className={cx("wallet__long--title")}>Select wallet to connect</h2>
                        <div className={cx("wallet__long--close")} onClick={toggleShowingWalletLong}>
                            <CloseIcon />
                        </div>
                    </header>
                    <section className={cx("wallet__long--list")}>
                        {wallets.map(function (wallet: WalletItemType, index: number) {
                            return (
                                <div key={index} className={cx("wallet__long--item")} onClick={() => handleConnectWallet(wallet)}>
                                    <div className={cx("wallet__long--content")}>
                                        <Image src={wallet.walletImage} alt="" className={cx("wallet__long--image")} />
                                        <div className={cx("wallet__long--name")}>{wallet.walletName} wallet</div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                </div>
            </Modal>

            <Modal isShowing={isShowingConnectWalletMainnet} toggle={toggleShowingConnectWalletMainnet}>
                <div className={cx("wallet_download")}>
                    <section className={cx("nowallet__content")}>
                        <p>You must connect a wallet to make a transaction. Chrome Web Store and install it now , if you dont have one yet?</p>
                    </section>
                    <div className={cx("nowallet__button")}>
                        <button className={cx("button__ok")} onClick={toggleShowingConnectWalletMainnet}>
                            CANCEL
                        </button>
                        <button onClick={toggleShowingConnectWalletMainnet} className={cx("button__cancel")}>
                            OK
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isShowing={isShowingDownloadWallet} toggle={toggleDownloadWallet}>
                <div className={cx("wallet_download")}>
                    <section className={cx("nowallet__content")}>
                        <p>
                            The selected wallet ({walletItem.walletName}) has not been installed. Do you want to visit Chrome Web Store and install it
                            now?
                        </p>
                    </section>
                    <div className={cx("nowallet__button")}>
                        <button className={cx("button__ok")} onClick={toggleDownloadWallet}>
                            CANCEL
                        </button>
                        <a target="_blank" href={walletItem.walletDownloadApi} className={cx("button__cancel")} rel="noopener noreferrer">
                            OK
                        </a>
                    </div>
                </div>
            </Modal>

            <Modal isShowing={isShowingNotificationConnectWallet} toggle={toggleNotificationConnectWallet}>
                <div className={cx("wallet_download")}>
                    <section className={cx("nowallet__content")}>
                        <p>You must connect a wallet to make a transaction. Chrome Web Store and install it now , if you dont have one yet?</p>
                    </section>
                    <div className={cx("nowallet__button")}>
                        <button className={cx("button__ok")} onClick={toggleNotificationConnectWallet}>
                            CANCEL
                        </button>
                        <button onClick={toggleNotificationConnectWallet} className={cx("button__cancel")}>
                            OK
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isShowing={isShowingDownloadWallet} toggle={toggleDownloadWallet}>
                <div className={cx("wallet_download")}>
                    <section className={cx("nowallet__content")}>
                        <p>
                            You must connect via mainnet wallet to donate via account. You must connect a wallet to make a transaction. Chrome Web
                            Store and install it now , if you dont have one yet?
                        </p>
                    </section>
                    <div className={cx("nowallet__button")}>
                        <button className={cx("button__ok")} onClick={toggleDownloadWallet}>
                            CANCEL
                        </button>
                        <a target="_blank" href={walletItem.walletDownloadApi} className={cx("button__cancel")} rel="noopener noreferrer">
                            OK
                        </a>
                    </div>
                </div>
            </Modal>

            <Modal transparent isShowing={isShowingInfomationAccount} toggle={toggleShowingInfomationAccount}>
                <div className={cx("wallet__infomation--wrapper")}>
                    <section className={cx("wallet__short--container")}>
                        <div className={cx("wallet__short--item")}>
                            <span className={cx("wallet__short--name")}>Wallet: {walletItem.walletAddress?.slice(0, 15)}...</span>
                            <CopyIcon className={cx("wallet__short--image")} />
                        </div>
                    </section>
                    <section className={cx("wallet__short--container")}>
                        <div className={cx("wallet__short--item")}>
                            <LuRefreshCw className={cx("wallet__short--image")} />
                            <span className={cx("wallet__short--name")}>Refresh</span>
                        </div>
                    </section>
                    <section className={cx("wallet__short--container")} onClick={handleDisconnecWallet}>
                        <div className={cx("wallet__short--item")}>
                            <CiLogout className={cx("wallet__short--image")} />
                            <span className={cx("wallet__short--name")}>Disconnect Wallet</span>
                        </div>
                    </section>
                </div>
            </Modal>
        </div>
    );
};

export default ConnectWallet;
