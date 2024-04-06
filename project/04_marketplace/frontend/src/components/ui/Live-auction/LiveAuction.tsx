import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import NftCard from "../Nft-card/NftCard";
import { NFT__DATA } from "../../../assets/data/data.js";

import "./live-auction.css";
import { ProductType } from "../../../contexts/SmartcontractProvider";

const LiveAuction = ({ products }: { products: ProductType[] }) => {
    return (
        <section>
            <Container>
                <Row>
                    {products.map((item: ProductType) => (
                        <Col lg="3" md="4" sm="6" className="mb-4">
                            <NftCard key={item.id} item={item} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default LiveAuction;
