import React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import store from 'root/admin/store';
import { Loader } from '@smartplatform/ui';

import './style.scss';

@withRouter
@observer
export default class MessageSingle extends React.Component {
	@observable id;
	@observable message;

	componentDidMount() {
		this.init();
	}

	@action init = async () => {
		const id = this.props.match.params.id;
		let message;

		if (!isNaN(id)) {
			message = await store.model.Message.findById(id);
		}

		this.message = message;
	};

	render() {
		if (!this.message) {
			return <Loader />;
		}

		const { createdAt, user, phone, text } = this.message;
		return (
			<div>
				<table className="table">
					<tbody>
						{user && (
							<tr>
								<th style={{ width: '30%' }} scope="row">
									ФИО поьзователь
								</th>
								<td>{user}</td>
							</tr>
						)}
						{phone && (
							<tr>
								<th scope="row">Контактный телефон</th>
								<td>{phone}</td>
							</tr>
						)}
						{text && (
							<tr>
								<th scope="row">Текс сообщения</th>
								<td>{text}</td>
							</tr>
						)}

						{createdAt && (
							<tr>
								<th scope="row">Дата подачи</th>
								<td>{moment(createdAt).format('LL')}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}
