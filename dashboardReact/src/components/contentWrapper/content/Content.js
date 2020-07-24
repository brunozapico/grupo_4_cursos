import React from 'react';
import Topbar from './topBar/TopBar';
import BeginPageContent from './beginPageContent/BeginPageContent';

function Content(){
    return(
			<div id="content">
                <Topbar />
                <BeginPageContent />
			</div>
    )
}

export default Content;