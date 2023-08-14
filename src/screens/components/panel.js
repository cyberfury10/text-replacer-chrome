import { Checkbox, Fab, IconButton, Tooltip } from '@mui/material';
import React, { useMemo, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { isEmptyArray } from '../util';

function Panel({ data = [], setData: setDataProp, Row, extraProps }) {
    const [enableAll, setEnableAll] = useState(false)

    const setData = (newData) => {
        setDataProp(newData)
        const isAllEnabled = !isEmptyArray(newData) && newData.every(({ isEnabled }) => isEnabled === true)
        setEnableAll(isAllEnabled)
    }

    const onSave = (index) => (rowData) => {
        const clonedObj = [...data]
        clonedObj[index] = rowData
        setData(clonedObj)
    }

    const onDelete = (index) => () => {
        data.splice(index, 1)
        setData([...data])
    }

    const onAdd = () => {
        const newData = [...data, { isEnabled: true, hostName: '' }]
        setData(newData)
    }

    const onRowCheckChange = (index) => () => {
        const newData = [...data]
        newData[index].isEnabled = !newData[index].isEnabled
        setData(newData)
    }

    const onEnableAll = () => {
        setEnableAll(!enableAll)
        setData(data.map(website => {
            website.isEnabled = !enableAll
            return website
        }))
    }

    let rows = useMemo(() => {
        if (isEmptyArray(data)) {
            return extraProps.noDataComponent
        }
        return data.map((website, index) => {
            return <Row rowData={website} onSave={onSave(index)} onDelete={onDelete(index)} onCheckChange={onRowCheckChange(index)} key={`urls-${index}`} />
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