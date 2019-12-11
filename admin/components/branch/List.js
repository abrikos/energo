import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/admin/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Table, Column, Loader, Button } from '@smartplatform/ui';

@observer
export default class BranchList extends React.Component {
	@observable records;

	async componentDidMount() {
		this.init();
	}

	init = async () => {
		const records = await store.model.Branch.find({ order: 'name ASC' });
		console.log(records);
		this.records = records;
	};
	deleteItem = async record => {
		console.log('delete recoed', record);
		await store.model.Branch.deleteById(record.id);
		this.init();
	};

	render() {
		if (!this.records) {
			return <Loader />;
		}
		return (
			<div>
				<div className="filters">
					<Button label="Добавить филиал" onClick={() => this.props.history.push('/admin/branches/new')} />
				</div>
				<Table records={this.records} rootPath="/admin">
					<Column property="name" label="Название филиала" />
					{/* <Column property="adress" label="Адресс" /> */}
					<Column property="head" label="Директор" />
					<Column onClick={this.deleteItem}>
						<Button
							style={{ padding: 0, width: '2rem' }}
							type="button"
							className="btn btn-danger"
							icon={<FontAwesomeIcon icon={faTrashAlt} />}
						/>
					</Column>
				</Table>
			</div>
		);
	}
}
