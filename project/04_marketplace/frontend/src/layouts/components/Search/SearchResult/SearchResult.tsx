import React from "react";
import classNames from "classnames/bind";
import styles from "./SearchResult.module.scss";
const cx = classNames.bind(styles);
type Props = {
    result: string;
};
const SearchResult = ({ result }: Props) => {
    return (
        <div className={cx("search-result")} onClick={(e) => alert(`You selected ${result}!`)}>
            {result}
        </div>
    );
};

export default SearchResult;
