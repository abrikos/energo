import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import store from 'root/admin/store';
import { Form, Field, Loader } from '@smartplatform/ui';

@withRouter
@observer
export default class PurchaseEdit extends React.Component {
	@observable record;
	@observable id;

	constructor(props) {
		super(props);
		this.props = props;

		this.init();
	}

	init = async () => {
		const id = this.props.match.params.id;

		let record;
		if (!isNaN(id)) {
			record = await store.model.Purchase.findById(id);
			this.id = id;
		} else {
			record = new store.model.Purchase();
		}
		this.record = record;
		console.log('this record', this.record, this.imagePreview);
	};

	save = async record => {
		await record.save();
	};

	render() {
		if (!this.record) {
			return <Loader />;
		}
		const title = () => {
			if (this.id && this.record) {
				return <h1>Категория: {this.record.category}</h1>;
			} else {
				return <h1>Новая категория</h1>;
			}
		};

		return (
			<div>
				{title()}
				<Form record={this.record} onSave={this.save} rootPath="/admin">
					<Field property="category" label="Название категории" />
					<Field type="boolean" property="hide" label="Скрыть" />
				</Form>
			</div>
		);
	}
}
