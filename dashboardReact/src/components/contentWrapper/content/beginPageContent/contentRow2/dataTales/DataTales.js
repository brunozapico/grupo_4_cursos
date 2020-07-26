import React from 'react';
import ColNames from './ColNames';
import RowData from './RowData';

export default class DataTales extends React.Component {
    constructor() {
        super();
        this.state = {
            courses: [],
            total: '',
            first_page: '',
            next_page: '',
            prev_page: ''
        };
    };

    apiCall(url, action) {
        fetch(url)
            .then(response => response.json())
            .then(action)
    };

    goFirstPage() {
        this.apiCall('http://localhost:3000/api/products', data => {
            let { first_page, next_page, prev_page } = data.pagination;
            this.setState({
                courses: data.data,
                first_page,
                next_page,
                prev_page,
                total: data.meta.total
            })
        });
    };

    goNextPage() {
        this.apiCall(this.state.next_page, data => {
            let { next_page, prev_page } = data.pagination;
            this.setState({
                courses: data.data,
                next_page,
                prev_page,
            });
        });
    };
    
    goPrevPage() {
        this.apiCall(this.state.prev_page, data => {
            let { next_page, prev_page } = data.pagination;
            this.setState({
                courses: data.data,
                next_page,
                prev_page,
            })
        });
    }
    
    componentDidMount() {
        this.goFirstPage();
    };

    render() {
        let rowData = this.state.courses.map((course, i) => {
            return <RowData key={i + course.name} name={course.name} price={course.price} description={course.description_short}
            professor={[course.professor.first_name, course.professor.last_name, course.professor.profession]}
            category={course.category.title} dates={[course.starts_date, course.ends_date]} vacancies={course.vacancies} />
        })
        let totalCourses = this.state.total,

        firstPage = <button className="btn shadow bg-white border-left-primary" onClick={() => this.goFirstPage()} >First Page</button>,

        prevButton;
        this.state.prev_page != null ? prevButton = <button className="btn shadow bg-white border-left-success" onClick={() => this.goPrevPage()}> Prev 10 courses </button>
        : prevButton = <button className="btn shadow bg-white border-left-success"> You are in the first page </button>

        let nextButton;
        this.state.next_page != null ? nextButton = <button className="btn shadow bg-white border-left-warning" onClick={() => this.goNextPage()}> Next 10 courses </button>
        : nextButton = <button className="btn shadow bg-white border-left-warning"> You are in te last page </button>

        return (
            <div>
                <div className="container">
                    <p>Total de Cursos: {` ${totalCourses}`}</p>
                    <div className="row">
                        <div className="col mb-3">
                            {firstPage}
                        </div>
                        <div className="col mb-3">
                            {prevButton}
                        </div>
                        <div className="col mb-3">
                            {nextButton}
                        </div>
                    </div>
                </div>
                <div className="card sha1dow mb-4">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%">
                                <thead>
                                    <ColNames />
                                </thead>
                                <tfoot>
                                    <ColNames />
                                </tfoot>
                                <tbody>
                                    {rowData}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col mb-3">
                            {firstPage}
                        </div>
                        <div className="col mb-3">
                            {prevButton}
                        </div>
                        <div className="col mb-3">
                            {nextButton}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
};
