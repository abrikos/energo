import React from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import '@smartplatform/ui/src/styles/vars.scss';
import { Admin } from '@smartplatform/admin';
import { DragDropContext } from '@smartplatform/ui';

import * as Client from './components';
import { MENU } from './config';
import store from './store';

import logoImg from './img/logo.png';

import './styles/main.scss';
import 'bootstrap-css-only/css/bootstrap.min.css';

@observer
class App extends React.Component {
	render() {
		const logo = ({ production, version, build }) => (
			<div className="logo">
				<a href={'/'} target="_blank" className="logo__link">
					<img src={logoImg} />
					<span className="logo__text">
						<p>
							СахаЭнерго <sup>{production ? '' : 'beta'}</sup>
						</p>
						<p>
							{version} ({build})
						</p>
					</span>
				</a>
			</div>
		);

		return (
			<DragDropContext>
				<Admin
					store={store.model}
					logo={logo}
					rootPath="/admin"
					key={store.model.isAuthorized ? 'authorized' : 'login'}
					history={store.history}
					dashboard={Client.Dashboard}
					menuItems={MENU}
				>
					<Route exact path="/admin/branches/:id/" component={Client.BranchEdit} />
					<Route exact path="/admin/branches" component={Client.BranchList} />

					<Route exact path="/admin/directions/:id/" component={Client.DirectionEdit} />
					<Route exact path="/admin/direction" component={Client.DirectionList} />

					<Route exact path="/admin/veterans/:id/" component={Client.VeteranEdit} />
					<Route exact path="/admin/veteran" component={Client.VeteranList} />

					<Route exact path="/admin/partners/:id/" component={Client.PartnerEdit} />
					<Route exact path="/admin/partners" component={Client.PartnerList} />

					<Route exact path="/admin/mainsliders/:id/" component={Client.MainSliderEdit} />
					<Route exact path="/admin/mainsliders" component={Client.MainSliderList} />

					<Route exact path="/admin/articles/:id/" component={Client.ArticleEdit} />
					<Route exact path="/admin/articles" component={Client.ArticleList} />

					<Route exact path="/admin/councils/:id/" component={Client.CouncilEdit} />
					<Route exact path="/admin/council" component={Client.CouncilList} />

					<Route path="/admin/shareholder/:id" component={Client.Shareholder} />
					<Route exact path="/admin/shareholders/:id/" component={Client.ShareholderEdit} />
					<Route exact path="/admin/shareholders/" component={Client.ShareholderList} />

					<Route path="/admin/connection_tabs/:id" component={Client.Connection} />
					<Route exact path="/admin/connections/:id/" component={Client.ConnectionEdit} />
					<Route exact path="/admin/connections/" component={Client.ConnectionList} />

					<Route path="/admin/tariff_tabs/:id" component={Client.Tariff} />
					<Route exact path="/admin/tariffs/:id/" component={Client.TariffEdit} />
					<Route exact path="/admin/tariffs/" component={Client.TariffList} />

					<Route path="/admin/tradeunion_tabs/:id" component={Client.TradeUnion} />
					<Route exact path="/admin/tradeunions/:id/" component={Client.TradeUnionEdit} />
					<Route exact path="/admin/tradeunions/" component={Client.TradeUnionList} />

					<Route path="/admin/other_tabs/:id" component={Client.Other} />
					<Route exact path="/admin/others/:id/" component={Client.OtherEdit} />
					<Route exact path="/admin/others/" component={Client.OtherList} />

					<Route path="/admin/information_tabs/:id" component={Client.Information} />
					<Route exact path="/admin/information/:id/" component={Client.InformationEdit} />
					<Route exact path="/admin/information/" component={Client.InformationList} />

					<Route path="/admin/realization_tabs/:id" component={Client.Realization} />
					<Route exact path="/admin/realizations/:id/" component={Client.RealizationEdit} />
					<Route exact path="/admin/realizations/" component={Client.RealizationList} />

					<Route path="/admin/purchase_tabs/:id" component={Client.Purchase} />
					<Route exact path="/admin/purchases/:id/" component={Client.PurchaseEdit} />
					<Route exact path="/admin/purchases/" component={Client.PurchaseList} />

					<Route exact path="/admin/galleries/:id/" component={Client.GalleryEdit} />
					<Route exact path="/admin/galleries/" component={Client.GalleryList} />

					<Route exact path="/admin/company-info/" component={Client.CompanyInfoEdit} />

					<Route exact path="/admin/vacancies/:id/" component={Client.VacancyEdit} />
					<Route exact path="/admin/vacancies/" component={Client.VacancyList} />

					<Route exact path="/admin/messages/" component={Client.MessageList} />
					<Route exact path="/admin/messages/:id" component={Client.MessageSingle} />

					<Route path="/admin/electricalsafety/:id" component={Client.ElectricalSafety} />
					<Route exact path="/admin/electricalsafeties/:id/" component={Client.ElectricalSafetyEdit} />
					<Route exact path="/admin/electricalsafeties/" component={Client.ElectricalSafetyList} />

					<Route exact path="/admin/metrics/" component={Client.Metrics} />

					<Route exact path="/admin/forCustomers/" component={Client.ForCustomers} />
					<Route exact path="/admin/about-company/" component={Client.AboutCompany} />
				</Admin>
			</DragDropContext>
		);
	}
}

export default App;
