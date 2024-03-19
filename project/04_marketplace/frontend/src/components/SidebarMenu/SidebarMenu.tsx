import React, { Dispatch, SetStateAction, useState } from "react";
import classNames from "classnames/bind";
import styles from "./SidebarMenu.module.scss";
import { publicRouters } from "@/routes";
import configs from "@/configs";
import HeaderOption from "@/layouts/components/Header/HeaderOption";
import ConnectWallet from "@/layouts/components/ConnectWallet/ConnectWallet";
import HeaderUtilities from "@/layouts/components/HeaderUtilities";

const cx = classNames.bind(styles);

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    className?: string;
};

const SidebarMenu = function ({ open, setOpen, className }: Props) {
    const [selected, setSelected] = useState<string>(configs.routes.home);

    return (
        <div
            className={cx(
                "wrapper",
                {
                    open,
                },
                className,
            )}
        >
            <ConnectWallet className={cx("connect-wallet-button")} />
            <nav className={cx("navbar")}>
                <ul className={cx("nav-list")}>
                    {publicRouters.map(function ({ name, redirect }, index: number) {
                        return (
                            <HeaderOption
                                key={index}
                                text={name}
                                redirect={redirect}
                                isActive={Boolean(selected === redirect)}
                                setSelected={setSelected}
                                className={cx("nav-item-link")}
                                setOpen={setOpen}
                            />
                        );
                    })}
                </ul>
            </nav>
            <HeaderUtilities className={cx("utilities")} />
        </div>
    );
};

export default SidebarMenu;
