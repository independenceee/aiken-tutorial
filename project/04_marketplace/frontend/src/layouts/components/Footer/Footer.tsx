import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Logo from "@/components/Logo";
import Image from "next/image";
import images from "@/assets/images";
import Button from "@/components/Button";
import { AccountContextType } from "@/types/AccountContextType";
import AccountContext from "@/contexts/components/AccountContext";

const cx = classNames.bind(styles);

const Footer = function () {
    const { account } = useContext<AccountContextType>(AccountContext);

    return (
        <footer className={cx("footer")}>
            <div className={cx("container")}>
                <div className={cx("row")}>
                    <div className={cx("column")}>
                        <Logo />
                        <p>Buy, sell and discover exclusive digital assets by the top artists of Design & Develop with by BlockAlpha</p>
                        <div className={cx("social-links")}>
                            <Link target="_blank" href={""}>
                                <Image src={images.meta} alt="" />
                            </Link>
                            <Link target="_blank" href={`mailto:`}>
                                <Image src={images.emailLink} alt="" />
                            </Link>
                            <Link target="_blank" href={``}>
                                <Image src={images.youtube} alt="" />
                            </Link>
                            <Link target="_blank" href={``}>
                                <Image src={images.twitter} alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className={cx("column")}>
                        <h4>Main page</h4>
                        <ul>
                            {account && (
                                <li>
                                    <Link href={`/account/${account.walletAddress}`}>Account</Link>
                                </li>
                            )}
                            <li>
                                <Link href="#">Collection</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cx("column")}>
                        <h4>Useful page</h4>
                        <ul>
                            <li>
                                <Link href="#">Search</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cx("column")}>
                        <h4>Feed back</h4>
                        <div className={cx("feedback")}>
                            <textarea className={cx("form-input")} name="feedback" cols={30} rows={5} placeholder="Your feedback..."></textarea>
                            <div className={cx("btn-group")}>
                                <Button className={cx("btn-submit")}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("origin")}>
                <p>{`© ${new Date().getFullYear()} Marketplace. Design & Develop with by BlockAlpha`}</p>
            </div>
        </footer>
    );
};

export default Footer;
