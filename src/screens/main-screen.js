import React from 'react';
import UrlPanel from './url-panel';
import FindAndReplace from './find-replace-panel';


function MainScreen(props) {
    return (
        <div className='main-screen'>
            <UrlPanel />
            <FindAndReplace />

        </div>
    );
}

export default MainScreen;