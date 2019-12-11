import React from 'react';
import { Link } from 'react-router-dom';
import logo from './img/logo.png';
import logorus from './img/logo-rus.png';
import logomin from './img/logo-min.png';
import logoya from './img/ya-logo.png';
import { PAGES } from './pages';
import store from 'root/site/store';
import './styles.scss';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export default class Navbar extends React.Component {
	@observable showSubmenu;
	componentDidMount() {
		store.ui.setPage(store.route.path);
	}

	render() {
		const renderMenuItems = () => {
			return PAGES.map(page => {
				return (
					<li key={`top-menu-${page.link}`} className={`navbar-item ${store.ui.page === page.link ? 'active' : ''}`}>
						{page.submenu ? (
							<>
								<div
									className="navbar-link"
									style={{ cursor: 'pointer' }}
									onMouseEnter={() => store.ui.setSubmenu(page.name)}
									onMouseLeave={() => store.ui.setSubmenu('')}
								>
									{page.name}
									{store.ui.showSubmenu === page.name && (
										<ul>
											{page.submenu.map(subitem => {
												return (
													<li key={`submenu-${subitem.name}`}>
														<Link
															className="navbar-link"
															to={subitem.link}
															onClick={() => store.ui.setPage(subitem.link)}
														>
															{subitem.name}
														</Link>
													</li>
												);
											})}
										</ul>
									)}
								</div>
							</>
						) : (
							<Link className="navbar-link" to={page.link} onClick={() => store.ui.setPage(page.link)}>
								{page.name}
							</Link>
						)}
					</li>
				);
			});
		};

		return (
			<nav className="top-navbar navbar-expand-lg ">
				<div className="container">
					<div className="logotip">
						
						<div className="logo1">
							<Link className="navbar-link" to="/" onClick={() => store.ui.setPage('/')}>
								<img className="mainlogo" src={logorus} />
							</Link>
						</div>
						<div className="logo">
							<Link className="navbar-link" to="/" onClick={() => store.ui.setPage('/')}>
								<h4  className="mainlogo mainlogo__name">Сахаэнерго</h4>
							</Link>
						</div>
						
					</div>
					<ul className="navbar-nav">{renderMenuItems()}</ul>
				</div>
			</nav>
		);
	}
}
