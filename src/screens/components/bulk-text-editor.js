
import { Divider, IconButton } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

function BulkTextEditor({ close, ...extraProps }) {
    return <div className={`panel-container ${extraProps.widthClass}`}>
        <div className='bulk-editor-header'>
            <div className='header-title'>Bulk edit</div>
            <div className='menu-button'>
                <IconButton color="primary" onClick={close}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
        <Divider />
        <div className='panel-rows'>
            <textarea
                className='custom-text-area'
            />
        </div>
    </div>



}
export default BulkTextEditor;