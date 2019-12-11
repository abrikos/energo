import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import store from 'root/admin/store';
import moment from 'moment';
import { Table, Column, Loader, Button } from '@smartplatform/ui';

@observer
export default class MessagesList extends React.Component {
	@observable records;

	async componentDidMount() {
		const records = await store.model.Message.find({ order: 'createdAt DESC' });
		console.log(records);
		this.records = records;
	}

	createMessage = () => {
		const newMessage = new store.model.Message();

		newMessage.user = 'me me me';
		newMessage.text = 'Сообщение ';
		newMessage.phone = '+89423874923874';
		newMessage.save();
	};
	render() {
		if (!this.records) {
			return <Loader />;
		}

		return (
			<Table records={this.records} rootPath="/admin">
				<Column property="user" label="Пользователь" />
				<Column property="phone" label="Телефон" />
				<Column
					property="createtAt"
					label="Дата подачи"
					computed={record => moment(record.createdAt).format('LL')}
				/>

				{/* <Column property="status" label="Опубликовано" /> */}
			</Table>
		);
	}
}
