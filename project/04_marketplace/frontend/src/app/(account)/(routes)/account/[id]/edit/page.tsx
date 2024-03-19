"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./EditAccount.module.scss";
import images from "@/assets/images";
import Button from "@/components/Button";
import AccountContext from "@/contexts/components/AccountContext";
import { AccountContextType } from "@/types/AccountContextType";
import { patch, post } from "@/utils/http-request";
import { toast } from "react-toastify";
import axios from "axios";
import { AccountItemType } from "@/types/GenericsType";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";

type Props = {};
const cx = classNames.bind(styles);

const EditAccountPage = function ({}: Props) {
    const router = useRouter();
    const { id: walletAddressPath }: any = useParams();
    const [accountWalletAddressParams, setAccountWalletAddressParams] = useState<AccountItemType>(null!);
    useEffect(
        function () {
            const fetchAccountFromAddress = async function () {
                try {
                    const account: AccountItemType = await post("/account", {
                        walletAddress: walletAddressPath,
                    });
                    setAccountWalletAddressParams(account);
                } catch (error) {
                    console.log(error);
                }
            };
            if (walletAddressPath) {
                fetchAccountFromAddress();
            }
        },
        [walletAddressPath],
    );

    const { account } = useContext<AccountContextType>(AccountContext);
    const [dataEdit, setDataEdit] = useState<any>({
        email: "",
        userName: "",
        description: "",
        facebookLink: "",
        twitterLink: "",
        linkedinLink: "",
    });

    const handleChange = function (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        event.preventDefault();

        setDataEdit(function (previous: any) {
            return {
                ...previous,
                [event.target.name]: event.target.value,
            };
        });
    };

    const [fileNameImageAvatar, setFileNameImageAvatar] = useState<string>("PNG, Video, Music, GIF, MP4 or MP3. Max 100mb");
    const [imageAvatar, setImageAvatar] = useState<File>(null!);
    const [imageAvatarPath, setImageAvatarPath] = useState<string>("");

    const [fileNameImageCover, setFileNameImageCover] = useState<string>("PNG, Video, Music, GIF, MP4 or MP3. Max 100mb");
    const [imageCover, setImageCover] = useState<File>(null!);
    const [imageCoverPath, setImageCoverPath] = useState<string>("");

    useEffect(() => {
        return function () {
            imageAvatarPath && URL.revokeObjectURL(imageAvatarPath);
        };
    }, []);

    useEffect(() => {
        return function () {
            imageCoverPath && URL.revokeObjectURL(imageCoverPath);
        };
    }, []);

    const handleChooseAvatarFile = function () {
        const fileImageElement: any = document.querySelector(".file__input--avatar");
        fileImageElement?.click();
    };

    const handleChooseCoverFile = function () {
        const fileImageElement: any = document.querySelector(".file__input--cover");
        fileImageElement?.click();
    };

    const handleChangeAvatar = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (event.target.files !== null) {
            setImageAvatar(event.target.files[0]);
            setImageAvatarPath(URL.createObjectURL(event.target.files[0]));
            event.target.value = "";
        }
    };

    const handleChangeCover = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (event.target.files !== null) {
            setImageCover(event.target.files[0]);
            setImageCoverPath(URL.createObjectURL(event.target.files[0]));
            event.target.value = "";
        }
    };

    const handleSubmit = async function () {
        try {
            if (account) {
                let responseAvatar, responseCover;
                if (imageAvatar) {
                    const formDataAvatar = new FormData();
                    formDataAvatar.append("file", imageAvatar);
                    const metadataAvatar = JSON.stringify({ name: "fileName" });
                    formDataAvatar.append("pinataMetadata", metadataAvatar);
                    const optionsAvatar = JSON.stringify({ cidVersion: 0 });
                    formDataAvatar.append("pinataOptions", optionsAvatar);
                    responseAvatar = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formDataAvatar, {
                        headers: {
                            "Content-Type": `multipart/form-data; boundary=${formDataAvatar}`,
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOTBlYTJkYy04ZDc5LTQzYWMtYjFkOS0zYTE5ZWRkZTkzNzYiLCJlbWFpbCI6Im5ndXllbmtoYW5oMTcxMTIwMDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ0MjE1ZTZjMzk0ZjNjMjNjMzkxIiwic2NvcGVkS2V5U2VjcmV0IjoiOWZiYWRjOWIxOWJhMmRjYzNiZTU4MzMyZDJiNjAxMjE4YzhjYTM5NjIzMzU5ZGY3NWY3YzA3NjYxYTFlNGZkMyIsImlhdCI6MTcwMzA2MDI0N30.8D5f1dlPgVKDif5CikQtU4kd7pCcqIWvXo2Mlu5mYXk`,
                        },
                    });
                }
                if (imageCover) {
                    const formDataCover = new FormData();
                    formDataCover.append("file", imageCover);
                    const metadataCover = JSON.stringify({ name: "fileName" });
                    formDataCover.append("pinataMetadata", metadataCover);
                    const optionsCover = JSON.stringify({ cidVersion: 0 });
                    formDataCover.append("pinataOptions", optionsCover);
                    responseCover = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formDataCover, {
                        headers: {
                            "Content-Type": `multipart/form-data; boundary=${formDataCover}`,
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOTBlYTJkYy04ZDc5LTQzYWMtYjFkOS0zYTE5ZWRkZTkzNzYiLCJlbWFpbCI6Im5ndXllbmtoYW5oMTcxMTIwMDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ0MjE1ZTZjMzk0ZjNjMjNjMzkxIiwic2NvcGVkS2V5U2VjcmV0IjoiOWZiYWRjOWIxOWJhMmRjYzNiZTU4MzMyZDJiNjAxMjE4YzhjYTM5NjIzMzU5ZGY3NWY3YzA3NjYxYTFlNGZkMyIsImlhdCI6MTcwMzA2MDI0N30.8D5f1dlPgVKDif5CikQtU4kd7pCcqIWvXo2Mlu5mYXk`,
                        },
                    });
                }

                await patch(`/account/${account.id}?destination="images/account"`, {
                    avatar: responseAvatar ? "ipfs://" + responseAvatar.data.IpfsHash : "",
                    cover: responseCover ? "ipfs://" + responseCover.data.IpfsHash : "",
                    ...dataEdit,
                });
                toast.success("Updated account successfully");
                router.back();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [avatarPrevious, setAvatarPrevious] = useState("");
    const [coverPrevious, setCoverPrevious] = useState("");
    useEffect(() => {
        setAvatarPrevious(accountWalletAddressParams?.avatar ? convertIpfsAddressToUrl(accountWalletAddressParams.avatar) : images.user);
        setCoverPrevious(accountWalletAddressParams?.cover ? convertIpfsAddressToUrl(accountWalletAddressParams.cover) : images.background);
    }, [accountWalletAddressParams]);

    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("banner__wrapper")}>
                    <Image
                        width={2000}
                        height={2000}
                        className={cx("banner__image")}
                        src={imageCoverPath ? imageCoverPath : coverPrevious}
                        alt="Background Image"
                    />
                </section>

                <section className={cx("account__wrapper")}>
                    <div className={cx("account__container")}>
                        <div className={cx("account__image")}>
                            <Image
                                width={2000}
                                height={2000}
                                src={imageAvatarPath ? imageAvatarPath : avatarPrevious}
                                alt="Avatar Image"
                                className={cx("image")}
                            />
                        </div>
                    </div>

                    <div className={cx("account__content")}>
                        <div className={cx("account__infomation")}>
                            <h3>{dataEdit.userName}</h3>
                            <p>{dataEdit.description}</p>
                        </div>
                        <div className={cx("account__media")}>
                            <div className={cx("social__links")}>
                                {/* <Link href="#">
                                    <Image src={images.meta} alt="" />
                                </Link>
                                <Link href="#">
                                    <Image src={images.linkedin} alt="" />
                                </Link>
                                <Link href="#">
                                    <Image src={images.youtube} alt="" />
                                </Link>
                                <Link href="#">
                                    <Image src={images.twitter} alt="" />
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </section>
                <section className={cx("content")}>
                    <section className={cx("left")}>
                        <header className={cx("header")}>Edit your profile</header>
                        {/* upload-begin */}
                        <div className={cx("upload-wrapper")}>
                            <h3 className={cx("upload-title")}>Upload backgound</h3>
                            <div className={cx("upload-content")} onClick={handleChooseCoverFile}>
                                <p className={cx("upload-type")}>{fileNameImageCover}</p>
                                <input type="file" className="file__input--cover" accept="image/*" hidden onChange={handleChangeCover} />
                                <Button className={cx("button__upload")}>Upload</Button>
                            </div>
                        </div>
                        {/* upload-end */}
                        {/* upload-begin */}
                        <div className={cx("upload-wrapper")}>
                            <h3 className={cx("upload-title")}>Upload avatar</h3>
                            <div className={cx("upload-content")} onClick={handleChooseAvatarFile}>
                                <p className={cx("upload-type")}>{fileNameImageAvatar}</p>
                                <input type="file" className="file__input--avatar" accept="image/*" hidden onChange={handleChangeAvatar} />
                                <Button className={cx("button__upload")}>Upload</Button>
                            </div>
                        </div>
                        {/* upload-end */}
                        {/* title-begin */}
                        <div className={cx("title-wrapper")}>
                            <h3 className={cx("label")}>Username</h3>
                            <input
                                placeholder="Enter your username"
                                type="text"
                                name="userName"
                                className={cx("title-control")}
                                onChange={handleChange}
                            />
                        </div>
                        {/* title-end */}
                        {/* title-begin */}

                        {/* title-end */}

                        {/* description-begin */}
                        <div className={cx("title-wrapper")}>
                            <h3 className={cx("label")}>Description</h3>
                            <textarea
                                placeholder="Enter your description"
                                rows={10}
                                typeof="text"
                                name="description"
                                className={cx("title-control")}
                                onChange={handleChange}
                            />
                        </div>
                        {/* description-end */}

                        {/* title-begin */}
                        <div className={cx("title-wrapper")}>
                            <h3 className={cx("label")}>Twitter: </h3>
                            <input
                                placeholder="Enter your link twitter"
                                type="text"
                                name="twitterLink"
                                className={cx("title-control")}
                                onChange={handleChange}
                            />
                        </div>
                        {/* title-end */}
                        <div className={cx("title-wrapper")}>
                            <h3 className={cx("label")}>Email</h3>
                            <input placeholder="Enter your email" type="text" name="email" className={cx("title-control")} onChange={handleChange} />
                        </div>
                        {/* title-begin */}
                        <div className={cx("title-wrapper")}>
                            <h3 className={cx("label")}>Facebook:</h3>
                            <input
                                placeholder="Enter your link facebook"
                                type="text"
                                name="facebookLink"
                                className={cx("title-control")}
                                onChange={handleChange}
                            />
                        </div>
                        {/* title-end */}
                        {/* title-begin */}
                        <div className={cx("title-wrapper")}>
                            <h3 className={cx("label")}>Linkedin</h3>
                            <input
                                placeholder="Enter your email"
                                type="text"
                                name="linkedinLink"
                                className={cx("title-control")}
                                onChange={handleChange}
                            />
                        </div>
                        {/* title-end */}
                    </section>
                    <div className={cx("bill-section")}>
                        <div className={cx("mint")}>
                            <Button className={cx("button__mint")} onClick={handleSubmit}>
                                Save change
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default EditAccountPage;
