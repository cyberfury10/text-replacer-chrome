import { Checkbox, Fab, IconButton, Tooltip, MenuItem, Menu, Divider, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { isEmpty, isEmptyArray } from '../util';
import { CANNOT_BE_EMPTY_MSG, FIND_AND_REPLACE_PANEL, URL_PANEL } from '../constants';
import { cloneDeep } from 'lodash';
import BulkTextEditor from './bulk-text-editor';
import DropDown from './drop-down-menu';

function Panel({ data, setData: setDataProp, Row, extraProps }) {
    const [enableAll, setEnableAll] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isBulkEditMode, setIsBulkEditMode] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const setData = (newData, writeToStorage = true) => {
        setDataProp(newData, writeToStorage)
        const isAllEnabled = !isEmptyArray(newData) && newData.every(({ isEnabled }) => isEnabled === true)
        setEnableAll(isAllEnabled)
    }

    const onSave = (index) => (rowData, isEnterPress = false) => {
        const newData = cloneDeep(data)
        newData[index] = rowData
        if (isEnterPress === true && index === newData.length - 1) {
            onAdd(newData)
        } else {
            setData(newData)
        }
    }

    const onDelete = (index) => () => {
        const newData = cloneDeep(data)
        newData.splice(index, 1)
        setData(newData)
    }

    const deleteAll = () => {
        setData([])
    }

    const onAdd = (newData) => {
        const erroObj = {
            error: true,
            helperText: CANNOT_BE_EMPTY_MSG,
        }
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

    const toggleIsMenuOpen = (e) => {
        if (!isMenuOpen === false) {
            setAnchorEl(null);
        } else {
            setAnchorEl(e.currentTarget);
        }
        setIsMenuOpen(!isMenuOpen)
    }

    const toggleBulkEditMode = (e) => {
        setIsBulkEditMode(!isBulkEditMode)
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

    if (isBulkEditMode) {
        return <BulkTextEditor close={toggleBulkEditMode} {...extraProps} />
    }
    return (
        <div className={`panel-container ${extraProps.widthClass}`}>
            <div className={extraProps.headerClass}>
                <Tooltip title="Enable all" placement="right-start">
                    <Checkbox size="small" checked={enableAll} onClick={onEnableAll} />
                </Tooltip>
                {extraProps.titleComponent}
                <div className='menu-button'>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={toggleIsMenuOpen}>
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            <Divider />
            <div className='panel-rows'>
                {rows}
            </div>
            <div className='floating-action-bar'>
                <Fab color="primary" aria-label="add" size="small" onClick={() => { onAdd(cloneDeep(data)) }}>
                    <AddIcon fontSize="small" />
                </Fab>
            </div>
            <DropDown
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClick={toggleIsMenuOpen}
                menuItems={[
                    {
                        label: "Bulk edit",
                        onClick: toggleBulkEditMode
                    },
                    {
                        label: "Delete all",
                        onClick: deleteAll
                    }
                ]}
            />
        </div>
    );
}

export default Panel;