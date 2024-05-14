"use client";

import classNames from "classnames/bind";
import { Detector } from "react-detect-offline";
import styles from "./NetworkStatus.module.scss";

const cx = classNames.bind(styles);

const NetworkStatus = function () {
    return (
        <Detector
            render={({ online }) =>
                !online ? (
                    <div className={cx("overlay")}>
                        <div className={cx("network-connection-modal")}>
                            <h2 className={cx("network-connection-message")}>
                                Service is currently unavailable, please try again later.
                            </h2>
                        </div>
                    </div>
                ) : null
            }
        />
    );
};

export default NetworkStatus;
