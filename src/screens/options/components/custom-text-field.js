
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

function CustomTextField({ showClear, onClear, ...rest }) {

    const clearButton = showClear ? {
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        onClick={onClear}
                        edge="end"
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                </InputAdornment>
            )
        }
    } : {}

    return <TextField
        className='custom-text-field'
        hiddenLabel
        variant="outlined"
        size="small"
        fullWidth
        {...clearButton}
        {...rest}
    />


}
export default CustomTextField;