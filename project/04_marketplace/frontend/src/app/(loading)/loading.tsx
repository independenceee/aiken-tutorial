import React from "react";
import "./Loading.scss";

type Props = {};

const Loading = function ({}: Props) {
    return (
        <div id="preloader">
            <ul className="preloader__wrapper">
                <li className="preloader_box" style={{ "--i": "300ms" } as any}></li>
                <li className="preloader_box" style={{ "--i": "400ms" } as any}></li>
                <li className="preloader_box" style={{ "--i": "300ms" } as any}></li>
                <li className="preloader_box" style={{ "--i": "200ms" } as any}></li>
                <li className="preloader_box" style={{ "--i": "300ms" } as any}></li>
                <li className="preloader_box" style={{ "--i": "400ms" } as any}></li>
                <li className="preloader_box" style={{ "--i": "100ms" } as any}></li>
                <li className="preloader_box" style={{ "--i": "200ms" } as any}></li>
                <li className="preloader_box" style={{ "--i": "300ms" } as any}></li>
            </ul>
        </div>
    );
};

export default Loading;
