import { Checkbox, Fab, IconButton, Tooltip } from '@mui/material';
import React, { useMemo, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { isEmpty, isEmptyArray } from '../util';
import { CANNOT_BE_EMPTY_MSG, FIND_AND_REPLACE_PANEL, URL_PANEL } from '../constants';
import { cloneDeep } from 'lodash';

function Panel({ data, setData: setDataProp, Row, extraProps }) {
    const [enableAll, setEnableAll] = useState(false)

    const setData = (newData, writeToStorage = true) => {
        setDataProp(newData, writeToStorage)
        const isAllEnabled = !isEmptyArray(newData) && newData.every(({ isEnabled }) => isEnabled === true)
        setEnableAll(isAllEnabled)
    }

    const onSave = (index) => (rowData) => {
        const newData = cloneDeep(data)
        newData[index] = rowData
        setData(newData)
    }

    const onDelete = (index) => () => {
        const newData = cloneDeep(data)
        newData.splice(index, 1)
        setData(newData)
    }

    const onAdd = () => {
        const erroObj = {
            error: true,
            helperText: CANNOT_BE_EMPTY_MSG,
        }
        const newData = cloneDeep(data)
        const canAddNewField = newData.every((item) => {
            if (extraProps.type === URL_PANEL && isEmpty(item.hostName)) {
                item.errors = erroObj
                return false
            } else if (extraProps.type === FIND_AND_REPLACE_PANEL) {
                let noError = true
                if (isEmpty(item.find)) {
                    item.findErrors = erroObj
                    noError = false
                }
                if (isEmpty(item.replace)) {
                    item.replaceErrors = erroObj
                    noError = false
                }
                return noError
            }
            return true
        })
        if (canAddNewField) {
            newData.push({ id: crypto.randomUUID(), ...extraProps.newObject })
        }
        setData(newData, false)
    }

    const onRowCheckChange = (index) => () => {
        const newData = cloneDeep(data)
        newData[index].isEnabled = !newData[index].isEnabled
        setData(newData)
    }

    const onEnableAll = () => {
        setEnableAll(!enableAll)
        setData(data.map(item => {
            item.isEnabled = !enableAll
            return item
        }))
    }

    let rows = useMemo(() => {
        if (isEmptyArray(data)) {
            return extraProps.noDataComponent
        }
        return data.map((item, index) => {
            return <Row
                rowData={item}
                onSave={onSave(index)}
                onDelete={onDelete(index)}
                onCheckChange={onRowCheckChange(index)}
                key={item.id} />
        })
    }, [data])

    return (
        <div className={`panel-container ${extraProps.widthClass}`}>
            <div className={extraProps.headerClass}>
                <Tooltip title="Enable all" placement="right-start">
                    <Checkbox size="small" checked={enableAll} onClick={onEnableAll} />
                </Tooltip>
                {extraProps.titleComponent}
                <div className='bulk-edit'>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <EditIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            <div className='panel-rows'>
                {rows}
            </div>
            <div className='floating-action-bar'>
                <Fab color="primary" aria-label="add" size="small" onClick={onAdd}>
                    <AddIcon fontSize="small" />
                </Fab>
            </div>
        </div>
    );
}

export default Panel;