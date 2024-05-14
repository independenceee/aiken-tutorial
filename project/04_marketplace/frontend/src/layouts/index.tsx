import React, { ReactNode } from "react";
import PublicLayout from "~/layouts/public/PublicLayout";
type Props = {
    children: ReactNode;
};

const Layout = function ({ children }: Readonly<Props>) {
    return <PublicLayout>{children}</PublicLayout>;
};

export default Layout;
