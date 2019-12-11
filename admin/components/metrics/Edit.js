import React, { useEffect, useState } from 'react';
import store from 'root/admin/store';
import styled from 'styled-components';

import { Form, Field, Loader, Table, Column } from '@smartplatform/ui';

const YmInput = styled.div`
	display: flex;

	& input {
		width: 100%;
		margin-right: 1rem;
	}
`;

const YmDisplay = styled.p`
	cursor: text;
	height: 2rem;
	font-size: 1.5rem;
`;

const MetricsButton = styled.a`
	margin-top: 1rem;

	&:link,
	&:visited {
		text-decoration: none;
	}
`;

const Edit = () => {
	const [record, setRecord] = useState();
	const [ymId, setYmId] = useState('');
	const [edit, setEdit] = useState(false);

	const fetchData = async () => {
		const config = await store.model.SiteConfig.find();

		if (!config[0]) {
			setRecord(new store.model.SiteConfig());
		} else {
			setRecord(config[0]);
			setYmId(config[0].ymId);
		}
	};
	useEffect(() => {
		fetchData();
		console.log('==== use effect', record);
	}, []);

	if (!record) {
		return <Loader />;
	}

	console.log(record.ymId);
	return (
		<div>
			<div>
				<label>ID Яндкес метрики </label>
				{edit ? (
					<YmInput>
						<input value={ymId} className="ui-input text-input  false" onChange={e => setYmId(e.target.value)} />
						<button
							className="btn btn-lg btn-primary"
							type="button"
							onClick={() => {
								record.ymId = ymId;
								record.save();
								setEdit(false);
							}}
						>
							Сохранить
						</button>
					</YmInput>
				) : (
					<YmDisplay onClick={() => setEdit(true)}>{ymId}</YmDisplay>
				)}
			</div>

			{!edit && (
				<MetricsButton
					href={`https://metrika.yandex.ru/dashboard?id=${ymId}`}
					target="_blank"
					className="btn btn-lg btn-secondary"
				>
					Яндекс Метрика
				</MetricsButton>
			)}
		</div>
	);
};

export default Edit;
