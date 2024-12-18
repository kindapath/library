## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

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
│ │ │ └── BookList/
│ │ │ ├── index.tsx
│ │ │ ├── BookList.tsx
│ │ │ └── BookList.types.ts
│ │ └── auth/ # Auth-related components (for future)
├── types/ # Global type definitions
├── services/ # API services and other external services
├── hooks/ # Custom hooks
├── utils/ # Utility functions
├── constants/ # Constants and configuration
└── styles/ # Global styles
