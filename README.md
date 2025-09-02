# Topflight Supplement Store

A modern, responsive e-commerce web application built with Next.js 15, featuring a dual-interface system for customers and administrators. The application includes a complete shopping experience with session storage persistence and role-based access control.

## 🚀 Features

### Customer Storefront
- **Homepage** - Hero section with call-to-action, best sellers carousel, and FAQ section
- **Product Catalog** - Grid layout with advanced filtering and sorting capabilities
- **Product Details** - Comprehensive product information with add-to-cart functionality
- **Shopping Cart** - Persistent cart with item management and summary
- **Checkout Process** - Complete order flow with shipping information collection
- **Responsive Design** - Mobile-first approach with optimized layouts

### Admin Portal
- **Order Management** - View and manage all customer orders
- **Order Details** - Comprehensive order information with status updates
- **Search & Filtering** - Advanced search and filtering capabilities
- **Status Management** - Update order status (Pending, Shipped, Delivered)

### Core Features
- **Session Storage Persistence** - All data persists across browser sessions
- **Role-Based Access** - Seamless switching between customer and admin modes
- **Real-time Updates** - Instant UI updates with toast notifications
- **Responsive UI** - Optimized for all device sizes

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Package Manager**: pnpm
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supplement-store
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
supplement-store/
├── app/
│   ├── (admin)/              # Admin route group
│   │   ├── orders/
│   │   │   ├── [orderId]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── OrderDetailsClient.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (storefront)/         # Customer route group
│   │   ├── products/
│   │   │   ├── [productId]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── ProductDetailsClient.tsx
│   │   │   └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   └── page.tsx          # Storefront homepage
│   ├── select-role/          # Role selection page
│   │   └── page.tsx
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Root page (redirects based on role)
├── components/
│   ├── shared/               # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── UserMenu.tsx
│   ├── storefront/           # Customer-specific components
│   │   ├── ProductCarousel.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── FaqAccordion.tsx
│   │   └── CartSheet.tsx
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── types.ts              # TypeScript definitions
│   └── dummy-data.ts         # Mock data
├── store/                    # Zustand stores
│   ├── app-store.ts          # App state (role management)
│   ├── cart-store.ts         # Shopping cart state
│   └── order-store.ts        # Order management state
└── public/                   # Static assets
```

## 🎯 Key Features Implementation

### Session Storage Persistence
All Zustand stores use session storage for data persistence:
- **App Store**: User role and authentication state
- **Cart Store**: Shopping cart items
- **Order Store**: Order management data

### Role-Based Navigation
- **Role Selection**: Initial page to choose between Customer and Admin
- **Automatic Redirects**: Users are redirected to appropriate interfaces
- **Seamless Switching**: Users can switch roles without losing session data

### Shopping Experience
- **Single Quantity Per Product**: Cart enforces one item per product
- **Real-time Updates**: Cart updates instantly with toast notifications
- **Persistent Cart**: Cart data persists across page refreshes

### Admin Management
- **Order Overview**: Paginated table with search and filtering
- **Order Details**: Comprehensive order information with status management
- **Status Updates**: Real-time status changes with notifications

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Modern Components**: Built with shadcn/ui for consistent design
- **Accessibility**: ARIA labels and keyboard navigation support
- **Loading States**: Smooth transitions and loading indicators
- **Toast Notifications**: User feedback for all actions

## 🚀 Getting Started

1. **Select Your Role**
   - Visit the application and choose between Customer or Admin
   - Your role will be remembered for the session

2. **Customer Experience**
   - Browse products with advanced filtering
   - Add items to cart (one per product)
   - Complete checkout with shipping information
   - View order confirmation

3. **Admin Experience**
   - View all customer orders
   - Search and filter orders
   - Update order status
   - View detailed order information

## 🔧 Development

### Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Adding New Components
```bash
# Add shadcn/ui components
pnpm dlx shadcn@latest add <component-name>
```

### State Management
The application uses Zustand for state management with session storage persistence. All stores are located in the `store/` directory.

## 📱 Responsive Design

The application is fully responsive with the following breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Data Persistence

All application data is stored in session storage, which means:
- Data persists across page refreshes
- Data is cleared when the browser tab is closed
- No backend or database required
- Perfect for demo and prototyping

## 🎯 Future Enhancements

- User authentication and registration
- Payment processing integration
- Inventory management
- Customer reviews and ratings
- Email notifications
- Advanced analytics dashboard

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS**
