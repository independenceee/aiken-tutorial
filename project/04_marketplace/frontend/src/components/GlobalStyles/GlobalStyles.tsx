import "./GlobalStyles.scss";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const GlobalStyles = function ({ children }: Props) {
    return children;
};

export default GlobalStyles;
