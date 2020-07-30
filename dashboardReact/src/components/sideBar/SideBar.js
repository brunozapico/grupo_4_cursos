import React from 'react';
import ActionItem from './ActionItem';
import './sidebar.css'

function Sidebar() {
	let items = [{
		icon: "fas fa-fw fa-folder",
		title: "Categorias",
		href: "#categories"
	},
	{
		icon: "fas fa-fw fa-chart-area",
		title: "Último producto",
		href: "#last-product"
	},
	{
		icon: "fas fa-fw fa-table",
		title: "Productos",
		href: "#all-products"
	},]
	return (
		<ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">
			<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
				<div className="sidebar-brand-icon">
					<i className="fas fa-chart-line"></i>
				</div>
				<div className="sidebar-brand-text mx-3">Admin.</div>
			</a>
			<hr className="sidebar-divider my-0" />
			<li className="nav-item active">
				<a className="nav-link" href="#dashboard">
					<i className="fas fa-fw fa-tachometer-alt"></i>
					<span>Dashboard</span></a>
			</li>
			<hr className="sidebar-divider" />
			<div className="sidebar-heading">Actions</div>
			{items.map((item, i) => {
				return <ActionItem key= {i} item={item} />
			})}
			
			<hr className="sidebar-divider d-none d-md-block" />
		</ul>
	);
}

export default Sidebar;