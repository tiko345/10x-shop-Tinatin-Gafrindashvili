# 10X Shop

10X Shop is an individual front-end graduation project developed by **Tinatin Gafrindashvili**.

The application lets users browse products, view product details, manage a shopping cart, log in through simulated authentication, and complete a simulated checkout. Product data is provided by DummyJSON.

## Links

- [Live Demo](https://10x-shop-tinatin-gafrindashvili.vercel.app/)
- [GitHub Repository](https://github.com/tiko345/10x-shop-Tinatin-Gafrindashvili)

## Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- React Context API
- Lucide React
- DummyJSON API
- Oxlint
- Vercel

## Features

### CORE Features

- Product catalog loaded from DummyJSON
- Reusable product cards and responsive grid
- Loading, error, and empty states
- Product details with image selection and quantity controls
- Shared shopping cart with add, remove, and quantity update operations
- Duplicate product additions combined into one cart row
- Stock limits and positive-integer quantity validation
- Discounted cart prices, line totals, subtotal, and total
- Header badge showing the total number of units in the cart
- Controlled Login form with validation
- Simulated login and logout using Context
- Protected Checkout route with return navigation after login
- Controlled checkout form with required-field validation
- Local order confirmation showing the order total
- Cart clearing after successful order placement
- Empty-cart checkout redirect
- NotFound page and application Error Boundary

### Additional Features

- Product search
- Category filtering
- Sorting by price, rating, and title
- Pagination with the current page stored in the URL
- Light and dark themes
- Theme preference saved in localStorage
- Product card hover effects

## Demo Login

Authentication is simulated locally. No account registration or authentication API is required.

Example credentials:

- **Username:** demo
- **Password:** demo123

Any username that is not empty after trimming and any password containing at least six characters passes the implemented validation.

Opening Checkout while logged out redirects to Login. After successful login, the user returns to Checkout. Opening Login directly returns the user to the catalog after login.

Logout clears authentication state and preserves the current cart.

Do not enter a real password.

## Run Locally

Install Node.js and npm using a version supported by the project's Vite version.

Clone the repository:

```bash
git clone https://github.com/tiko345/10x-shop-Tinatin-Gafrindashvili.git
cd 10x-shop-Tinatin-Gafrindashvili
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in the terminal.

The application requires an internet connection to load product data and images from DummyJSON. No API key is required.

## Project Structure

The main source folders are:

| Path | Responsibility |
| --- | --- |
| `src/api/` | Product and category API requests |
| `src/components/` | Reusable interface components and Error Boundary |
| `src/components/layout/` | Header, Footer, and shared Layout |
| `src/components/product/` | Product cards, grid, search, sorting, and categories |
| `src/context/` | Authentication, cart, and theme providers |
| `src/pages/` | Route-level page components |
| `src/routes/` | Route definitions and Checkout protection |
| `src/types/` | Shared TypeScript data types |
| `src/index.css` | Tailwind integration and global theme backgrounds |
| `src/main.tsx` | Application entry point and provider composition |

## Architecture and Data Flow

React Router renders pages inside a shared Layout containing the Header, Footer, and an Outlet.

AuthContext shares the current username and login/logout operations. CartContext shares cart items and updates them immutably. ThemeContext manages the selected theme and saves it under the `shop_theme` localStorage key.

Pages load product data through functions in the API folder. Typed props pass data and callbacks to reusable components.

Checkout reads the shared cart and saves a separate order summary in component state before clearing the cart. This allows the confirmation and original order total to remain visible after the cart becomes empty.

## Main Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Product catalog | Public |
| `/products/:id` | Product details | Public |
| `/cart` | Shopping cart | Public |
| `/login` | Simulated login | Public |
| `/checkout` | Checkout and local confirmation | Requires simulated login |
| Unmatched routes | NotFound page | Public |

## Shopping Flow

1. Browse the catalog or use search, categories, and sorting
2. Open a product and select its image and quantity
3. Add the product to the cart
4. Review quantities, remove products, and check the total
5. Proceed to Checkout and log in if required
6. Complete Full name, Email, Address, and City
7. Place the order to view confirmation and clear the cart

Search and category selection are mutually exclusive: entering a search clears the selected category, and selecting a category clears the search.

## Data and Limitations

- Authentication is an educational simulation, not secure server authentication
- Login credentials are not sent to a server or saved in localStorage
- Cart and login state are stored in memory and reset on page refresh
- Theme preference persists when localStorage is available
- Checkout validates required fields and does not process real payments
- Order confirmation exists only during the current Checkout visit
- Orders are not saved to a backend or persistent order history
- A complete Profile page is outside the implemented scope
- Shipping charges and promo codes are not implemented, so subtotal and total are equal
- Product data availability depends on DummyJSON

## Deployment

The application is deployed on Vercel:

https://10x-shop-tinatin-gafrindashvili.vercel.app/

The production build is generated using `npm run build`, with output in the `dist` directory.

The hosting configuration must support SPA routing so that direct access to routes such as `/products/5` serves the application.

## Project Documentation

- `PLAN.md` — project scope, development plan, and progress
- `REPORT.md` — delivered functionality, challenges, limitations, and AI usage
- `DEBUG-LOG.md` — real bugs, investigation steps, and fixes

## Credits

- **Developer:** Tinatin Gafrindashvili
- **Product data and images:** DummyJSON
- **Icons:** Lucide
- **AI assistance:** ChatGPT was used for explanations, debugging suggestions, implementation guidance, styling, and documentation drafts