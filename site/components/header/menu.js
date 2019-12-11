import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { PAGES } from './pages';
import store from 'root/site/store';
import './styles.scss';

export default class Example extends React.Component {
	showSettings(event) {
		event.preventDefault();

	}

	render() {
		return (
			<Menu id={"sidebar"} className={"my-menu"} right >
				<a id="home" className="menu-item" href="/about">О компании</a>
				<a id="about" className="menu-item" href="/shareholders">Акционерам</a>
				<a id="contact" className="menu-item" href="/purchases">Закупки</a>
				<a id="contact" className="menu-item" href="/information">Раскрытие информации</a>
				<a id="contact" className="menu-item" href="/clients">Клиенты</a>
				<a id="contact" className="menu-item" href="/gallery">Фотогалерея</a>
				<a id="contact" className="menu-item" href="/news">Новости</a>
				<a id="contact" className="menu-item" href="/contacts">Контакты</a>
				<a onClick={this.showSettings} className="menu-item--small" href="">Клиенты</a>
			</Menu >
		);
	}
}
