import React, { MouseEvent, useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import styles from "./SearchFeild.module.scss";
import routes from "@/configs/routes";
import { ModalContextType } from "@/types/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";

const cx = classNames.bind(styles);

type Props = {
    setResults: React.Dispatch<React.SetStateAction<any[]>>;
};
const SearchFeild = function ({ setResults }: Props) {
    const { isShowingSearch, toggleShowingSearch } = useContext<ModalContextType>(ModalContext);

    const router = useRouter();
    const [input, setInput] = useState("");

    const fetchData = (value: any) => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((user: any) => {
                    return value && user && user.name && user.name.toLowerCase().includes(value);
                });
                setResults(results);
            });
    };

    const handleChange = (value: any) => {
        setInput(value);
        fetchData(value);
    };

    const handleSubmit = function () {
        router.push(routes.marketplace + "?search=" + input);
        if (isShowingSearch) {
            toggleShowingSearch();
        }
    };

    return (
        <div className={cx("input-wrapper")}>
            <button onClick={handleSubmit} className={cx("search-icon")}>
                <FaSearch className={cx("search-icon")} />
            </button>
            <input placeholder="Enter you policyId ..." value={input} onChange={(e) => handleChange(e.target.value)} />
        </div>
    );
};

export default SearchFeild;
