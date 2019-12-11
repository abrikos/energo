import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter, Route } from 'react-router-dom';

import OtherCategory from './OtherCategory';
import OtherCategoryList from './OtherCategoryList';

import store from 'root/admin/store';
import { Loader, TabMenu, MenuItem } from '@smartplatform/ui';

@withRouter
@observer
export default class Other extends React.Component {
	@observable records;
	@observable tab;

	constructor(props) {
		super(props);
		this.props = props;

		this.init();
	}

	init = async () => {
		console.log(this.props);
		const records = await store.model.Other.find();
		this.records = records;

		const id = this.props.match.params.id;
		const tab = isNaN(id) ? this.records[0].id : id;
		this.switchTab({ id: tab });
		// this.tab = tab;
		// store.ui.setPage(tab);
	};

	componentDidUpdate(prevProp) {
		if (this.props.match.params.id !== prevProp.match.params.id) {
			const id = this.props.match.params.id;
			const tab = isNaN(id) ? this.records[0].id : id;
			this.switchTab({ id: tab });
		}
	}

	@action switchTab = record => {
		this.tab = record.id;
		this.props.history.push(`/admin/other_tabs/${record.id}/list`);
		store.ui.setPage(record.id);
	};

	render() {
		if (!this.records) {
			return <Loader />;
		}

		return (
			<div>
				{/* {title()} */}
				<TabMenu>
					{this.records.map(record => (
						<MenuItem
							key={`category-${record.id}`}
							label={record.category}
							onClick={() => this.switchTab(record)}
							active={store.ui.page == record.id}
						/>
					))}
				</TabMenu>

				{this.records.map(record => (
					<React.Fragment key={`route-${record.id}`}>
						<Route
							exact
							path={`/admin/other_tabs/${record.id}/list`}
							component={() => <OtherCategoryList category={record} />}
						/>
						<Route
							path={`/admin/other_tabs/${record.id}/edit/:id`}
							component={() => <OtherCategory category={record} />}
						/>
					</React.Fragment>
				))}
			</div>
		);
	}
}
