const moment = require('moment');

module.exports = function(Message) {
	Message.prototype.sendMessage = async function() {
		const emailContent = `
		<div>
			<p><u>Пользователь:</u> <b> ${this.user} </b>	оставил следующиее сообщение</p>
			<p><u>Контактный телефона</u>: <b> ${this.phone}</b> 
			<p>${this.text}</p>
			<p> <u>Дата сообщения:</u> ${moment(this.createdAt).format('LL HH:mm')} </p>
		</div>
		`;

		const rms = await Message.app.models.RoleMapping.findOne({
			where: {
				principalType: 'USER',
			},
		});

		const admin = await Message.app.models.User.findById(rms.id);

		Message.app.models.Email.send(
			{
				to: admin.email,
				from: 'office@smartunit.pro',
				subject: 'Оповещение от сайта sakhaenergo',
				html: emailContent,
			},
			function(err, mail) {
				console.log('email sent!', mail);
				console.log(err);
			}
		);
	};

	Message.observe('after save', (context, next) => {
		context.instance && context.instance.sendMessage();
		next();
	});
};
