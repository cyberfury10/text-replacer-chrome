import { Checkbox, TextField } from '@mui/material';
import React from 'react';

function FindAndReplace(props) {
    return (
        <div className='find-replace-panel' style={{ flex: '1 1 0' }}>
            <div className='panel-row'>
                <Checkbox />
                <TextField
                    className='text-field'
                    hiddenLabel
                    variant="filled"
                    size="small"
                    fullWidth
                />
                <TextField
                    className='text-field'
                    hiddenLabel
                    variant="filled"
                    size="small"
                    fullWidth
                />
            </div>
        </div>
    );
}

export default FindAndReplace;