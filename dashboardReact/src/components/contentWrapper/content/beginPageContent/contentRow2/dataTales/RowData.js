import React from 'react';

function RowData(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.description}</td>
            <td>{props.category}</td>
            <td>
                <ul className = "list-group list-group-flush">
                {props.professor.map((value, i) => {
                    return  <li className = "list-group-item" key={i + value}>{value}</li>
                })}
                </ul>
            </td>
            <td>
                <ul className = "list-group list-group-flush">
                {props.dates.map((value, i) => {
                    return  <li className = "list-group-item" key={i + value}>{value}</li>
                })}
                </ul>
            </td>
            <td>{props.price}</td>
            <td>{props.vacancies}</td>
        </tr>
    )
};

export default RowData;