
import { Checkbox, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TextField from './custom-text-field';
import { isEmpty, noop } from '../util';
import { CANNOT_BE_EMPTY_MSG } from '../constants';

const FIND = 'FIND'
const REPLACE = 'REPLACE'

function FindAndReplacePanelRow({
    rowData,
    onDelete = noop,
    onSave = noop,
    onCheckChange = noop
}) {
    const [data, setData] = useState(rowData)
    const isSameFind = rowData.find === data.find
    const isSameReplace = rowData.replace === data.replace

    useEffect(() => {
        setData({ ...rowData, find: data.find, replace: data.replace })
    }, [rowData])


    const onChange = (value, field) => {
        if (field === FIND) {
            setData({
                ...data, find: value, findErrors: {}
            })
        }
        if (field === REPLACE) {
            setData({ ...data, replace: value, replaceErrors: {} })
        }
    }

    const clear = (fieldType) => {
        if (fieldType === FIND) {
            setData({ ...data, find: '', findErrors: {} })
        }
        if (fieldType === REPLACE) {
            setData({ ...data, replace: '', replaceErrors: {} })
        }
    }

    // validations 
    const save = (isEnterPress = false) => {
        let findErrors = {}
        let replaceErrors = {}
        let hasNoValidationError = true
        if (isEmpty(data.find)) {
            findErrors = {
                error: true,
                helperText: CANNOT_BE_EMPTY_MSG,
            }
            hasNoValidationError = false
        }

        if (isEmpty(data.replace)) {
            replaceErrors = {
                error: true,
                helperText: CANNOT_BE_EMPTY_MSG,
            }
            hasNoValidationError = false
        }

        if (hasNoValidationError) {
            onSave({
                ...data,
                id: rowData.id,
                isEnabled: rowData.isEnabled,
                findErrors: {},
                replaceErrors: {},
            }, isEnterPress)
        } else {
            setData({
                ...data,
                id: rowData.id,
                isEnabled: rowData.isEnabled,
                findErrors,
                replaceErrors
            })
        }
    }

    const onEnterPress = (e, fieldType) => {
        e.stopPropagation()
        if (e.key === 'Enter') {
            save(true)
        } else if (e.key === 'Escape') {
            clear(fieldType)
        }
    }

    return <div className='find-replace-panel-row'>
        <Checkbox size="small" checked={rowData.isEnabled} onChange={onCheckChange} />
        <TextField
            {...data.findErrors}
            hiddenLabel
            variant="outlined"
            size="small"
            fullWidth
            value={data.find}
            onChange={(e) => onChange(e.target.value, FIND)}
            showClear={!isEmpty(data.find) && !isSameFind}
            onClear={() => clear(FIND)}
            onKeyDown={(e) => onEnterPress(e, FIND)}
            autoFocus
        />
        <TextField
            {...data.replaceErrors}
            hiddenLabel
            variant="outlined"
            size="small"
            fullWidth
            value={data.replace}
            onChange={(e) => onChange(e.target.value, REPLACE)}
            showClear={!isEmpty(data.replace) && !isSameReplace}
            onClear={() => clear(REPLACE)}
            onKeyDown={(e) => onEnterPress(e, REPLACE)}
        />
        <div className='save-cancel-delete'>
            {isSameFind && isSameReplace ? <>
                <IconButton color="primary" aria-label="add to shopping cart" size="small"
                    onClick={onDelete}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </> : <>
                <IconButton color="primary" aria-label="add to shopping cart" size="small"
                    onClick={save}>
                    <SaveIcon fontSize="small" />
                </IconButton>
            </>}
        </div>
    </div>

}

export default FindAndReplacePanelRow