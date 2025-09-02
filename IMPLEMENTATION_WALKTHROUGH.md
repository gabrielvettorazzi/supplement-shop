# Supplement Store: Implementation Walkthrough

This document outlines the step-by-step implementation plan for the Supplement Store web application, as per the project documentation. It incorporates best practices and the specified technical stack to ensure a robust and scalable MVP.

---

## Phase 1: Project Setup & Foundational Elements

This phase focuses on initializing the project, installing dependencies, and setting up the core structure and layout.

### 1.1. Verify Project Setup

- The project is already a Next.js application.
- Confirm that TypeScript, Tailwind CSS, and the App Router are correctly configured.
- Ensure a Git repository is initialized and the current state is committed.

### 1.2. Package Manager Setup

- This project will use **pnpm**.
- If a `pnpm-lock.yaml` file doesn't exist, run `pnpm import` to convert from `package-lock.json` or `yarn.lock`, then run `pnpm install` to generate it.
- Remove any existing `node_modules` and lockfiles from other package managers (e.g., `package-lock.json`, `yarn.lock`).
- Update `package.json` scripts to use `pnpm` where necessary (though standard commands like `dev`, `build` will work fine).

### 1.3. UI Library & Styling

- Integrate **shadcn/ui** for the component library.
- Initialize `shadcn/ui` using its CLI: `npx shadcn-ui@latest init`. This will set up necessary configurations in `tailwind.config.ts` and `globals.css`.
- Components will be added on an as-needed basis via the CLI (e.g., `npx shadcn-ui@latest add button`).

### 1.4. State Management

- Install **Zustand** for global state management: `pnpm add zustand`.
- Zustand is chosen for its simplicity, small bundle size, and hook-based API, which is ideal for managing cart state and user-created orders without a backend.

### 1.5. Project Structure

- Create a logical directory structure to keep the codebase organized:
  ```
  /
  ├── app/
  │   ├── (admin)/          # Group for provider portal routes
  │   │   ├── orders/
  │   │   │   ├── [orderId]/
  │   │   │   │   └── page.tsx
  │   │   │   └── page.tsx
  │   │   └── layout.tsx
  │   ├── (storefront)/     # Group for customer storefront routes
  │   │   ├── products/
  │   │   │   ├── [productId]/
  │   │   │   │   └── page.tsx
  │   │   │   └── page.tsx
  │   │   ├── cart/
  │   │   │   └── page.tsx
  │   │   ├── checkout/
  │   │   │   └── page.tsx
  │   │   └── page.tsx      # Homepage
  │   └── layout.tsx        # Root Layout
  ├── components/
  │   ├── shared/           # Reusable components (Header, Footer)
  │   ├── storefront/       # Components specific to the storefront
  │   └── admin/            # Components specific to the provider portal
  ├── lib/
  │   ├── dummy-data.ts     # Mock data for products and orders
  │   ├── types.ts          # TypeScript type definitions
  │   └── utils.ts          # Utility functions
  ├── store/
  │   ├── app-store.ts      # Store for app-wide state (e.g., user role)
  │   ├── cart-store.ts     # Store for shopping cart state
  │   └── order-store.ts    # Store for order state
  └── public/
  ```

### 1.6. Initial Role Selection Page

- Create a landing page at the root (`/`) that is not part of any route group.
- This page will present two options: "Customer" and "Admin".
- On selection, a global state in `app-store.ts` will be updated, and the user will be redirected to the corresponding section (`/products` for Customer, `/admin/orders` for Admin).

### 1.7. Core Layout

- Implement a shared `Header` and `Footer` component in `/components/shared`.
- The root `layout.tsx` will render the `Header` and `Footer`.
- The `Header`'s navigation links will dynamically change based on the user role stored in Zustand.

---

## Phase 2: Data Modeling & State Configuration

This phase involves defining the data structures and setting up the state management stores.

### 2.1. TypeScript Definitions (`lib/types.ts`)

- Define interfaces for all major data entities:
  - `Product`: id, name, description, price, category, image, bestSeller (boolean).
  - `CartItem`: productId, quantity (defaults to 1).
  - `ShippingInfo`: name, address, email, etc.
  - `Order`: orderId, customerName, date, status (`'Pending' | 'Shipped' | 'Delivered'`), products (list of `Product`), shippingInfo.

### 2.2. Dummy Data (`lib/dummy-data.ts`)

- Create mock data arrays for products and a few initial orders, adhering to the defined TypeScript interfaces. This data will be imported and used throughout the application.

