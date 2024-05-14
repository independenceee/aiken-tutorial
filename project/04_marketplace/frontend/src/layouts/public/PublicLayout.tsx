"use client";

import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./PublicLayout.module.scss";
import Loading from "~/app/(loading)/loading";
import Form from "~/layouts/components/Form";
import Notification from "~/layouts/components/Notification";
import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
import { usePathname } from "next/navigation";
type Props = {
    children: ReactNode;
};

const cx = classNames.bind(styles);
const LOADING_TIME = 1000;

const PublicLayout = function ({ children }: Props) {
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const pathName: any = usePathname();
    const [selectedRouter, setSelectedRouter] = useState<string>("");
    useEffect(() => {
        const router = pathName.split("/").join("").toUpperCase();
        setSelectedRouter(router || "Home");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathName]);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, LOADING_TIME);
    }, []);

    return (
        <main className={cx("wrapper")}>
            <Form />
            <div>
                <Header selectedRouter={selectedRouter} setSelectedRouter={setSelectedRouter} />
                {children}
                <Footer />
            </div>

            <Notification />
            {pageLoading && <Loading />}
        </main>
    );
};

export default PublicLayout;
