import { Checkbox, Fab, IconButton, TextField } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function FindAndReplace(props) {
    const header = (
        <>
            <Checkbox size="small" />
            <div className='header-title'> Find </div>
            <div className='header-title'> Replace </div>
            <div className='bulk-edit'>
                <IconButton color="primary" aria-label="add to shopping cart" size="small">
                    <EditIcon fontSize="small" />
                </IconButton>
            </div>
        </>
    )
    const rows = (<><Checkbox size="small" />
        <TextField
            className='text-field'
            hiddenLabel
            variant="outlined"
            size="small"
            fullWidth
        />
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
        <>
            <div className='panel-container hundred-percent-width'>
                <div className='find-replace-panel' >
                    {header}
                    {rows}

                </div>
                <div className='floating-action-bar'>
                    <Fab color="primary" aria-label="add" size="small">
                        <AddIcon fontSize="small" />
                    </Fab>
                    <div className='auto-saved-by-default'>(Note:- contents are auto saved as you type)</div>
                </div>
            </div>
        </>
    );
}

export default FindAndReplace;