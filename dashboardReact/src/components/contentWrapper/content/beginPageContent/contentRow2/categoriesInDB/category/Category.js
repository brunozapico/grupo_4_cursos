import React from 'react';
import './category.css'

function Category(props) {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow categorias">
                <div className="card-body font-weight-bold">
                    {props.title} <i className={props.icon}></i>
                    <div className="text-center">
                        <p>{props.courses} cursos existentes</p>                    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;