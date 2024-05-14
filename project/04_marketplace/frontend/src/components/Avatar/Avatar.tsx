import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import classNames from "classnames/bind";
import images from "~/assets/images";
import styles from "./Avatar.module.scss";

const cx = classNames.bind(styles);
type Props = {
    image?: string;
    url?: string;
    className?: string;
};

const Avatar = function ({ image, className, url }: Props) {
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/account/` + url)} className={cx("wrapper", className)}>
            <Image
                width={200}
                height={200}
                objectFit="cover"
                className={cx("image")}
                src={image ? image : images.user}
                alt=""
            />
        </div>
    );
};

export default Avatar;
