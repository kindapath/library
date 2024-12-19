Стартуем так:

1. Сначала добавляем в корень проекта .env файл с переменными для api и гугла

2. Затем стартуем докер:
   Билдится минут 5

```bash
docker build -t library-frontend-image .

docker run -d --name library-frontend -p 3000:3000 library-frontend-image
```

3. Если нужно создать тестовые книги на бекенде, то есть питоновский скрипт. Он отправляет на бэк который указан в .env переменной

```bash
python add-books.py
```

---

## стартуем в dev режиме

First, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Структура проекта:

src/
├── app/
│ └── page.tsx
├── components/
│ ├── common/ # Reusable components like buttons, inputs, etc.
│ │ ├── Button/
│ │ └── Input/
│ ├── features/ # Feature-specific components
│ │ ├── books/ # All book-related components
│ │ │ ├── BookCard/
│ │ │ │ ├── index.tsx
│ │ │ │ ├── BookCard.tsx
│ │ │ │ └── BookCard.types.ts
│ │ └── auth/ # Auth-related components (for future)
├── types/ # Global type definitions
├── services/ # API services and other external services
├── hooks/ # Custom hooks
├── utils/ # Utility functions
├── constants/ # Constants and configuration
└── styles/ # Global styles
