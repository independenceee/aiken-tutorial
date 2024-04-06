import React, { useContext, useRef } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import LiveAuction from "../components/ui/Live-auction/LiveAuction";
import {
    AccountContext,
    AccountContextType,
} from "../contexts/AccountProvider";

const Contact = () => {
    const { assetsFromAddress } =
        useContext<AccountContextType>(AccountContext);
    return (
        <>
            <LiveAuction products={assetsFromAddress} />
        </>
    );
};

export default Contact;
