"use client";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import { TrashIcon, AddIcon } from "@/components/Icons";
import Image from "next/image";
import DemarketContext from "@/contexts/components/DemarketContext";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import LucidContext from "@/contexts/components/LucidContext";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import images from "@/assets/images";
import { LucidContextType } from "@/types/LucidContextType";
import { SmartContractType } from "@/types/SmartContextType";
import { DemarketContextType } from "@/types/DemarketContextType";
import styles from "./Mint.module.scss";
import { ModalContextType } from "@/types/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";
import { ClipLoader } from "react-spinners";
const cx = classNames.bind(styles);

function convertMetadataToObj(metadataArray: any) {
    const resultObj: any = {};
    for (const item of metadataArray) {
        if (item.hasOwnProperty("property") && item.hasOwnProperty("value")) {
            resultObj[item.property] = item.value;
        }
    }
    return resultObj;
}

type Props = {};

const MintPage = function ({}: Props) {
    const [isActionCreate, setIsActionCreate] = useState(false);
    const { toggleNotificationConnectWallet } = useContext<ModalContextType>(ModalContext);
    const { lucidWallet } = useContext<LucidContextType>(LucidContext);
    const { mintAssetService } = useContext<SmartContractType>(SmartContractContext);
    const { addNft } = useContext<DemarketContextType>(DemarketContext);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [mediaType, setMediaType] = useState<string>("Media type asset");
    const [imagePath, setImagePath] = useState<string>("");
    const [image, setImage] = useState<File>(null!);
    const [fileName, setFileName] = useState<string>("PNG, Video, Music, GIF, MP4 or MP3. Max 100mb");
    const [metadatas, setMetadatas] = useState<any>([{ property: "", value: "" }]);

    useEffect(() => {
        return function () {
            imagePath && URL.revokeObjectURL(imagePath);
        };
    }, [imagePath]);

    const handleChangeFile = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (event.target.files !== null) {
            setImage(event.target.files[0]);
            setImagePath(URL.createObjectURL(event.target.files[0]));
            setFileName(event.target.files[0].name);
            setMediaType(event.target.files[0].type);
            event.target.value = "";
        }
    };

    const handleChooseFile = function () {
        const fileImageElement: any = document.querySelector(".file__input");
        fileImageElement?.click();
    };

    const handleChangeTitle = function (event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    };

    const handleChangeDescription = function (event: ChangeEvent<HTMLTextAreaElement>) {
        setDescription(event.target.value);
    };

    const handleAddMetadata = function () {
        setMetadatas([...metadatas, { property: "", value: "" }]);
    };

    const handleDeleteMetadata = function (index: number) {
        const deleteValue = [...metadatas];
        deleteValue.splice(index, 1);
        setMetadatas(deleteValue);
    };

    const handleChangeMetadata = function (event: ChangeEvent<HTMLInputElement>, index: number) {
        if (event.target) {
            const value = event.target.value;
            const name = event.target.name;
            const onChangeValue = [...metadatas];
            onChangeValue[index][name] = value;
            setMetadatas(onChangeValue);
        }
    };

    const handleMintNft = async function () {
        try {
            setIsActionCreate(true);
            if (lucidWallet) {
                const formData = new FormData();
                formData.append("file", image);
                const metadata = JSON.stringify({ name: "fileName" });
                const customMetadata = convertMetadataToObj(metadatas);
                formData.append("pinataMetadata", metadata);
                const options = JSON.stringify({ cidVersion: 0 });
                formData.append("pinataOptions", options);
                const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${formData}`,
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOTBlYTJkYy04ZDc5LTQzYWMtYjFkOS0zYTE5ZWRkZTkzNzYiLCJlbWFpbCI6Im5ndXllbmtoYW5oMTcxMTIwMDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ0MjE1ZTZjMzk0ZjNjMjNjMzkxIiwic2NvcGVkS2V5U2VjcmV0IjoiOWZiYWRjOWIxOWJhMmRjYzNiZTU4MzMyZDJiNjAxMjE4YzhjYTM5NjIzMzU5ZGY3NWY3YzA3NjYxYTFlNGZkMyIsImlhdCI6MTcwMzA2MDI0N30.8D5f1dlPgVKDif5CikQtU4kd7pCcqIWvXo2Mlu5mYXk`,
                    },
                });

                const { txHash, policyId, assetName } = await mintAssetService({
                    lucid: lucidWallet,
                    customMetadata,
                    description,
                    imageUrl: "ipfs://" + response.data.IpfsHash,
                    mediaType,
                    title,
                });

                if (!txHash) {
                    toast.warning("Mint asset faild");
                    return;
                }

                setTitle("");
                setDescription("");
                setImage(null!);
                setImagePath("");
                setMetadatas([]);
                setFileName("PNG, Video, Music, GIF, MP4 or MP3. Max 100mb");
                setMediaType("Media type asset");
                toast.success("Mint asset successfully");
                await addNft({ policyId, assetName });
            } else {
                toggleNotificationConnectWallet();
            }
        } catch (error) {
            toast.warning("Mint asset faild");
            console.log(error);
        } finally {
            setIsActionCreate(false);
        }
    };

    return (
        <main className={cx("wrapper")} data-aos="fade-down">
            <title>{isActionCreate ? "Mint ..." : "Mint - Demarket"}</title>
            <div className={cx("container")}>
                <section className={cx("left")}>
                    <header className={cx("header")}>Mint Your Asset</header>
                    {/* upload-begin */}
                    <div className={cx("upload-wrapper")}>
                        <h3 className={cx("upload-title")}>Upload Item File</h3>
                        <div className={cx("upload-content")} onClick={handleChooseFile}>
                            <p className={cx("upload-type")}>{fileName}</p>
                            <input type="file" className="file__input" accept="image/*" hidden onChange={handleChangeFile} />
                            <Button className={cx("button__upload")}>Upload</Button>
                        </div>
                    </div>
                    {/* upload-end */}
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
                    {/* select-begin */}

                    <div className={cx("select-wrapper")}>
                        <h3 className={cx("label")}>Media Type</h3>
                        <div className={cx("container")}>
                            <div className={cx("button-container")}>
                                <span className={cx("button-text")}>{mediaType}</span>
                            </div>
                        </div>
                    </div>

                    {/* <div className={cx("select-wrapper")}>
                        <h3 className={cx("label")}>Category</h3>

                        <Select
                            placeholder="Select category ..."
                            isMulti
                            className={cx("multi-select")}
                            options={categories.map(function (category) {
                                return { value: category.id, label: category.name };
                            })}
                            onChange={console.log}
                        />
                    </div> */}

                    {/* select-end */}
                    {/* description-begin */}
                    <div className={cx("title-wrapper")}>
                        <h3 className={cx("label")}>Description</h3>
                        <textarea
                            value={description}
                            placeholder="Description of the NFT"
                            rows={10}
                            typeof="text"
                            className={cx("title-control")}
                            onChange={handleChangeDescription}
                        />
                    </div>
                    {/* description-end */}
                    {/* metadata-begin */}
                    <div className={cx("metadata-wrapper")}>
                        <h3 className={cx("label")}>Custom Metadata</h3>
                        {metadatas.map(function (metadata: any, index: number) {
                            return (
                                <div key={index} className={cx("metadata-content")}>
                                    <input
                                        placeholder="Property name"
                                        className={cx("metadata-property")}
                                        name="property"
                                        value={metadata.property}
                                        onChange={function (event) {
                                            return handleChangeMetadata(event, index);
                                        }}
                                    />
                                    <input
                                        placeholder="Property value"
                                        className={cx("metadata-value")}
                                        name="value"
                                        value={metadata.value}
                                        onChange={function (event) {
                                            return handleChangeMetadata(event, index);
                                        }}
                                    />

                                    <div
                                        className={cx("metadata-delete")}
                                        onClick={function () {
                                            return handleDeleteMetadata(index);
                                        }}
                                    >
                                        <TrashIcon />
                                    </div>
                                </div>
                            );
                        })}
                        <div onClick={handleAddMetadata} className={cx("metadata-add")}>
                            <span>
                                <AddIcon />
                            </span>
                            More information
                        </div>
                    </div>
                    {/* metadata-end */}
                    <section className={cx("right-reponsive")}>
                        <div className={cx("content")}>
                            <div className={cx("nft-wrapper")}>
                                <div className={cx("image-container")}>
                                    <Image src={imagePath ? imagePath : images.noImage} alt="NFT IMAGE" className={cx("image")} />
                                </div>
                                <div className={cx("nft-container")}>
                                    <section className={cx("content")}>
                                        <div className={cx("title")}>{title}</div>
                                    </section>

                                    <section className={cx("description")}>{description}</section>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* bill-begin */}
                    <div className={cx("bill-section")}>
                        <div className={cx("wrapper")}>
                            <div className={cx("container")}>
                                <h2 className={cx("title")}>Fees</h2>
                                <div className={cx("fee")}>
                                    <p>Platform fee</p>
                                    <span>0.0</span>
                                </div>
                                <div className={cx("fee")}>
                                    <p>Estimated Gas Fee</p>
                                    <span>0.18</span>
                                </div>
                                <div className={cx("fee-total")}>
                                    <p>Estimated Gas Fee</p>
                                    <span>0.18</span>
                                </div>
                            </div>
                        </div>

                        <div className={cx("mint")}>
                            {!isActionCreate ? (
                                <Button className={cx("button__mint")} onClick={handleMintNft}>
                                    Create
                                </Button>
                            ) : (
                                <ClipLoader size={40} loading={isActionCreate} color="#7000ff" speedMultiplier={1} />
                            )}
                        </div>
                    </div>
                    {/* bill-end */}
                </section>
                <section className={cx("right")}>
                    <div className={cx("content")}>
                        <header className={cx("preview")}>Preview</header>
                        <div className={cx("nft-wrapper")}>
                            <div className={cx("image-container")}>
                                <Image src={imagePath ? imagePath : images.noImage} alt="" className={cx("image")} />
                            </div>
                            <div className={cx("nft-container")}>
                                <section className={cx("content")}>
                                    <div className={cx("title")}>{title}</div>
                                </section>

                                <section className={cx("description")}>{description}</section>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default MintPage;
