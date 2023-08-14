
import { Checkbox, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import TextField from './custom-text-field';
import { isEmpty, noop } from '../util';

function FindAndReplacePanelRow({
    rowData,
    onDelete = noop,
    onSave = noop,
    onCheckChange = noop
}) {
    const [data, setData] = useState({ find: '', replace: '' })
    const isSameFind = rowData.find === data.find
    const isSameReplace = rowData.replace === data.replace

    const useEffect = (() => {
        setHostName({ find: rowData.find, replace: rowData.replace })
    }, [])


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
            showClear={!isEmpty(data.find) && !isSameFind}
            onClear={onFindClear}
        />
        <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            fullWidth
            value={data.replace}
            onChange={onReplaceChange}
            showClear={!isEmpty(data.replace) && !isSameReplace}
            onClear={onReplaceClear}
        />
        <div className='save-cancel-delete'>
            {isSameFind && isSameReplace ? <>
                <IconButton color="primary" aria-label="add to shopping cart" size="small"
                    onClick={onDelete}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </> : <>
                <IconButton color="primary" aria-label="add to shopping cart" size="small"
                    onClick={() => {
                        onSave(data)
                    }}>
                    <SaveIcon fontSize="small" />
                </IconButton>
            </>}
        </div>
    </div>

}

export default FindAndReplacePanelRow