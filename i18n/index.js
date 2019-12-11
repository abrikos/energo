import i18next from 'i18next';

import en from './en';
import ru from './ru';

const namespace = 'translation';
!i18next.isInitialized && i18next.init ({lng: 'ru', resources: {}});
i18next.addResourceBundle ('ru', namespace, ru [namespace] || ru, true, true);
i18next.addResourceBundle ('en', namespace, en [namespace] || en, true, true);

export default function(key) {
	return i18next.t (key);
};
