"use client";
import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer";
import styles from "./Layout.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: ReactNode;
};

const Layout = function ({ children }: Props) {
    return (
        <main className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>{children}</div>
            <Footer />
        </main>
    );
};

export default Layout;
