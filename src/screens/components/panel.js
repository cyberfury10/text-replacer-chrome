import { Checkbox, Fab, IconButton, Tooltip, MenuItem, Menu } from '@mui/material';
import React, { useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { isEmpty, isEmptyArray } from '../util';
import { CANNOT_BE_EMPTY_MSG, FIND_AND_REPLACE_PANEL, URL_PANEL } from '../constants';
import { cloneDeep } from 'lodash';

const menuItemStyle = {
    fontSize: "14px",
}

function Panel({ data, setData: setDataProp, Row, extraProps }) {
    const [enableAll, setEnableAll] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={toggleIsMenuOpen}>
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            <div className='panel-rows'>
                {rows}
            </div>
            <div className='floating-action-bar'>
                <Fab color="primary" aria-label="add" size="small" onClick={() => { onAdd(cloneDeep(data)) }}>
                    <AddIcon fontSize="small" />
                </Fab>
            </div>
            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClick={toggleIsMenuOpen}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.32))',
                        fontSize: "12px",
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
            >
                <MenuItem style={menuItemStyle} onClick={toggleIsMenuOpen}>
                    Bulk edit
                </MenuItem>
                <MenuItem style={menuItemStyle} onClick={deleteAll}>
                    Delete all
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Panel;