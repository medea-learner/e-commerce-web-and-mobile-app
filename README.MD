# React Native Mobile App

The mobile app leverages Expo and incorporates several modern libraries and best practices to ensure optimal performance, maintainability, and scalability. The app uses Axios for API calls, Zustand for global state management, React Query for caching and automatic retries, and Nativewind for styling.

## Table of Contents

- [Overview](#overview)
- [Architectural and Technical Decisions](#architectural-and-technical-decisions)
- [File Structure](#file-structure)
- [Setup & Configuration](#setup--configuration)
- [Development Process](#development-process)
- [Usage & Running the App](#usage--running-the-app)
- [Additional Information](#additional-information)

## Overview

The React Native Mobile App is designed to be fast, responsive, and maintainable. It communicates with an external API (in this case, [FakeStoreAPI](https://fakestoreapi.com)) using Axios. Global state management is handled by Zustand to easily manage user authentication state, and React Query ensures that API data is cached and revalidated automatically. Nativewind provides a simple, Tailwind CSS–like styling solution that improves development speed while ensuring a consistent design language.

## Architectural and Technical Decisions

- **Axios for API Calls:**  
  An instance of Axios is configured (in `lib/api.ts`) to automatically include authentication tokens (retrieved from Zustand’s user store) in the request headers.

- **Zustand for Global State Management:**  
  Zustand is used as the global state management tool to maintain user data and authentication status. The state is accessible from anywhere in the application (e.g., from `lib/api.ts`).

- **React Query for Data Caching:**  
  React Query is used to cache API responses and handle background re-fetching and retries in case of network issues, improving performance and responsiveness.

- **Nativewind for Styling:**  
  Nativewind is adopted to simplify styling within React Native by using Tailwind CSS classes, ensuring a smooth and efficient styling workflow.

- **Optimized Performance:**  
  The app implements performance optimizations such as memoized components, stable callbacks via `useCallback` and `useMemo`, and skeleton loaders during data fetching to enhance perceived performance on slower networks and devices.

## File Structure

Below is a snapshot of the mobile app’s file structure, which has been organized to separate screens, components, assets, and configuration files for clarity and scalability:

```
.
├── app
│   ├── _layout.tsx           // Global layout and navigation configurations
│   ├── +not-found.tsx        // 404 fallback screen
│   └── (tabs)                // Tab-based navigation structure
│       ├── dashboard.tsx     // Dashboard screen displaying product list and admin actions
│       ├── index.tsx         // Home screen with product listing, search filter, etc.
│       ├── _layout.tsx       // Layout for tab screens
│       ├── login.tsx         // Login screen
│       └── product           // Product-related screens
│           ├── add-or-edit.tsx // Screen for adding or editing a product
│           ├── [id].tsx      // Individual product details screen
│           └── _layout.tsx   // Layout for product screens
├── assets                    // Images, fonts, and icons for the app
│   ├── fonts
│   │   └── SpaceMono-Regular.ttf
│   └── images
│       ├── adaptive-icon.png
│       ├── favicon.png
│       ├── icon.png
│       └── splash-icon.png
├── components                // Reusable UI components
│   ├── LogoutButton.tsx
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   └── SearchFilter.tsx
├── context                   // Global context (user authentication)
│   └── UserContext.tsx
├── lib                       // Library utilities such as API configuration
│   └── api.ts
├── scripts                   // Utility scripts
│   └── reset-project.js
├── styles                    // Global styles
│   └── global.css
├── types                     // TypeScript type definitions
│   └── index.ts
├── app.json
├── babel.config.js
├── metro.config.js
├── nativewind-env.d.ts
├── package.json
├── package-lock.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Setup & Configuration

### Prerequisites

- **Node.js & npm:** Ensure that you have Node.js installed. We recommend version 14 or later.
- **Yarn (optional):** You may choose to use Yarn instead of npm.
- **Expo CLI:** Install Expo CLI globally if you haven’t already:
  ```bash
  npm install -g expo-cli
  ```

### Local Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/medea-learner/e-commerce-web-and-mobile-app.git
   cd e-commerce-web-and-mobile-app/mobile-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   Or, if you’re using Yarn:
   ```bash
   yarn install
   ```

3. **Configure Environment (if applicable):**  
   Verify the API base URL in `lib/api.ts`. Adjust it if required to connect to your backend or a testing API.

4. **Start the Expo Development Server:**
   ```bash
   expo start
   ```
   This command will launch the Expo development tools. You can then run the app on an emulator, simulator, or physical device.

## Development Process

- **Branching Strategy:**  
  Use Git branches for feature development. Merge changes to the main branch only after code reviews and testing.

- **Code Quality:**  
  - Use TypeScript for type safety.
  - Follow React Native best practices—performance optimizations include memoization and stable callbacks.
  - Write descriptive commit messages.

- **Testing:**  
  Test API calls, navigation flows, and UI components on Android platform. Make use of Expo’s fast refresh for iterative development.

- **Styling:**  
  We use Nativewind to manage styles via Tailwind CSS classes. Update styles directly in the components for faster development iterations.

## Usage & Running the App

After starting the Expo development server:
- **Run on Simulator or Emulator:**  
  Use Expo tools or run:
  ```bash
  expo run:android
  expo run:ios
  ```
- **Run on a Physical Device:**  
  Download the Expo Go app from the iOS App Store or Google Play Store. Scan the QR code displayed in your terminal or Expo Dev Tools to open your app.

## Additional Information

- **Global State:**  
  Zustand is used to manage user authentication details. Visit `context/UserContext.tsx` for more details.

- **API Integration:**  
  Axios is configured in `lib/api.ts` to include user tokens from the global state. Make sure to secure your API endpoints as needed.

- **Caching and Data Management:**  
  React Query handles API caching and retries. Refer to the documentation in the code comments within your screen components (e.g., `app/index.tsx`).

- **Styling & Theming:**  
  The styling conventions follow Nativewind’s Tailwind-inspired syntax. Modifications and customizations should be done in `tailwind.config.js`.

Got it! Here’s the updated **Next.js Web App documentation** with the middleware section described **without showing any code**, just a mention of its functionality:

---

# Next.js Web App

The web app is built using [Next.js 15](https://nextjs.org). It consumes data from [FakeStoreAPI](https://fakestoreapi.com) and includes authentication, product management, filtering, and responsive design.

---

## Table of Contents

- [Overview](#overview)  
- [Architectural and Technical Decisions](#architectural-and-technical-decisions)  
- [File Structure](#file-structure)  
- [Setup & Configuration](#setup--configuration)  
- [Development Process](#development-process)  
- [Middleware Functionality](#middleware-functionality)  
- [Usage & Running the App](#usage--running-the-app)  
- [Additional Information](#additional-information)  

---

## Overview

The app provides users with a clean UI to browse products, filter by category, search by keyword, and view detailed product information. Admin users have access to a dashboard to create, edit, or delete products.

Authentication is handled using FakeStoreAPI’s login system, and Axios is used for all API communications.

---

## Architectural and Technical Decisions

- **App Router (Next.js 15)** is used with layouts, dynamic routing, and route groups for modern structure and flexibility.

- **Axios** is used to handle API requests with a pre-configured instance.

- **Tailwind CSS** is used for fast and consistent styling.

- **UserContext** manages global authentication state and allows access to user info across the app.

- **Reusable Components**: Core components like `ProductCard` and `ProductForm` are shared across multiple screens with behavior adjusted by props and user roles.

---

## File Structure

```
.
├── app
│   ├── layout.tsx
│   ├── (tabs)
│   │   ├── index.tsx
│   │   ├── dashboard.tsx
│   │   └── product
│   │       ├── [id].tsx
│   │       └── _layout.tsx
├── components
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   ├── SearchFilter.tsx
│   ├── Navbar.tsx
├── context
│   └── UserContext.tsx
├── lib
│   └── api.ts
├── types
│   └── index.ts
├── middleware.ts
├── public
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Setup & Configuration

1. Clone the project and install dependencies:

```bash
git clone https://github.com/medea-learner/e-commerce-web-and-mobile-app.git
cd e-commerce-web-and-mobile-app/web-app
npm install
```

2. Run the development server:

```bash
npm run dev
```

---

## Development Process

- **Dashboard Admin Tools:** Admins can manage products from the dashboard with inline editing and deletion features.

- **Product Modals:** Product creation and updates are handled via modals that reuse the same form structure with conditionally loaded data.

- **Conditional Components:** `ProductCard` and others adapt their behavior based on the user's role via `UserContext`.

- **Tailwind Design System:** Utility classes are used consistently throughout the app for styling, responsiveness, and layout control.

---

## Middleware Functionality

The middleware is used to **protect specific routes** (`/dashboard`), ensuring that only authenticated users (typically admins) can access them.

When a user attempts to visit a protected route:

The middleware ensures centralized route access control without adding logic to each individual page component.

---

## Usage & Running the App

### Public Features

- `/products` - View all products, filter by category, search
- `/product/[id]` - View product details

### Admin Features

- `/dashboard` - Admin-only dashboard to manage products
- Add, Edit, and Delete products via modal form

---

## Additional Information

- **Responsive Design:** Optimized for desktop and mobile browsers using Tailwind utilities.
- **API Communication:** All API requests are made using Axios with optional authentication headers.
