import React from 'react';

function Category(props) {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-info text-white shadow">
                <div className="card-body">
                    {props.title}
                    {props.courses}
                </div>
                <div>
                    <i className={props.icon}></i>
                </div>
            </div>
        </div>
    );
}

export default Category;