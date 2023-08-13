import React from 'react';
import UrlPanel from './url-panel';
import FindAndReplace from './find-replace-panel';
import { Divider } from '@mui/material';


function MainScreen(props) {
    return (
        <>
            <div className='main-screen'>
                <UrlPanel />
                <Divider className='divider' orientation="vertical" flexItem />
                <FindAndReplace />
            </div>
            
        </>
    );
}

export default MainScreen;