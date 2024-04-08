import { EPAGE_TYPE, EPATH } from '../../../models/models';
import { ISignPageConfig, TSignPageType } from '../models/models';

export const SIGN_PAGE_CONFIG: Record<TSignPageType, ISignPageConfig> = {
	[EPAGE_TYPE.SIGNIN]: {
		title: 'Добро пожаловать!',
		linkTo: EPATH.SIGN_UP,
		textLink: 'Ещё не зарегистированы?',
	},
	[EPAGE_TYPE.SIGNUP]: {
		title: 'Регистрация',
		linkTo: EPATH.SIGN_IN,
		textLink: 'Уже зарегистрированы?',
	},
};
