import React from 'react';

function Category(props) {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-info text-white shadow">
                <div className="card-body font-weight-bold">
                    {props.title}
                    <div className="text-center">
                        <p>{props.courses} cursos existentes</p>                    
                    </div>
                </div>
                <div className="text-center">
                    <i className={props.icon}></i>
                </div>
            </div>
        </div>
    );
}

export default Category;