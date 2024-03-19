import "./globals.scss";
import "tippy.js/dist/tippy.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import Aos from "@/components/Aos";
import { ToastContainer } from "react-toastify";
import Layout from "@/layouts";
import ContextProvider from "@/contexts";

export const metadata: Metadata = {
    title: "Home - Demarket",
    description: "Home - Demarket",
};

type Props = {
    children: ReactNode;
};

const RootLayout = function ({ children }: Props) {
    return (
        <html lang="en">
            <Aos />
            <body>
                <ContextProvider>
                    <Layout>{children}</Layout>
                </ContextProvider>
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </body>
        </html>
    );
};

export default RootLayout;
