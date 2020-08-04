import React from 'react';
import Content from './content/Content'
import Footer from './footer/Footer'

function ContentWrapper(){
    return(
        <div id="content-wrapper" className="d-flex flex-column">
            <Content />
            <Footer />
		</div>
    );
}

export default ContentWrapper;