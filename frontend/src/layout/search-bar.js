import React, { useState } from 'react';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchBar(props) {
    const { onChange, onSearch, ...rest} = props;
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        if(onChange) {
            onChange(e.target.value);
        }
    };

    const handleSearch = () => {
        if(onSearch) {
            onSearch(value);
        }
    }

    const handleKeyUp = (e) => {
        if (e.charCode === 13 || e.key === 'Enter') {
            handleSearch();
        } 
    }

    return (
        <TextField
            type="text"
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Toggle password visibility"
                            onClick={handleSearch}
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...rest}
        />
    );
}
