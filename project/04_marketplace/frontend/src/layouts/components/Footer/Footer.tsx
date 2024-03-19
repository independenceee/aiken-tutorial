import React, { ChangeEvent, SetStateAction, useContext, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Logo from "@/components/Logo";
import { publicRouters } from "@/routes";
import Image from "next/image";
import images from "@/assets/images";
import { post } from "@/utils/http-request";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import { socialMedia } from "@/data/socialMedia";
import routes from "@/configs/routes";
import { ModalContextType } from "@/types/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";
import { AccountContextType } from "@/types/AccountContextType";
import AccountContext from "@/contexts/components/AccountContext";

const cx = classNames.bind(styles);
type Props = {
    selectedRouter: string;
    setSelectedRouter: React.Dispatch<SetStateAction<string>>;
};

const Footer = function ({ selectedRouter, setSelectedRouter }: Props) {
    const [feedback, setFeedback] = useState<string>("");
    const { account } = useContext<AccountContextType>(AccountContext);
    const { toggleShowingSearch } = useContext<ModalContextType>(ModalContext);

    const handleChange = function (event: ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        setFeedback(event.target.value);
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null!);

    const handleSubmit = async function () {
        try {
            const data = await post("/mail", {
                feedback: feedback,
                emailFrom: "nguyenkhanh17112003@gmail.com",
            });

            toast.success(data);
        } catch (error) {
            toast.warning("Send feedback failed !");
        }
        setFeedback("");
        textareaRef.current.focus();
    };

    return (
        <footer className={cx("footer")}>
            <div className={cx("container")}>
                <div className={cx("row")}>
                    <div className={cx("column")}>
                        <Logo />
                        <p>
                            Buy, sell and discover exclusive digital assets by the top artists of
                            Design & Develop with by BlockAlpha
                        </p>
                        <div className={cx("social-links")}>
                            <Link target="_blank" href={`${socialMedia.metaLink}`}>
                                <Image src={images.meta} alt="" />
                            </Link>
                            <Link target="_blank" href={`mailto:${socialMedia.linkMail}`}>
                                <Image src={images.emailLink} alt="" />
                            </Link>
                            <Link target="_blank" href={`${socialMedia.youtubeLink}`}>
                                <Image src={images.youtube} alt="" />
                            </Link>
                            <Link target="_blank" href={`${socialMedia.twitterLink}`}>
                                <Image src={images.twitter} alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className={cx("column")}>
                        <h4>Main page</h4>
                        <ul>
                            <li>
                                <Link href={routes.mint}>Mint</Link>
                            </li>
                            <li>
                                <Link href={routes.marketplace}>Marketplace</Link>
                            </li>
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
                                <Link href={routes.about}>About</Link>
                            </li>
                            <li>
                                <Link href={routes.guide}>Guide</Link>
                            </li>
                            <li>
                                <Link href="#" onClick={toggleShowingSearch}>
                                    Search
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cx("column")}>
                        <h4>Feed back</h4>
                        <div className={cx("feedback")}>
                            <textarea
                                ref={textareaRef}
                                className={cx("form-input")}
                                name="feedback"
                                cols={30}
                                rows={5}
                                value={feedback}
                                placeholder="Your feedback..."
                                onChange={handleChange}
                            ></textarea>
                            <div className={cx("btn-group")}>
                                <Button onClick={handleSubmit} className={cx("btn-submit")}>
                                    Submit
                                </Button>
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
