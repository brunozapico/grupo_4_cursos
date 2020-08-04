import React from 'react';
import PageHeading from './pageHeading/PageHeading';
import ContentRow1 from './contentRow1/ContentRow1';
import ContentRow2 from './contentRow2/ContentRow2';

function BeginPageContent() {
    let data = [{
        title:"PRODUCTS IN DATA BASE",
        quantity: '135',
        icon: "fas fa-clipboard-list fa-2x text-gray-300",
        color: "primary"
    },
    {
        title: "AMOUNT IN PRODUCTS",
        quantity: '546456',
        icon: "fas fa-dollar-sign fa-2x text-gray-300",
        color: "success"
    },
    {
        title: "USERS QUANTITY",
        quantity: '38',
        icon: "fas fa-user-check fa-2x text-gray-300",
        color: "warning"
    },
    ]
    return (
        <div className="container-fluid">
            <PageHeading />
            <ContentRow1 data={data} />
            <ContentRow2 />
        </div>
    )
}

export default BeginPageContent;