
import { Checkbox, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TextField from './custom-text-field';
import { isEmpty, noop } from '../util';

function UrlPanelRow({
    rowData,
    onDelete = noop,
    onSave = noop,
    onCheckChange = noop
}) {
    const [hostName, setHostName] = useState('')
    const isSame = rowData.hostName === hostName

    const useEffect = (() => {
        setHostName(rowData.hostName)
    }, [])

    const onChange = (e) => {
        setHostName(e.target.value)
    }

    const onClear = () => {
        setHostName('')
    }

    return <div className='url-panel-row'>
        <Checkbox size="small" checked={rowData.isEnabled} onChange={onCheckChange} />
        <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            fullWidth
            value={hostName}
            onChange={onChange}
            showClear={!isEmpty(hostName) && !isSame}
            onClear={onClear}
        />
        <div className='save-cancel-delete'>
            {isSame ? <>
                <IconButton color="primary" aria-label="add to shopping cart" size="small" onClick={onDelete}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </> : <>
                <IconButton color="primary" aria-label="add to shopping cart"
                    size="small" onClick={() => {
                        onSave({ isEnabled: rowData.isEnabled, hostName: hostName })
                    }
                    }>
                    <SaveIcon fontSize="small" />
                </IconButton>
            </>}
        </div>
    </div>

}

export default UrlPanelRow