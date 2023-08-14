import React, { useState } from 'react';
import { Divider, Tooltip } from '@mui/material';
import Panel from './components/panel';
import FindAndReplaceRow from './components/find-and-replace-panel-row'
import UrlPanelRow from './components/url-panel-row'


function MainScreen(props) {
    const [websites, setWebsites] = useState([])
    const [findAndReplace, setFindAndReplace] = useState([])


    const urlPanelProps = {
        widthClass: 'thirty-percent-width',
        headerClass: 'url-panel-header',
        titleComponent: <Tooltip title={<span>Add entries below to perform find & replace only on those websites</span>}>
            <div className='header-title'>  Websites</div>
        </Tooltip>,
        noDataComponent: <div className='no-data'>
            <p>No entries, Thats okay !!!</p>
            <p>Find & Replace will be applied on all websites. Click (+) below to add websites so that replace is performed only on them</p>
        </div>,
        newObject: { isEnabled: true, hostName: '' }

    }

    const findAndReplacePanelProps = {
        widthClass: 'hundred-percent-width',
        headerClass: 'find-replace-panel-header',
        titleComponent: <>
            <div className='header-title'> Find </div>
            <div className='header-title'> Replace </div>
        </>,
        noDataComponent: <div className='no-data'>
            <p>No entries present, Go ahead !!!</p>
            <p>Click (+) below to add some text</p>
        </div>,
        newObject: { isEnabled: true, find: '', replace: '' }

    }


    return (
        <>
            <div className='main-screen'>
                <Panel data={websites} setData={setWebsites} Row={UrlPanelRow} extraProps={urlPanelProps} />
                <Divider className='divider' orientation="vertical" flexItem />
                <Panel data={findAndReplace} setData={setFindAndReplace} Row={FindAndReplaceRow} extraProps={findAndReplacePanelProps} />
            </div>

        </>
    );
}

export default MainScreen;