import React from 'react';
import LastProdInDB from './LastProdInDB';
import CategoriesInDB from './CategoriesInDB';
import DataTales from './dataTales/DataTales';

function ContentRow2() {
    return (
        <div className="row">
            <LastProdInDB />
            <CategoriesInDB />
            <div className="container">
                <div className="row">
            <h1 class="h3 mb-2 text-gray-800">All the products in the Database</h1>
            <DataTales />

                </div>
            </div>
        </div>

    )
}

export default ContentRow2;