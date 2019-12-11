import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import EditorHelp from '../EditoHelp';

import store from 'root/admin/store';
import { Form, Field, Loader, SlateEditor, Input, Button, Row, Icon } from '@smartplatform/ui';

import './styles.scss';
@withRouter
@observer
export default class ForCustomers extends React.Component {
	@observable forCustomers;

	constructor(props) {
		super(props);
		this.props = props;

		this.init();
	}

	init = async () => {
		const forCustomers = await store.model.ForCustomers.find();
		if (forCustomers.totalCount === 0) {
			this.forCustomers = new store.model.ForCustomers();
			await this.forCustomers.save();
		} else {
			this.forCustomers = forCustomers[0];
		}
	};

	render() {
		if (!this.forCustomers) {
			return <Loader />;
		}
		const title = () => <h2> Потребителям </h2>;

		return (
			<div>
				{title()}
				<EditorHelp />

				<Form record={this.forCustomers} stay rootPath="/admin">
					<Field property="mainText" label="">
						<SlateEditor noImages />
					</Field>
				</Form>
			</div>
		);
	}
}
