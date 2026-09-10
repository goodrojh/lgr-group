# Сайт ЛГР — аутсорсинг линейного персонала

Next.js 16 (App Router) + Tailwind CSS 4 + framer-motion + lucide-react. Статический экспорт (`output: "export"`), деплой на GitHub Pages через GitHub Actions.

## Запуск

```bash
npm install
npm run dev
```

Сборка статики в `out/`:

```bash
npm run build
```

## Структура

- `app/` — страницы: главная, `/services/`, `/price/`, `/company/`, `/contacts/`, `/russia/spb-lo/`, отрасли `/[industry]/`, профессии `/[industry]/[profession]/`, юридические страницы.
- `components/` — секции в стиле Kelo: Hero + Dashboard, Scenarios, Industries, Features, SavingsCalculator, Metrics, Process, Pricing, Testimonials, Risks, FAQ, LeadForm, Footer.
- `lib/site.ts` — контакты и реквизиты; `lib/data.ts` — весь контент; `lib/professions.ts` — 33 профессии; `lib/legal.ts` — юридические тексты.
- `public/images/` — фото с текущего сайта (временные; заменяются на сгенерированные), `public/images/letters/` — сканы благодарственных писем.

## Настройки

- `NEXT_PUBLIC_BASE_PATH` — базовый путь при публикации в подкаталог (GitHub Pages: `/lgr-group`). На своём домене не задаётся.
- `NEXT_PUBLIC_FORM_ENDPOINT` — URL приёма заявок (например, Formspree/Telegram-бот через webhook). Если не задан, форма открывает письмо на info@lgr-group.ru с заполненными полями.

## Видео в hero

В `components/Hero.tsx` фон — `<img>`; для видео (Kling) замените его на `<video autoPlay muted loop playsInline>` с файлом в `public/`.
