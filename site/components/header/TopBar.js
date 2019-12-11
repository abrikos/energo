import React from 'react';

import { observer } from 'mobx-react';

import { Button } from '@smartplatform/ui';


import { Fax, Phone, Email } from './icons';

import './styles.scss';

@observer
export default class TopBar extends React.Component {
	
	render() {
		return (
			<div className="topbar">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-8 TopbarIcon ">
							<div className="icon__item">
								<Phone className="topbar-icon" />{' '}<a href="tel:+74112210115">Телефон: (4112) 21-01-15</a>
							</div>
							<div className="icon__item">
								<Fax className="topbar-icon" /> <a href="#">Факс: (4112) 49-72-49</a>
							</div>
							<div className="icon__item">
							<Email className="topbar-icon" />{' '}<a href="mailto:mail@sakhaenergo.ru">Эл. почта: mail@sakhaenergo.ru</a>
							</div>
						</div>
						<div className="col-4 align-self-center">
						<a href="http://tp.sakhaenergo.ru/" target="_blank">	<Button
								type="button"
								className="float-right btn-outline-light"
								label="Оставить заявку техприсоединения"
								
							/></a>
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}
