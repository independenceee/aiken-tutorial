import React from "react";
import classNames from "classnames/bind";
import styles from "./Title.module.scss";

const cx = classNames.bind(styles);

type Props = {
    main?: string;
    slug?: string;
};
const Title = function ({ main, slug }: Props) {
    return (
        <main className={cx("wrapper")}>
            <h2 className={cx("main")}>{main}</h2>
            {slug && (
                <div className={cx("flag")} data-aos="fade-down">
                    |
                </div>
            )}
            {slug && <h2 className={cx("slug")}>{slug}</h2>}
        </main>
    );
};

export default Title;
