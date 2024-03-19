import React, { useLayoutEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Hamburger.module.scss";
import SidebarMenu from "../SidebarMenu";

const cx = classNames.bind(styles);

const Hamburger = function () {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpenMenu = () => {
        setOpen((prev) => !prev);
    };

    useLayoutEffect(() => {
        const handleResponsiveSidebar = () => {
            if (window.innerWidth > 1290) setOpen(false);
        };

        window.addEventListener("resize", handleResponsiveSidebar);
    }, []);

    return (
        <>
            <button
                type="button"
                className={cx("wrapper", {
                    open: open,
                })}
                onClick={handleOpenMenu}
            >
                <span className={cx("bar")} />
                <span className={cx("bar")} />
                <span className={cx("bar")} />
            </button>
            <SidebarMenu open={open} setOpen={setOpen} />
        </>
    );
};

export default Hamburger;
