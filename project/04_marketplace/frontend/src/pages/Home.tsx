import React, { useContext } from "react";
import HeroSection from "../components/ui/HeroSection";
import LiveAuction from "../components/ui/Live-auction/LiveAuction";
import Trending from "../components/ui/Trending-section/Trending";
import StepSection from "../components/ui/Step-section/StepSection";
import {
    SmartcontractContext,
    SmartcontractType,
} from "../contexts/SmartcontractProvider";

const Home = () => {
    const { assetsFromSmartContract } =
        useContext<SmartcontractType>(SmartcontractContext);
    return (
        <div>
            <HeroSection />
            <Trending products={assetsFromSmartContract} />
            <StepSection />
        </div>
    );
};

export default Home;
