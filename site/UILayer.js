import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link, withRouter, Route, Switch } from 'react-router-dom';
import store from './store';

import * as Pages from './pages';

import t from '../i18n';

@withRouter
@observer
export default class UILayer extends React.Component {
	@observable error = null;

	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<>
				<Route path="/" exact component={Pages.MainPage} />
				<Route path="/contacts" component={Pages.ContactsPage} />
				<Route path="/about" component={Pages.AboutPage} />
				<Route path="/leadership" component={Pages.LeadershipPage} />
				<Route path="/branches" component={Pages.BranchesPage} />
				<Route path="/shareholders" component={Pages.ShareholdersPage} />
				<Route path="/purchases" component={Pages.PurchasesPage} />
				<Route path="/personel" component={Pages.PersonelPage} />
				<Route path="/information" component={Pages.InfonmationPage} />
				<Route path="/clients" component={Pages.ClientsPage} />
				<Route path="/gallery" component={Pages.GalleryPage} />
				<Route path="/news" component={Pages.NewsPage} />
				<Route path="/energetics" component={Pages.EnergeticsPage} />
				<Route path="/search" component={Pages.SearchPage} />
				<Route path="/electricalsafeties" component={Pages.ElectricalSafetiesPage} />
				<Route path="/realization" component={Pages.RealizationPage} />
				<Route path="/other" component={Pages.OtherPage} />
				<Route path="/tradeunion" component={Pages.TradeUnionPage} />
				<Route path="/connection" component={Pages.ConnectionPage} />
				<Route path="/tariff" component={Pages.TariffPage} />
				<Route path="/council" component={Pages.CouncilPage} />
				<Route path="/veterans" component={Pages.VeteransPage} />
			</>
		);
	}
}
