import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import classNames from "classnames/bind";
import images from "@/assets/images";
import styles from "./Avatar.module.scss";
import { AccountItemType } from "@/types/GenericsType";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";

const cx = classNames.bind(styles);
type Props = {
    account: AccountItemType;
    small?: any;
    medium?: any;
    large?: any;
};

const Avatar = function ({ account }: Props) {
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/account/${account.walletAddress}`)} className={cx("wrapper")}>
            <Image
                width={200}
                height={200}
                objectFit="cover"
                className={cx("image")}
                src={account?.avatar ? (convertIpfsAddressToUrl(account?.avatar) as string) : images.user}
                alt=""
            />
        </div>
    );
};

export default Avatar;
