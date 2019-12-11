import React from 'react';
// import FormRequest from '../../components/formrequest';

import * as Components from '../../components';

import './styles.scss';

export default class SubmitApplication extends React.Component {
	render() {
		return (
			<div className="ContainerSubmitApp">
				<div className="container ">
					<div className="row align-items-center">
						<div className="col ClassNameSection bgwhite"> Обратная связь </div>
					</div>
					<div className="row align-items-center">
						<Components.FormRequest main />
					</div>
				</div>
			</div>
		);
	}
}
