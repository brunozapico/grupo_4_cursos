import React from 'react';

function RowData(props) {
console.log(props);
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.description}</td>
            <td>{props.price}</td>
            <td>
                <ul>
                {props.categories.map((category, i) => {
                  return  <li key={i}>{category}</li>
                })}
                </ul>
            </td>
            <td>
                <ul>
            {props.colors.map((color, i) => <li key={i}><span className={`text-${color.className}`}>{color.color}</span></li>)}
                </ul>
            </td>
            <td>{props.stock}</td>
        </tr>
    )
};

export default RowData;