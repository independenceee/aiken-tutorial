import React, { useRef, useEffect, useContext } from "react";
import "./header.css";
import { Container } from "reactstrap";

import { NavLink, Link } from "react-router-dom";
import {
    WalletContext,
    WalletContextType,
} from "../../contexts/WalletProvider";

const NAV__LINKS = [
    {
        display: "Home",
        url: "/home",
    },
    {
        display: "Market",
        url: "/market",
    },
    {
        display: "Create",
        url: "/create",
    },
    {
        display: "Account",
        url: "/account",
    },
];

const Header = () => {
    const { wallet } = useContext<WalletContextType>(WalletContext);
    const headerRef: any = useRef(null);

    const menuRef: any = useRef(null);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (
                document.body.scrollTop > 80 ||
                document.documentElement.scrollTop > 80
            ) {
                headerRef.current.classList.add("header__shrink");
            } else {
                headerRef.current.classList.remove("header__shrink");
            }
        });

        return () => {
            window.removeEventListener("scroll", null!);
        };
    }, []);

    const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <div className="navigation">
                    <div className="logo">
                        <h2 className=" d-flex gap-2 align-items-center ">
                            <span>
                                <i className="ri-fire-fill"></i>
                            </span>
                            NFTs
                        </h2>
                    </div>

                    <div
                        className="nav__menu"
                        ref={menuRef}
                        onClick={toggleMenu}
                    >
                        <ul className="nav__list">
                            {NAV__LINKS.map((item, index) => (
                                <li className="nav__item" key={index}>
                                    <NavLink
                                        to={item.url}
                                        className={(navClass) =>
                                            navClass.isActive ? "active" : ""
                                        }
                                    >
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="nav__right d-flex align-items-center gap-5 ">
                        {wallet ? (
                            <button className="btn d-flex gap-2 align-items-center">
                                <span>
                                    <img
                                        src={wallet.image}
                                        alt=""
                                        width={40}
                                        height={40}
                                    />
                                </span>
                                <Link to="/account">{wallet.balance} ADA</Link>
                            </button>
                        ) : (
                            <button className="btn d-flex gap-2 align-items-center">
                                <span>
                                    <i className="ri-wallet-line"></i>
                                </span>
                                <Link to="/wallet">Connect Wallet</Link>
                            </button>
                        )}

                        <span className="mobile__menu">
                            <i
                                className="ri-menu-line"
                                onClick={toggleMenu}
                            ></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
