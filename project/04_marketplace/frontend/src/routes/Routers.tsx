// @ts-nocheck
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Market from "../pages/Market";
import Account from "../pages/Account";
import Wallet from "../pages/Wallet";

const Routers = function (): any {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wallet" element={<Wallet />} />
        </Routes>
    );
};

export default Routers;
