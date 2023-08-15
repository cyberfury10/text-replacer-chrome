
import { Divider, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { FIND_AND_REPLACE_PANEL, URL_PANEL } from '../constants';

function BulkTextEditor({ close, data, setData, ...extraProps }) {
    const [text, setText] = useState('')

    useEffect(() => {
        if (extraProps.type === URL_PANEL) {
            setText(urlPanelDecode(data))
        } else if (extraProps.type === FIND_AND_REPLACE_PANEL) {
            setText(findAndReplaceDecode(data))
        }
    }, [])

    const onChange = (e) => {
        setText(e.target.value)
    }
    const save = () => {
        let parsedData = []
        if (extraProps.type === URL_PANEL) {
            parsedData = urlPanelEncode(text)
        } else if (extraProps.type === FIND_AND_REPLACE_PANEL) {
            parsedData = findAndReplaceEncode(text)
        }
        setData(parsedData)
        close()
    }

    return <div className={`panel-container ${extraProps.widthClass}`}>
        <div className='bulk-editor-header'>
            <div className='header-title'>Bulk edit</div>
            <div className='menu-button'>
                <IconButton color="primary" onClick={save}>
                    <SaveIcon fontSize="small" />
                </IconButton>
                <IconButton color="primary" onClick={close}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
        <Divider />
        <div className='panel-rows'>
            <textarea
                className='custom-text-area'
                onChange={onChange}
                value={text}
            />
        </div>
    </div>
}
export default BulkTextEditor;

function urlPanelDecode(data) {
    let text = ''
    for (const { isEnabled, hostName } of data) {
        if (!isEnabled) {
            text = text.concat('//')
        }
        text = text.concat(`${hostName}\n`)
    }
    return text
}


function findAndReplaceDecode(data) {
    let text = ''
    for (const { isEnabled, find = '', replace = '' } of data) {
        if (!isEnabled) {
            text = text.concat('//')
        }
        text = text.concat(`${find}:${replace}\n`)
    }
    return text
}

function urlPanelEncode(text) {
    const parsedData = []
    const lines = text.split('\n')
    for (let line of lines) {
        line = line.trim()
        if (line.length === 0) {
            continue
        }
        const id = crypto.randomUUID()
        const isCommented = line.startsWith('//')
        let hostName = line
        if (isCommented) {
            hostName = line.substring(2).trim()
        }
        parsedData.push({ id, isEnabled: !isCommented, hostName })
    }
    return parsedData
}

function findAndReplaceEncode(text) {
    const parsedData = []
    const lines = text.split('\n')
    for (let line of lines) {
        line = line.trim()
        if (line.length === 0) {
            continue
        }
        const id = crypto.randomUUID()
        const isCommented = line.startsWith('//')
        let [find, replace] = line.split(':')
        if (isCommented) {
            find = find.substring(2).trim()
        }
        replace = replace.trim()
        parsedData.push({ id, isEnabled: !isCommented, find, replace })
    }
    return parsedData

}