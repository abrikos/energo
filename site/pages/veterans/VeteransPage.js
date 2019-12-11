import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import store from 'root/site/store';

@observer
export default class VeteransPage extends React.Component {
	@observable records;

	componentDidMount() {
		this.init();
	}

	init = async () => {
		const records = await store.model.Veteran.find();

		this.records = records;
	};

	render() {
		console.log('got records', this.records);
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					<h4 className="ClassNameSection client"> Наши ветераны </h4>
					<div className="row justify-content-center direction">
						{this.records &&
							this.records.map(record => (
								<div key={`record-${record.id}`} className="direction__item">
									<p>
										<img className="photo" src={record.downloadFile('thumbnail')} />
									</p>
									<h5>{record.name}</h5>
								</div>
							))}
					</div>
				</div>
			</div>
		);
	}
}
