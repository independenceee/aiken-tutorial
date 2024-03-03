import Image from "next/image";
import Product from "~/components/Product";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Header from "~/components/Header";

const cx = classNames.bind(styles);
export default function Home() {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </div>
    );
}
