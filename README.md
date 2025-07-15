# Basera E-commerce 🛒

A modern, full-stack e-commerce application built with Next.js 15, React, and Redux. Basera E-commerce offers a scalable, performant platform for selling products online, complete with user authentication, product catalog, shopping cart, and order management.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Running Locally](#running-locally)
  * [Building for Production](#building-for-production)
* [Environment Variables](#environment-variables)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* **Next.js** 15 with App Router
* **React** components with Tailwind CSS styling
* **Redux Toolkit** for global state management
* **TypeScript** for type safety
* Modular **UI** components: Button, Dialog, Form, Label, Popover, Select
* Authentication and protected routes
* Product catalog with filters and search
* Shopping cart with dynamic updates
* Order placement and management
* Configurable constants in `constants/` folder
* Ready for SEO and performance optimization

---

## Tech Stack

* **Framework:** Next.js 15
* **Language:** TypeScript
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS
* **Linting & Formatting:** ESLint, Prettier

---

## Project Structure

```
Basera-Ecommerce/
├─ .next/                     # Next.js build output
├─ app/                       # Next.js App Router pages
│  ├─ layout.tsx             # Global layout
│  ├─ page.tsx               # Home page
│  └─ globals.css            # Global styles
├─ components/                # Reusable React components
│  └─ ui/
│     ├─ button.tsx
│     ├─ dialog.tsx
│     ├─ form.tsx
│     ├─ label.tsx
│     ├─ popover.tsx
│     └─ select.tsx
├─ constants/                 # Application constants and configs
├─ lib/                       # Shared utilities and helpers
├─ public/                    # Static assets (images, icons)
├─ redux/                     # Redux store and slices
│  ├─ features/
│  ├─ hooks.ts                # Custom Redux hooks
│  ├─ provider.tsx            # Redux Provider wrapper
│  └─ store.ts                # Store configuration
├─ schema/                    # Zod validation schemas
├─ types/                     # TypeScript interfaces and types
├─ next.config.ts             # Next.js configuration
├─ postcss.config.mjs         # PostCSS configuration
├─ tsconfig.json              # TypeScript configuration
├─ package.json
└─ README.md                  # Project overview and instructions
```

---

## Getting Started

### Prerequisites

* **Node.js** (v18+)
* **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/basera-ecommerce.git
   cd basera-ecommerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

### Running Locally

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

1. **Build** the application:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Start** the production server:

   ```bash
   npm run start
   # or
   yarn start
   ```

---

## Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```dotenv
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXTAUTH_SECRET=your-secret-key
# Add any other environment variables here
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

Please ensure all linting and tests pass before submitting.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
"# ultra-beauty-next-js" 
