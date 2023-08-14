import React, { useState } from 'react';
import UrlPanel from './url-panel';
import FindAndReplace from './find-replace-panel';
import { Divider } from '@mui/material';


function MainScreen(props) {
    const [websites, setWebsites] = useState([])
    const [findAndReplace, setFindAndReplace] = useState([])

    return (
        <>
            <div className='main-screen'>
                <UrlPanel websites={websites} setWebsites={setWebsites} />
                <Divider className='divider' orientation="vertical" flexItem />
                <FindAndReplace />
            </div>

        </>
    );
}

export default MainScreen;