import React, { useContext } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/wallet.css";
import wallets from "../constants/wallets";
import { WalletContext, WalletContextType } from "../contexts/WalletProvider";

const Wallet = () => {
    const { connect } = useContext<WalletContextType>(WalletContext);
    return (
        <>
            <CommonSection title="Connect Wallet" />
            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5 text-center">
                            <div className="w-50 m-auto">
                                <h3 className="text-light">
                                    Connect your wallet
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Minima numquam nisi, quam
                                    obcaecati a provident voluptas sequi unde
                                    officiis placeat!
                                </p>
                            </div>
                        </Col>

                        {wallets.map((item, index) => (
                            <Col
                                lg="3"
                                md="4"
                                sm="6"
                                key={index}
                                onClick={() =>
                                    connect({
                                        name: item.name,
                                        api: item.api,
                                        image: item.image,
                                        checkApi: item.checkApi,
                                    })
                                }
                                className="mb-4"
                            >
                                <div className="wallet__item">
                                    <span>
                                        <img
                                            width={40}
                                            height={40}
                                            src={item.image}
                                            alt=""
                                        />
                                    </span>
                                    <h5>{item.name}</h5>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Wallet;
