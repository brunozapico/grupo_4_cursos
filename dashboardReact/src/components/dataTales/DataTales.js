import React from 'react';
import ColNames from './ColNames';
import RowData   from './RowData';
import staff from '../../staff.json'



function DataTales() {
    
    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <ColNames />
                            
                        </thead>
                        <tfoot>
                            <ColNames />
                        </tfoot>
                        <tbody>
                            {staff.map((person, i) => {
                                return <RowData key={i} name= {person.name} price={person.price} description = {person.description}
                                categories= {person.categories}
                                colors= {person.colors} stock = {person.stock}/>
                            })}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default DataTales;