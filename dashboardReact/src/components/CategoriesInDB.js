import React from 'react';
import Category from './Category';

function CategoriesInDB(){
    return(

        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        <Category number="1" />
                        <Category number="2" />
                        <Category number="3" />
                        <Category number="4" />
                        <Category number="5" />
                        <Category number="6" />
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default CategoriesInDB;