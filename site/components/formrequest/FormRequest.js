import React from 'react';
import store from 'root/site/store';
import { Formik } from 'formik';

import './styles.scss';

const FormRequest = ({ main }) => {
	return (
		<Formik
			initialValues={{ user: '', phone: '', text: '', agree: false, sended: false }}
			onSubmit={(values, actions) => {
				const newMessage = new store.model.Message();
				Object.assign(newMessage, values);
				newMessage.save().then(() => {
					actions.setFieldValue('sended', true);
				});
			}}
			render={props => (
				<form onSubmit={props.handleSubmit}>
					<p className={main ? 'col-4' : 'col-6'}>
						<input
							placeholder="ФИО"
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values.user}
							name="user"
						/>
					</p>
					<p className={main ? 'col-4' : 'col-6'}>
						<input
							type="tel"
							placeholder="Телефон"
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values.phone}
							name="phone"
						/>
					</p>
					<p className={main ? 'col-4' : 'col-12'}>
						<input
							type="textarea"
							placeholder="Сообщение"
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values.text}
							name="text"
						/>
					</p>

					<p className={main ? 'col-8 check' : 'col-12'}>
						<input
							type="checkbox"
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values.agree}
							name="agree"
						/>
						Даю согласие на обработку
						<a
							href="https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85"
							target="_blank"
							rel="noopener noreferrer"
						>
							персональных данных
						</a>
						в соответствии Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»
					</p>
					<p className={main ? 'col-4 send' : 'col-12 contact1'}>
						{!props.values.sended && (
							<button type="submit" className="submit-button" disabled={!props.values.agree}>
								Отправить
							</button>
						)}
						{props.values.sended && <span>Сообщение отправлено</span>}
					</p>
				</form>
			)}
		/>
	);
};

export default FormRequest;
