
import { Checkbox, IconButton } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TextField from './custom-text-field';
import { isEmpty, noop } from '../util';

function FindAndReplacePanelRow({ rowData = { find: '', replace: '' }, onDelete = noop, onSave = noop, onCheckChange = noop }) {
    const [data, setData] = useState({ find: '', replace: '' })
    const isSame = rowData.find === data.find && rowData.replace === data.replace

    const onFindChange = (e) => {
        setData({ ...data, find: e.target.value })
    }

    const onReplaceChange = (e) => {
        setData({ ...data, replace: e.target.value })
    }

    const onFindClear = () => {
        setData({ ...data, find: '' })
    }


    const onReplaceClear = () => {
        setData({ ...data, replace: '' })
    }

    return <div className='find-replace-panel-row'>
        <Checkbox size="small" checked={rowData.isEnabled} onChange={onCheckChange} />
        <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            fullWidth
            value={data.find}
            onChange={onFindChange}
            showClear={!isEmpty(data.find)}
            onClear={onFindClear}
        />
        <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            fullWidth
            value={data.replace}
            onChange={onReplaceChange}
            showClear={!isEmpty(data.replace)}
            onClear={onReplaceClear}
        />
        <div className='save-cancel-delete'>
            {isSame ? <>
                <IconButton color="primary" aria-label="add to shopping cart" size="small"  >
                    <DeleteIcon fontSize="small" onClick={onDelete} />
                </IconButton>
            </> : <>
                <IconButton color="primary" aria-label="add to shopping cart" size="small">
                    <SaveIcon fontSize="small" onClick={onSave(data)} />
                </IconButton>
            </>}
        </div>
    </div>

}

export default FindAndReplacePanelRow