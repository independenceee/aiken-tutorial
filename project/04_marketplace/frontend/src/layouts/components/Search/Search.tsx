"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import SearchFeild from "./SearchFeild";
import SearchResultList from "./SearchResultList";
const cx = classNames.bind(styles);

type Props = {};

const Search = function ({}: Props) {
    const [results, setResults] = useState<any>([]);

    return (
        <div className={cx("search-bar-container")}>
            <SearchFeild setResults={setResults} />
            {results && results.length > 0 ? <SearchResultList results={results} /> : <SearchResultList />}
        </div>
    );
};

export default Search;
