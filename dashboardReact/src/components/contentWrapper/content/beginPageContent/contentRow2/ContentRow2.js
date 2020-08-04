import React from 'react';
import LastProdInDB from './lastProdInDB/LastProdInDB';
import CategoriesInDB from './categoriesInDB/CategoriesInDB';
import DataTales from './dataTales/DataTales';

function ContentRow2() {
    return (
        <div className="row">
            <LastProdInDB />
            <CategoriesInDB />
            <div className="container">
                <div className="row">
            <h1 className="h3 mb-2 text-gray-800" id="all-products">Todos los productos</h1>
            <DataTales />

                </div>
            </div>
        </div>

    )
}

export default ContentRow2;