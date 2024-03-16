import React, { useLayoutEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Hamburger.module.scss";

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
        </>
    );
};

export default Hamburger;
