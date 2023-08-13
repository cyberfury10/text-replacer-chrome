import { Checkbox, Fab, IconButton, TextField, Tooltip } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function UrlPanel(props) {
    const header = (
        <>
            <Tooltip title="Enable all">
                <Checkbox size="small" />
            </Tooltip>
            <Tooltip title={<span>When left empty, find & replace is applied to all websites</span>}>
                <div className='header-title'>  Websites</div>
            </Tooltip>
            <div className='bulk-edit'>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <EditIcon fontSize="small" />
                </IconButton>
            </div>
        </>
    )

    const rows = (<><Checkbox size="small" />
        <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            fullWidth
        />
        <div className='bulk-edit'>
            <IconButton color="primary" aria-label="add to shopping cart" size="small">
                <DeleteIcon fontSize="small" />
            </IconButton>
        </div></>)
    return (
        <div className='panel-container thirty-percent-width'>
            <div className='url-panel'>
                {header}
                {rows}

            </div>
            <div className='floating-action-bar'>
                <Fab color="primary" aria-label="add" size="small">
                    <AddIcon fontSize="small" />
                </Fab>
            </div>
        </div>
    );
}

export default UrlPanel;