export const MENU = [
	{
		type: 'submenu',
		id: 'site',
		label: 'Содержимое страниц',
		opened: true,
		icon: 'cog',
		items: [
			{
				type: 'link',
				record: {
					href: '/admin/articles',
					set: 'admin',
					// icon: '',
					label: 'Публикации',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/branches',
					set: 'admin',
					// icon: 'user',
					label: 'Филиалы',
				},
			},

			{
				type: 'link',
				record: {
					href: '/admin/vacancies',
					set: 'admin',
					// icon: '',
					label: 'Вакансии',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/council',
					set: 'admin',
					// icon: '',
					label: 'Молодежный совет',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/shareholder/:id/list',
					set: 'admin',
					// icon: 'user',
					label: 'Акционерам',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/information_tabs/:id/list',
					set: 'admin',
					// icon: 'user',
					label: 'Документы',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/electricalsafety/:id/list',
					set: 'admin',
					// icon: 'user',
					label: 'Техника безопасности',
				},
			},

			{
				type: 'link',
				record: {
					href: '/admin/tradeunion_tabs/:id/list',
					set: 'admin',
					// icon: 'user',
					label: 'Персоны',
				},
			},

			{
				type: 'link',
				record: {
					href: '/admin/realization_tabs/:id/list',
					set: 'admin',
					// icon: 'user',
					label: 'Реализация',
				},
			},

			{
				type: 'link',
				record: {
					href: '/admin/purchase_tabs/:id/list',
					set: 'admin',
					// icon: 'user',
					label: 'Закупки',
				},
			},

			// {
			// 	type: 'link',
			// 	record: {
			// 		href: '/admin/galleries',
			// 		set: 'admin',
			// 		// icon: '',
			// 		label: 'Фотогалереи',
			// 	},
			// },
			{
				type: 'link',
				record: {
					href: '/admin/tariff_tabs/:id/list',
					set: 'admin',
					// icon: 'user',
					label: 'Тарифы',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/connection_tabs/:id/list',
					set: 'admin',
					// icon: 'user',
					label: 'Технологическое присоединение',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/other_tabs/:id/list',
					set: 'admin',
					// icon: 'user',
					label: 'Прочее',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/direction',
					set: 'admin',
					// icon: 'user',
					label: 'Руководство',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/veteran',
					set: 'admin',
					// icon: 'user',
					label: 'Ветераны',
				},
			},
		],
	},
	{
		type: 'submenu',
		id: 'site',
		label: 'Разделы',
		opened: true,
		icon: 'cog',
		items: [
			{
				type: 'link',
				record: {
					href: '/admin/shareholders/',
					set: 'admin',
					// icon: '',
					label: 'Акционерам',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/information/',
					set: 'admin',
					// icon: '',
					label: 'Документы',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/electricalsafeties/',
					set: 'admin',
					// icon: '',
					label: 'Техника безопасности',
				},
			},

			{
				type: 'link',
				record: {
					href: '/admin/tradeunions/',
					set: 'admin',
					// icon: '',
					label: 'Персоны',
				},
			},

			{
				type: 'link',
				record: {
					href: '/admin/realizations/',
					set: 'admin',
					// icon: '',
					label: 'Реализации',
				},
			},

			{
				type: 'link',
				record: {
					href: '/admin/purchases/',
					set: 'admin',
					// icon: '',
					label: 'Закупки',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/tariffs/',
					set: 'admin',
					// icon: '',
					label: 'Тарифы',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/connections/',
					set: 'admin',
					// icon: '',
					label: 'Технологическое присоединение',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/others/',
					set: 'admin',
					// icon: '',
					label: 'Прочее',
				},
			},
		],
	},
	{
		type: 'submenu',
		id: 'site',
		label: 'Настройки сайта',
		opened: true,
		icon: 'cog',
		items: [
			{
				type: 'link',
				record: {
					href: '/admin/company-info/',
					set: 'admin',
					// icon: '',
					label: 'Компания в цифрах',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/about-company/',
					set: 'admin',
					// icon: '',
					label: 'О компании',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/forCustomers/',
					set: 'admin',
					// icon: '',
					label: 'Потребителям',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/metrics/',
					set: 'admin',
					// icon: '',
					label: 'Метрика',
				},
			},

			{
				type: 'link',
				record: {
					href: '/admin/partners',
					set: 'admin',
					// icon: '',
					label: 'Партнеры',
				},
			},
			{
				type: 'link',
				record: {
					href: '/admin/mainsliders',
					set: 'admin',
					// icon: '',
					label: 'Слайдер',
				},
			},
		],
	},
	{
		type: 'link',
		record: {
			href: '/admin/messages',
			set: 'admin',
			// icon: 'user',
			label: 'Сообщения',
		},
	},
];
