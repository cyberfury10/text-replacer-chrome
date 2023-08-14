
import { Checkbox, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TextField from './custom-text-field';
import { isEmpty, noop } from '../util';
import { CANNOT_BE_EMPTY_MSG, ONCE_DONE_SAVE_MSG } from '../constants';

function UrlPanelRow({
    rowData,
    onDelete = noop,
    onSave = noop,
    onCheckChange = noop
}) {
    const [data, setData] = useState(rowData)
    const isSame = rowData.hostName === data.hostName

    const useEffect = (() => {
        setData(rowData)
    }, [rowData])

    const onChange = (e) => {
        setData({ ...data, hostName: e.target.value, errors: {} })
    }

    const onClear = () => {
        setData({ ...data, hostName: '', errors: {} })
    }

    // validations 
    const save = (performSave = true) => {
        let errors = {}
        let hasNoValidationError = true
        if (isEmpty(data.hostName)) {
            errors = {
                error: true,
                helperText: ONCE_DONE_SAVE_MSG,
            }
            hasNoValidationError = false
        }
        if (hasNoValidationError && performSave) {
            onSave({
                id: rowData.id,
                isEnabled: rowData.isEnabled,
                hostName: data.hostName,
            })
        } else {
            setData({
                ...data,
                id: rowData.id,
                isEnabled: rowData.isEnabled,
                errors,
            })
        }
    }

    const onEnterPress = (e) => {
        e.stopPropagation()
        if (e.key === 'Enter') {
            save()
        } else if (e.key === 'Escape') {
            clear()
        }
    }


    return <div className='url-panel-row'>
        <Checkbox size="small" checked={rowData.isEnabled} onChange={onCheckChange} />
        <TextField
            {...data.errors}
            hiddenLabel
            variant="outlined"
            size="small"
            fullWidth
            value={data.hostName}
            onChange={onChange}
            showClear={!isEmpty(data.hostName) && !isSame}
            onClear={onClear}
            onKeyDown={(e) => onEnterPress(e)}
        />
        <div className='save-cancel-delete'>
            {isSame ? <>
                <IconButton color="primary" aria-label="add to shopping cart" size="small" onClick={onDelete}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </> : <>
                <IconButton color="primary" aria-label="add to shopping cart"
                    size="small" onClick={save}>
                    <SaveIcon fontSize="small" />
                </IconButton>
            </>}
        </div>
    </div>

}

export default UrlPanelRow