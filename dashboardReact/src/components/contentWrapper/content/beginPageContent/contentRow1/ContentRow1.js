import React from 'react';
import MainCard from './mainCard/MainCard';

class ContentRow1 extends React.Component {
    constructor() {
        super();

        this.state = {
            products: [],
            users: [],
            amount_products: 0,
            amount_total_price: 0,
            amount_total_users: 0
        };
    };

    componentDidMount(){
        fetch('http://localhost:3000/api/users')
			.then(res => res.json())
			.then(users => this.setState({users: users.users, amount_total_users: users.meta.count}))
			.catch(err => console.log(err));

        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(products => {
                this.setState({products: products.data,amount_products: products.meta.total});
                return products.data;
            })
            .then(products => products.map(product => {
                this.setState({amount_total_price: this.state.amount_total_price + product.price})
            }))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="row">
                <MainCard color="primary" title="Products in Data Base" quantity={this.state.amount_products} icon="fa-clipboard-list"/>
                <MainCard color="success" title="Amount in products" quantity={`$${(this.state.amount_total_price).toFixed(2)}`} icon="fa-dollar-sign"/>
                <MainCard color="warning" title="Users quantity" quantity={this.state.amount_total_users} icon="fa-user-check"/>
            </div>
        );
    };
};

export default ContentRow1;