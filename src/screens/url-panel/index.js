import { Checkbox, Fab, IconButton, Tooltip } from '@mui/material';
import React, { useMemo, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Row from './row';
import { isEmptyArray } from '../util';

function UrlPanel({ websites = [], setWebsites: setWebsitesProp }) {
    const [enableAll, setEnableAll] = useState(false)

    const setWebsites = (newWebsites) => {
        setWebsitesProp(newWebsites)
        const isAllEnabled = !isEmptyArray(newWebsites) && newWebsites.every(({ isEnabled }) => isEnabled === true)
        setEnableAll(isAllEnabled)
    }

    const onSave = (index) => (rowData) => {
        const clonedObj = [...websites]
        clonedObj[index] = rowData
        setWebsites(clonedObj)
    }

    const onDelete = (index) => () => {
        websites.splice(index, 1)
        setWebsites([...websites])
    }

    const onAdd = () => {
        const newWebsites = [...websites, { isEnabled: true, hostName: '' }]
        setWebsites(newWebsites)
    }

    const onRowCheckChange = (index) => () => {
        const newWebsites = [...websites]
        newWebsites[index].isEnabled = !newWebsites[index].isEnabled
        setWebsites(newWebsites)
    }

    const onEnableAll = () => {
        setEnableAll(!enableAll)
        setWebsites(websites.map(website => {
            website.isEnabled = !enableAll
            return website
        }))
    }

    let rows = useMemo(() => {
        if (isEmptyArray(websites)) {
            return <div className='no-data'>
                <p>No entries, Thats okay !!!</p>
                <p>Find & Replace will be applied on all websites. Click (+) below to add websites so that replace is performed only on them</p>
            </div>
        }
        return websites.map((website, index) => {
            return <Row rowData={website} onSave={onSave(index)} onDelete={onDelete(index)} onCheckChange={onRowCheckChange(index)} key={`urls-${index}`} />
        })
    }, [websites])

    return (
        <div className='panel-container thirty-percent-width'>
            <div className='url-panel-header'>
                <Tooltip title="Enable all" placement="right-start">
                    <Checkbox size="small" checked={enableAll} onClick={onEnableAll} />
                </Tooltip>
                <Tooltip title={<span>Add entries below to perform find & replace only on those websites</span>}>
                    <div className='header-title'>  Websites</div>
                </Tooltip>
                <div className='bulk-edit'>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <EditIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            <div className='url-panel-rows'>
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

export default UrlPanel;