
import { Checkbox, IconButton } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TextField from './custom-text-field';
import { isEmpty, noop } from '../util';

function UrlPanelRow({ rowData = { hostName: '' }, onDelete = noop, onSave = noop, onCheckChange = noop }) {
    const [data, setData] = useState({ hostName: '' })
    const isSame = rowData.hostName === data.hostName

    const onChange = (e) => {
        setData({ ...data, hostName: e.target.value })
    }

    const onClear = () => {
        setData({ ...data, hostName: '' })
    }

    return <div className='url-panel-row'>
        <Checkbox size="small" checked={rowData.isEnabled} onChange={onCheckChange} />
        <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            fullWidth
            value={data.hostName}
            onChange={onChange}
            showClear={!isEmpty(data.hostName)}
            onClear={onClear}
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

export default UrlPanelRow