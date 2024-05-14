import "./globals.scss";
import type { Metadata } from "next";
import Aos from "~/components/Aos";
import NetworkStatus from "~/components/NetworkStatus";
import Toast from "~/components/Toast";
import ContextProvider from "~/contexts";
import Layout from "~/layouts";

export const metadata: Metadata = {
    title: "Demarket",
    description: "Open Your Own Marketplace",
};

type Props = Readonly<{
    children: React.ReactNode;
}>;

const RootLayout = function ({ children }: Props) {
    return (
        <html lang="en">
            <body>
                <ContextProvider>
                    <Layout>{children}</Layout>
                </ContextProvider>
            </body>
            <NetworkStatus />
            <Aos />
            <Toast />
        </html>
    );
};

export default RootLayout;
