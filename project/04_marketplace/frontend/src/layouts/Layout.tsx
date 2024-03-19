"use client";
import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { usePathname } from "next/navigation";
import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer";
import styles from "./Layout.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: ReactNode;
};

const Layout = function ({ children }: Props) {
    const pathName: any = usePathname();
    const [selectedRouter, setSelectedRouter] = useState<string>("");

    useEffect(() => {
        const router = pathName.split("/").join("").toUpperCase();
        setSelectedRouter(router || "Home");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathName]);

    return (
        <main className={cx("wrapper")}>
            <Header selectedRouter={selectedRouter} setSelectedRouter={setSelectedRouter} />
            <div className={cx("container")}>{children}</div>
            <Footer selectedRouter={selectedRouter} setSelectedRouter={setSelectedRouter} />
        </main>
    );
};

export default Layout;
