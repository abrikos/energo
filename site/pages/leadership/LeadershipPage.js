import React from 'react';
import './styles.scss';
import photo from './img/photo.jpg';
import store from 'root/site/store';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class LeadershipPage extends React.Component {
	@observable directions;

	componentDidMount() {
		this.init();
	}

	init = async () => {
		const directions = await store.model.Direction.find();

		this.directions = directions;
	};

	render() {
		console.log('got directions', this.directions);
		return (
			<div className="MainBackGroundClient">
				<div className="container">
					
					<h4 className="ClassNameSection client"> Руководство </h4>
					<div className="row justify-content-center direction">
						{this.directions &&
							this.directions.map(direction => (
								<div key={`direction-${direction.id}`} className="direction__item">
									
									<p>
										<img className="photo" src={direction.downloadFile('thumbnail')} />
									</p>
									<p>{direction.post}</p>
									<h5>{direction.name}</h5>
								</div>
							))}
					</div>
				</div>
			</div>
		);
	}
}
