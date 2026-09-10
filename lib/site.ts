// Базовые данные компании — взяты с lgr-group.ru
export const site = {
  name: "ЛГР",
  legalName: "ООО «ЛГР-ГРУПП»",
  tagline: "Аутсорсинг рабочего и складского персонала в Санкт-Петербурге и Ленинградской области",
  domain: "lgr-group.ru",
  phone: "+7 (986) 330-17-20",
  phoneHref: "tel:+79863301720",
  email: "info@lgr-group.ru",
  address: "Санкт-Петербург, пр. Обуховской Обороны, дом 7, литера С",
  legalAddress: "190020, г. Санкт-Петербург, проспект Обуховской Обороны, д. 7, литера С, помещ. 9-Н",
  ogrn: "1097847205708",
  inn: "7840416293",
  kpp: "781101001",
  foundedYear: 2009, // по ОГРН 109… — регистрация в 2009 году
  region: "Санкт-Петербург и Ленинградская область",
};

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Фоновое фото (временные стоковые, public/images/stock). */
export function bg(name: string) {
  return asset(`/images/stock/${name}.jpg`);
}

/** Путь к статике с учётом basePath (GitHub Pages). */
export function asset(path: string) {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export const nav = [
  { label: "Услуги", href: "/services/" },
  { label: "Цены", href: "/price/" },
  { label: "О компании", href: "/company/" },
  { label: "Контакты", href: "/contacts/" },
];
