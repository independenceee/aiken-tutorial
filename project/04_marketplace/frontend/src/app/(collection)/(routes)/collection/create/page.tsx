"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Create.module.scss";
import { LucidContextType } from "@/types/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/Button";
import images from "@/assets/images";
import { SmartContractType } from "@/types/SmartContextType";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import { toast } from "react-toastify";
import { ModalContextType } from "@/types/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";

const cx = classNames.bind(styles);
type Props = {};

const CollectionCreatePage = function ({}: Props) {
    const { lucidWallet, walletItem } = useContext<LucidContextType>(LucidContext);
    const { mintCollectionService } = useContext<SmartContractType>(SmartContractContext);
    const { isShowingNotificationConnectWallet, toggleNotificationConnectWallet } = useContext<ModalContextType>(ModalContext);
    const [loadingCreateCollection, setLoadingCreateCollection] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [imageAvatar, setImageAvatar] = useState<File>(null!);
    const [imagePathAvatar, setImagePathAvatar] = useState<string>("");
    const [fileNameAvatar, setFileNameAvatar] = useState<string>("PNG, Video, Music, GIF, MP4 or MP3. Max 100mb");

    useEffect(() => {
        return function () {
            imagePathAvatar && URL.revokeObjectURL(imagePathAvatar);
        };
    }, [imagePathAvatar]);

    const [imageCover, setImageCover] = useState<File>(null!);
    const [imagePathCover, setImagePathCover] = useState<string>("");
    const [fileNameCover, setFileNameCover] = useState<string>("PNG, Video, Music, GIF, MP4 or MP3. Max 100mb");

    useEffect(() => {
        return function () {
            imagePathCover && URL.revokeObjectURL(imagePathCover);
        };
    }, [imagePathCover]);

    const handleCreateCollection = async function () {
        setLoadingCreateCollection(true);
        try {
            if (!lucidWallet || !walletItem) {
                toggleNotificationConnectWallet();
                return;
            }
            const formDataAvatar = new FormData();
            formDataAvatar.append("file", imageAvatar);
            const metadataAvatar = JSON.stringify({ name: "fileName" });
            formDataAvatar.append("pinataMetadata", metadataAvatar);
            const optionsAvatar = JSON.stringify({ cidVersion: 0 });
            formDataAvatar.append("pinataOptions", optionsAvatar);
            const responseAvatar = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formDataAvatar, {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${formDataAvatar}`,
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOTBlYTJkYy04ZDc5LTQzYWMtYjFkOS0zYTE5ZWRkZTkzNzYiLCJlbWFpbCI6Im5ndXllbmtoYW5oMTcxMTIwMDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ0MjE1ZTZjMzk0ZjNjMjNjMzkxIiwic2NvcGVkS2V5U2VjcmV0IjoiOWZiYWRjOWIxOWJhMmRjYzNiZTU4MzMyZDJiNjAxMjE4YzhjYTM5NjIzMzU5ZGY3NWY3YzA3NjYxYTFlNGZkMyIsImlhdCI6MTcwMzA2MDI0N30.8D5f1dlPgVKDif5CikQtU4kd7pCcqIWvXo2Mlu5mYXk`,
                },
            });

            const formDataCover = new FormData();
            formDataCover.append("file", imageCover);
            const metadataCover = JSON.stringify({ name: "fileName" });
            formDataCover.append("pinataMetadata", metadataCover);
            const optionsCover = JSON.stringify({ cidVersion: 0 });
            formDataCover.append("pinataOptions", optionsCover);
            const responseCover = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formDataCover, {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${formDataCover}`,
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOTBlYTJkYy04ZDc5LTQzYWMtYjFkOS0zYTE5ZWRkZTkzNzYiLCJlbWFpbCI6Im5ndXllbmtoYW5oMTcxMTIwMDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ0MjE1ZTZjMzk0ZjNjMjNjMzkxIiwic2NvcGVkS2V5U2VjcmV0IjoiOWZiYWRjOWIxOWJhMmRjYzNiZTU4MzMyZDJiNjAxMjE4YzhjYTM5NjIzMzU5ZGY3NWY3YzA3NjYxYTFlNGZkMyIsImlhdCI6MTcwMzA2MDI0N30.8D5f1dlPgVKDif5CikQtU4kd7pCcqIWvXo2Mlu5mYXk`,
                },
            });

            const { txHash } = await mintCollectionService({
                address: String(walletItem.walletAddress),
                description: String(description),
                imageAvatar: "ipfs://" + responseAvatar.data.IpfsHash,
                imageCover: "ipfs://" + responseCover.data.IpfsHash,
                lucid: lucidWallet,
                title: String(title),
            });

            if (txHash) {
                toast.success("Create collection successfully.");
            }
        } catch (error) {
            toast.success("Create collection failed.");
        } finally {
            setLoadingCreateCollection(false);
        }
    };

    const handleChooseFile = function (className: string) {
        const fileImageElement: any = document.querySelector(className);
        fileImageElement?.click();
    };

    const handleChangeCover = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        if (event.target.files !== null) {
            setImageCover(event.target.files[0]);
            setImagePathCover(URL.createObjectURL(event.target.files[0]));
            setFileNameCover(event.target.files[0].name);
        }
    };

    const handleChangeAvatar = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (event.target.files !== null) {
            setImageAvatar(event.target.files[0]);
            setImagePathAvatar(URL.createObjectURL(event.target.files[0]));
            setFileNameAvatar(event.target.files[0].name);
        }
    };

    const handleChangeTitle = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setTitle(event.target.value);
    };

    const handleChangeDescription = function (event: ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        setDescription(event.target.value);
    };

    return (
        <main className={cx("wrapper")} data-aos="fade-down">
            <div className={cx("container")}>
                <section className={cx("left")}>
                    <header className={cx("header")}>Collections</header>
                    {/* upload-background-begin */}
                    <div className={cx("upload-wrapper")}>
                        <h3 className={cx("upload-title")}>Upload backgound</h3>
                        <div
                            className={cx("upload-content")}
                            onClick={function () {
                                handleChooseFile(".file__input_background");
                            }}
                        >
                            <p className={cx("upload-type")}>{fileNameCover}</p>
                            <input type="file" className="file__input_background" accept="image/*" hidden onChange={handleChangeCover} />
                            <Button className={cx("button__upload")}>Upload</Button>
                        </div>
                    </div>
                    {/* upload-background-end */}
                    {/* upload-item-file-begin */}
                    <div className={cx("upload-wrapper")}>
                        <h3 className={cx("upload-title")}>Upload item file</h3>
                        <div
                            className={cx("upload-content")}
                            onClick={function () {
                                handleChooseFile(".file__input_item_file");
                            }}
                        >
                            <p className={cx("upload-type")}>{fileNameAvatar}</p>
                            <input type="file" className="file__input_item_file" accept="image/*" hidden onChange={handleChangeAvatar} />
                            <Button className={cx("button__upload")}>Upload</Button>
                        </div>
                    </div>
                    {/* upload-item-file-end */}
                    {/* title-begin */}
                    <div className={cx("title-wrapper")}>
                        <h3 className={cx("label")}>Title</h3>
                        <input
                            value={title}
                            placeholder="Enter your title"
                            type="text"
                            className={cx("title-control")}
                            onChange={handleChangeTitle}
                        />
                    </div>
                    {/* title-end */}

                    {/* description-begin */}
                    <div className={cx("title-wrapper")}>
                        <h3 className={cx("label")}>Description</h3>
                        <textarea
                            placeholder="Description of the NFT"
                            rows={10}
                            value={description}
                            typeof="text"
                            className={cx("title-control")}
                            onChange={handleChangeDescription}
                        />
                    </div>
                    {/* description-end */}

                    <div className={cx("content__wrapper-reponsive")}>
                        <div className={cx("content__container")}>
                            <Image src={imagePathCover ? imagePathCover : images.noImage} alt="Background" className={cx("content__background")} />
                            <div className={cx("content__image")}>
                                <Image className={cx("image")} src={imagePathAvatar ? imagePathAvatar : images.noImage} alt="Image" />
                            </div>
                            <h3 className={cx("title")}>{title}</h3>
                            <p className={cx("description")}>{description}</p>
                        </div>
                    </div>
                    {/* button-begin */}
                    <div className={cx("button-wrapper")}>
                        <Button className={cx("button__upload")} onClick={handleCreateCollection}>
                            CREATE
                        </Button>
                    </div>
                    {/* button-end */}
                </section>
                <section className={cx("right")}>
                    <div className={cx("content")}>
                        <div className={cx("content__wrapper")}>
                            <div className={cx("content__container")}>
                                <Image
                                    src={imagePathCover ? imagePathCover : images.noImage}
                                    alt="Background"
                                    className={cx("content__background")}
                                />

                                <div className={cx("content__image")}>
                                    <Image className={cx("image")} src={imagePathAvatar ? imagePathAvatar : images.noImage} alt="Image" />
                                </div>
                                <h3 className={cx("title")}>{title}</h3>
                                <p className={cx("description")}>{description}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default CollectionCreatePage;
