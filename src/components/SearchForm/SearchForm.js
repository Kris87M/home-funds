import React from "react";
import { Input } from "antd";

const SearchForm = ({ onSearch, style }) => {
    return (
        <Input
            placeholder="Wyszukaj..."
            allowClear
            size="large"
            onChange={(e) => onSearch(e.target.value)}
            style={style}
        />
    );
};

export default SearchForm;
