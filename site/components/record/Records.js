import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import store from 'root/site/store';

import { HtmlValue, jsonToHTML } from '@smartplatform/ui';

import { Loader } from '@smartplatform/ui';

import { Attachments } from '../attachments';
import './styles.scss';

@withRouter
@observer
export default class Record extends React.Component {
	@observable records;
	@observable noRecords;

	async componentDidMount() {
		// const { id } = this.props.match.params;
		const { page, categoryId } = this.props;

		const records = await store.model.CategoryRecord.find({
			where: {
				[`${page}Id`]: categoryId,
			},
		});

		if (records.totalCount > 0) {
			this.getRecordsData(records);
		} else {
			this.noRecords = true;
		}
	}

	getRecordsData = async records => {
		const recordsData = [];
		for (const record of records) {
			let { content, name, id, title, createdAt } = record;
			createdAt = moment(createdAt).format('DD.MM.YYYY');
			let files;
			let attachments;
			content = jsonToHTML(content);
			files = await store.model.CategoryRecordFile.find({
				where: { categoryRecordId: id },
				include: [{ relation: 'attachments' }],
			});

			if (files.totalCount > 0) {
				files = files[0];
				attachments = files.attachments();
			}

			recordsData.push({ id, content, name, attachments, title, createdAt });
		}
		this.records = recordsData;
	};

	render() {
		// return <Loader />;
		const { title } = this.props;
		if (this.noRecords) {
			return (
				<div>
					<h2 className="ClassNameSection client">{title}</h2>
					<div>Записей не найдено</div>
				</div>
			);
		}
		if (!this.records) {
			return <Loader />;
		}

		const records = this.records.map(record => {
			const { title, content, attachments, createdAt, id } = record;
			return (
				<div key={`record-${id}`}>
					<div className="BlockButtonList">
						{title && <h2> {title} </h2>}
						<p> {createdAt} </p>
						{content && (
							<div className="article-content__wrapper">
								<HtmlValue value={content} className="article-content" />
							</div>
						)}
						{attachments && <Attachments attachments={attachments} />}
					</div>
				</div>
			);
		});
		return (
			<div className="BlockButton">
				<h2 className="ClassNameSection client">{title}</h2>
				{records}
			</div>
		);
	}
}
