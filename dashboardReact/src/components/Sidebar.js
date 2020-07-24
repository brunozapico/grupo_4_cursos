import React from 'react';
import ActionItem from './ActionItem';

function Sidebar() {
	let items = [{
		icon: "fas fa-fw fa-folder",
		title: "Pages"
	},
	{
		icon: "fas fa-fw fa-chart-area",
		title: "Charts"
	},
	{
		icon: "fas fa-fw fa-table",
		title: "Tables"
	},]
	return (
		<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
			<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
				<div className="sidebar-brand-icon">
					<i className="fas fa-chart-line"></i>
				</div>
				<div className="sidebar-brand-text mx-3">Admin</div>
			</a>
			<hr className="sidebar-divider my-0" />
			<li className="nav-item active">
				<a className="nav-link" href="/">
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