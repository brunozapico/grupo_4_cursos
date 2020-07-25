import React from 'react';
import ColNames from './ColNames';
import RowData   from './RowData';
import staff from '../../../../../../staff.json';



class DataTales extends React.Component {
    constructor() {
        super();
        this.state = {
            courses: []
        };
    };

    componentDidMount() {
        fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => this.setState({courses: data.data}))
    }
    
    render() {
        console.log(this.state.courses);

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
                                {this.state.courses.map((course, i) => {
                                    return <RowData key={i + course.name} name= {course.name} price={course.price} description = {course.description_short} professor = {[course.professor.first_name, course.professor.last_name, course.professor.profession]}
                                    category= {course.category.title}
                                    dates= {[course.starts_date, course.ends_date]} vacancies = {course.vacancies}/>
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
};

export default DataTales;