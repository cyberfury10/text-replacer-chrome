import { Checkbox, TextField } from '@mui/material';
import React from 'react';

function UrlPanel(props) {
    return (
        <div className='url-panel' style={{ flex: '.6 .6 0' }}>
            <div className='panel-row'>
                <Checkbox />
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

export default UrlPanel;