import React, { useState,ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

type Props = {
    label?: string;
    placeholder?: string;
    rows?: number;
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>
};

const Input = function ({ label, placeholder, rows }: Props) {
    const handleChange = function (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | any,
    ) {
        event.preventDefault();
    };
    return (
        <main className={cx("wrapper")}>
            <h3 className={cx("label")}>{label}</h3>
            {rows ? (
                <textarea
                    onChange={handleChange}
                    className={cx("control")}
                    rows={rows}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    onChange={handleChange}
                    className={cx("control")}
                    placeholder={placeholder}
                />
            )}
        </main>
    );
};

export default Input;
