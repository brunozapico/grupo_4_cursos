import React, { Component } from 'react';

class LastProdInDB extends Component{
    constructor(){
        super();

        this.state ={
            products: [],
            lastProduct : {}
        };
    };

    componentDidMount(){
    
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(products => {
                this.setState({products : products.meta.total_courses});
            })
            .then(() =>{
                this.setState({lastProduct: this.state.products[this.state.products.length-1]});
            })
            .catch(err => console.log(err));
    };

    render(){

        return(
            <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Last product in Data Dase</h6>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 25 + "rem" }} /* src={this.state.lastProduct.image} */ alt="last image" />
                            </div>
                            <p>{this.state.lastProduct.description_short}</p>
                            <a target="_blank" rel="nofollow" href="/">View product detail</a>
                        </div>
                    </div>
                </div>
        );
    }
}

export default LastProdInDB;