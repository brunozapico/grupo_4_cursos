import React from 'react';
import MainCard from './MainCard';

class ContentRow1 extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
        componentDidMount(){
            fetch('http://localhost:3000/api/products')
                .then(response => response.json())
                .then(data => this.setState({
                   data: data.data
                }))
                

        }
    
    render() {
        return (
            <div className="row">
                {this.state.data.map((data, i) => {
                    return <MainCard key={i} title={data.name} quantity={data.price} icon={data.category.icon} color={'red'} />
                })}
            </div>
        )
    }

}

export default ContentRow1;