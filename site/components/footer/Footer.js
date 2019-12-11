import React from 'react';
// import LogoFooter from './img/logo-footer.png';
import LogoFooter from './img/logo-f.png';
import nokor from './img/no-korr.png';
import dover from './img/dover.png';
import { YMInitializer } from 'react-yandex-metrika';
import './styles.scss';
import { Point, Phone, Email } from './icons';

import store from 'root/site/store';
import { Link } from 'react-router-dom';
import { PAGES } from './pages';
import SearchBar from './SearchBar';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
export default class Footer extends React.Component {
	@observable ymId;
	async componentDidMount() {
		const config = await store.model.SiteConfig.find();
		this.ymId = config[0] ? parseInt(config[0].ymId) : null;
		this.ymId && console.log('Yandex Metrika connected with id ', this.ymId);
	}

	render() {
		return (
			<div className="footer">
				<div className="container">
					<div className="row align-items-top">
						<div className="col-3">
						<p>Акционерное общество «СахаЭнерго» </p>
							<div className="Footerlogo">
								<a target="_blank" href="http://www.rushydro.ru">
								<img className="footimg" src={LogoFooter} />
								<h4>Русгидро</h4></a>
							</div>
							<div className="Footerlogo">
							<a target="_blank" href="https://www.yakutskenergo.ru/">
								<img className="footimg" src={LogoFooter} />
								<h4>Якутскэнерго</h4>
								</a>
							</div>
						</div>
						<div className="col-3">
							<div className="FooterIcon">
								
								<Point className="topbar-icon" />
								<p>677000, г. Якутск, пер. Энергетиков, 2 </p>
								<Phone className="topbar-icon" />
								<p>
									Телефон: <a href="tel:+74112210115"> (4112) 21-01-15</a>
								</p>
								<Email className="topbar-icon" />
								<p>
									Эл. почта: <a href="mailto:mail@sakhaenergo.ru"> mail@sakhaenergo.ru</a>
								</p>
							</div>
						</div>

						<div className="col-4">
							<div className="row menu">
								<div className="col-6">
									{PAGES.slice(0, 6).map(page => (
										<Link key={`footer-menu-${page.link}`} to={page.link} onClick={() => store.ui.setPage(page.link)}>
											{page.name}
										</Link>
									))}
								</div>

								<div className="col-6">
									{PAGES.slice(6, PAGES.length).map(page => (
										<Link key={`footer-menu-${page.link}`} to={page.link} onClick={() => store.ui.setPage(page.link)}>
											{page.name}
										</Link>
									))}
								</div>
							</div>
						</div>
						<div className="col-2">
							<div className="FooterLogo">
								<a href="/energetics">
									<img className="footimg" src={nokor} />
								</a>
								<a href="http://www.rushydro.ru/form/" target="_blank">
									<img className="footimg" src={dover} />
								</a>
							</div>
						</div>
					</div>
					<div className="row align-items-center bottom">
						<div className="col-8"> Хостинг и разработка сайта - Smart Unit</div>
						{this.ymId && <YMInitializer accounts={[this.ymId]} options={{ webvisor: true }} />}
						<div className="col-8">
							<a href="http://sakhaenergo.ru" target="_blank">
								Перейти на предыдущую версию сайта
							</a>
						</div>
						<div className="col-4">
							<div className="Search">{store.route.path !== '/search' && <SearchBar />}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
