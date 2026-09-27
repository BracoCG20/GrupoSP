// src/i18n/utils.ts
import { defaultLang, ui } from './ui';

export type Lang = keyof typeof ui;
export type TranslationKey = keyof typeof ui[typeof defaultLang];

export const routes = {
	home: { es: '/', en: '/en' },
	about: { es: '/nosotros', en: '/en/about' },
	companies: { es: '/empresas', en: '/en/companies' },
	contact: { es: '/contacto', en: '/en/contact' },
} as const;

export type RouteKey = keyof typeof routes;

export function getRoutePath(route: RouteKey, lang: Lang): string {
	return routes[route][lang];
}

export function getAlternatePaths(pathname: string): { es: string; en: string } {
	const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
	const matchingRoute = Object.values(routes).find(
		({ es, en }) => es === normalizedPath || en === normalizedPath,
	);

	if (matchingRoute) return matchingRoute;

	const spanishPath = normalizedPath.replace(/^\/en(?=\/|$)/, '') || '/';
	return { es: spanishPath, en: `/en${spanishPath === '/' ? '' : spanishPath}` };
}

export function getLangFromUrl(url: URL): Lang {
	const [, language] = url.pathname.split('/');
	return language === 'en' ? 'en' : defaultLang;
}

export function useTranslations(lang: Lang) {
	return (key: TranslationKey) => ui[lang][key] ?? ui[defaultLang][key];
}
