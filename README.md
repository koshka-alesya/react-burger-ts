# Проект Stellar Burger на TypeScript

Полноценный проект **Stellar Burger**, реализованный на **TypeScript**, с настроенным линтером, форматированием, алиасами и использованием компонентной библиотеки.

---

## Проверка кода и коммиты

Перед коммитом рекомендуется выполнять:

```bash
npm run check
```

### Отдельные команды

- **Lint**:

  ```bash
  npm run lint
  ```

  Проверка кода и автоматическое исправление ошибок.

- **Stylelint**:

  ```bash
  npm run stylelint:fix
  ```

  Проверка и исправление CSS.

- **Prettier**:

  ```bash
  npm run format
  ```

  Исправление форматирования кода.

### Коммиты

```bash
npm run commit
```

Гарантирует соответствие описаний коммитов [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

---

## Алиасы

В проекте настроены алиасы для удобного импорта модулей:

```ts
alias: {
  '@': path.resolve(__dirname, './src'),
  '@components': path.resolve(__dirname, './src/components'),
  '@services': path.resolve(__dirname, './src/utils'),
  '@pages': path.resolve(__dirname, './src/pages'),
  '@utils': path.resolve(__dirname, './src/utils'),
},
```

---

## Дизайн и компоненты

- Макет проекта в Figma: [ссылка](https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?node-id=0%3A1)
- Библиотека компонентов: [React Developer Burger UI Components](https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/)

---

## Публикация

Проект выложен на GitHub Pages и доступен по ссылке:

[https://koshka-alesya.github.io/react-burger-ts/](https://koshka-alesya.github.io/react-burger-ts/)
