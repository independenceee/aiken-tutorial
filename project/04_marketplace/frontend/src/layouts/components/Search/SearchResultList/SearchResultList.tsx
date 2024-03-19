import React from "react";
import SearchResult from "../SearchResult/SearchResult";
import classNames from "classnames/bind";
import styles from "./SearchResultList.module.scss";

const cx = classNames.bind(styles);
type Props = {
    results?: string[];
};
const SearchResultList = ({ results }: Props) => {
    if (results) {
        return (
            <div className={cx("results-list")}>
                {results.map((result: any, id) => {
                    return <SearchResult result={result.name} key={id} />;
                })}
            </div>
        );
    }

    return (
        <div className={cx("results-list")}>
            <SearchResult result={"No results"} />
        </div>
    );
};

export default SearchResultList;
