import React from 'react';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
export default function SearchBar(props) {
    return (
        <TextField
            type="text"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Toggle password visibility"
                            onClick={() => console.log('Test')}
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
}