### 2.3. Zustand Stores (`store/`)

- **`useAppStore`**:
  - State: `role: 'customer' | 'admin' | null`.
  - Actions: `setRole(role)`.
- **`useCartStore`**:
  - State: `items: CartItem[]`.
  - Actions: `addToCart(productId)`, `removeFromCart(productId)`, `clearCart()`.
- **`useOrderStore`**:
  - State: `orders: Order[]`.
  - Actions: `addOrder(order)`, `updateOrderStatus(orderId, status)`.

---

## Phase 3: Storefront Implementation

This phase covers the development of all customer-facing pages and features.

### 3.1. Homepage (`/app/(storefront)/page.tsx`)

- **Components**: `ProductCarousel`, `FaqAccordion`.
- **Functionality**:
  - Fetch best-selling products from dummy data.
  - Implement a carousel using `shadcn/ui`'s Carousel component to display these products.
  - Implement a FAQ section using `shadcn/ui`'s Accordion component.

### 3.2. All Products Page (`/app/(storefront)/products/page.tsx`)

- **Components**: `ProductGrid`, `FilterSidebar`, `SearchBar`, `SortDropdown`.
- **Functionality**:
  - Display all products from dummy data in a responsive grid.
  - **Filtering**:
    - By category (checkboxes).
    - By price range (slider).
    - By best sellers (switch).
  - **Searching**: By product name/description (input field).
  - **Sorting**: By price, alphabet, best sellers (select/dropdown).
  - All filtering, searching, and sorting logic will be handled on the client side.

### 3.3. Product Details Page (`/app/(storefront)/products/[productId]/page.tsx`)

- **Functionality**:
  - Use Next.js dynamic routing to create a page for each product.
  - Fetch and display all details for the selected product.
  - Include an "Add to Cart" button that, upon clicking, calls the `addToCart` action from `useCartStore`.
  - The cart will only allow a single quantity per product; if the product is already in the cart, the button can be disabled or show a "View Cart" link.

### 3.4. Shopping Cart (`/app/(storefront)/cart/page.tsx`)

- **Components**: `CartItemsList`, `CartSummary`.
- **Functionality**:
  - Display the contents of the cart by subscribing to `useCartStore`.
  - Each item in the list should have a "Remove" button calling `removeFromCart`.
  - Display a summary (total items, total price).
  - Include a "Clear Cart" button.
  - Include a "Proceed to Checkout" button that navigates to the checkout page.

### 3.5. Checkout Page (`/app/(storefront)/checkout/page.tsx`)

- **Components**: `ShippingForm`, `OrderSummary`.
- **Functionality**:
  - Display a form for required shipping information (name, address, etc.). Use `shadcn/ui`'s Form component, which integrates with `react-hook-form` and `zod` for validation.
  - Display a final order summary.
  - A "Place Order" button will:
    1. Validate the form.
    2. Generate a new order object.
    3. Add the order to the `useOrderStore`.
    4. Clear the cart using `useCartStore.clearCart()`.
    5. Redirect to a success page or show a confirmation message.

---

## Phase 4: Provider Portal Implementation

This phase covers the development of the administrative interface for managing orders.

### 4.1. All Orders Page (`/app/(admin)/orders/page.tsx`)

- **Components**: `OrdersTable`, `PaginationControl`, `SearchAndFilterBar`.
- **Functionality**:
  - Fetch and display all orders from `useOrderStore` in a paginated table (`shadcn/ui` Table component).
  - Implement client-side pagination.
  - **Searching**: By order ID, product name, customer name.
  - **Filtering**: By date range (`DatePicker` component) and status (`Select` component).

### 4.2. Order Details Page (`/app/(admin)/orders/[orderId]/page.tsx`)

- **Functionality**:
  - Use dynamic routing to display details for a specific order.
  - Display a comprehensive summary: customer details, shipping info, and the list of products in the order.
  - Provide a mechanism (e.g., `Select` or `RadioGroup`) to change the order's status. This will call the `updateOrderStatus` action from `useOrderStore`.

---

## Phase 5: Final Touches & Review

This final phase ensures the application is polished and meets all requirements.

### 5.1. Responsiveness

- Thoroughly test all pages and components across different screen sizes (mobile, tablet, desktop).
- Adjust layouts and styles using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) to ensure a high-quality user experience on all devices.

### 5.2. UI/UX Polish

- Review all user flows for clarity and ease of use.
- Add subtle animations and transitions to improve the feel of the application.
- Ensure consistent styling and component usage across the entire app.
- Check for accessibility best practices.
