import React from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchForm = ({ onSearch }) => {
    return (
        <Search
            placeholder="Wyszukaj..."
            allowClear
            size="large"
            onChange={(e) => onSearch(e.target.value)}
        />
    );
};

export default SearchForm;
