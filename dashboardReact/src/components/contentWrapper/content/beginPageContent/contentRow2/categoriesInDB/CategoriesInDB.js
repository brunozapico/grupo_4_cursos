import React, {Component} from 'react';
import Category from './category/Category';



class CategoriesInDB extends Component{
    constructor(){
        super()
            this.state = {
                categories : []
            }
    }

     componentDidMount(){
         fetch('http://localhost:3000/api/categories')
         .then(res => res.json())
         .then(categories => this.setState({categories:categories}))
     }

    render(){
        return(

            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {this.state.categories.map((category, i) => { return <Category key={i} title={category.title} icon={category.icon} /> })}
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default CategoriesInDB;