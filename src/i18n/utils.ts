// src/i18n/utils.ts
import { defaultLang, ui } from './ui';

export type Lang = keyof typeof ui;
export type TranslationKey = keyof typeof ui[typeof defaultLang];

export function getLangFromUrl(url: URL): Lang {
	const [, language] = url.pathname.split('/');
	return language === 'en' ? 'en' : defaultLang;
}

export function useTranslations(lang: Lang) {
	return (key: TranslationKey) => ui[lang][key] ?? ui[defaultLang][key];
}
