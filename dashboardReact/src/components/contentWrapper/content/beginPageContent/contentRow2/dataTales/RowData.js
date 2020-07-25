import React from 'react';

function RowData(props) {
console.log(props);
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.description}</td>
            <td>{props.category}</td>
            <td>
                <ul>
                {props.professor.map((value, i) => {
                    return  <li key={i + value}>{value}</li>
                })}
                </ul>
            </td>
            <td>
                <ul>
                {props.dates.map((value, i) => {
                    return  <li key={i + value}>{value}</li>
                })}
                </ul>
            </td>
            <td>{props.price}</td>
            <td>{props.vacancies}</td>
        </tr>
    )
};

export default RowData;