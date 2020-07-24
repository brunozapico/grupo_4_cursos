import React from 'react';

function ActionItem(props) {
    console.log(props);
    return (
        <li className="nav-item">
            <a className="nav-link collapsed" href="/">
                <i className={props.item.icon}></i>
                <span>{props.item.title}</span>
            </a>
        </li>
    )
};

export default ActionItem;