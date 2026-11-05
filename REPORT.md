# 10X Shop — Project Report

**Developer:** Tinatin Gafrindashvili  
**Project:** Individual Front-End Graduation Project  
**Development period:** October 21 – November 6, 2026  
**Report updated:** November 5, 2026

## 1. Project Overview

10X Shop is an e-commerce Single Page Application built with React, TypeScript, Vite, and Tailwind CSS v4.

The goal was to implement the CORE shopping journey: browse products, view product details, manage a cart, log in through simulated authentication, and complete a local checkout.

Product data comes from DummyJSON. Authentication and order placement are educational simulations.

## 2. Planned and Delivered Work

| Area | Planned work | Delivered |
| --- | --- | --- |
| React | Reusable components, routing, Context, and controlled forms | Shared layout, product components, authentication/cart/theme Contexts, Login and Checkout forms |
| TypeScript | Typed props, state, API data, and strict checks | Product and cart types, typed component props, form types, and typecheck script |
| Catalog | Fetch and display products with loading/error/empty states | Implemented, with additional search, category filtering, sorting, and pagination |
| Product Details | Product information, images, and Add to Cart | Implemented with image selection, quantity selection, and stock checks |
| Cart | Add/remove products, update quantities, and calculate totals | Implemented with immutable updates, duplicate-item handling, discounted totals, and Header badge |
| Authentication | Simulated login/logout and protected Checkout | Implemented with required validation and return navigation after login |
| Checkout | Controlled form, validation, summary, and local confirmation | Implemented with duplicate-submission protection and cart clearing |
| Tailwind CSS | Responsive styling and interactive states | Implemented with a consistent mint/teal palette and light/dark themes |
| Reliability | Error handling and debugging | Error Boundary, API error states, NotFound page, and DEBUG-LOG.md |
| Deployment | Public live application | Deployed on Vercel |

## 3. Schedule and Scope Changes

The project used two development stages.

The first stage focused on setup, routing, authentication, and the Catalog. Checkout protection was moved from the first stage to the second stage and completed alongside Checkout integration.

The second stage covered Product Details, Cart, Checkout, visual improvements, testing, documentation, and deployment.

Additional features implemented beyond the basic CORE flow were search, category filtering, sorting, pagination, and persistent theme selection.

Order history, a complete Profile page, promo codes, and advanced shipping calculations were not implemented so that development could focus on completing the main shopping journey.

## 4. Main Implementation Challenges

### Shared Cart State and Stock Limits

Cart changes needed to remain consistent across Product Details, Cart, Checkout, and the Header badge.

CartContext became the shared source of cart data. Functional state updates calculate changes from the latest items, and immutable array operations update or remove rows.

Stock validation includes units already in the cart so that repeated additions cannot exceed the available stock.

### Preserving Confirmation After Clearing the Cart

Checkout redirects users to Cart when there are no items. Clearing the cart after an order could therefore conflict with displaying confirmation.

The solution was to save a separate order summary in Checkout state before clearing the cart. The confirmation is rendered before the empty-cart redirect is checked, preserving the original order total.

### Responsive Catalog Layout

The Catalog controls and category row caused unwanted horizontal scrolling during development.

Width constraints and `min-w-0` were added to the shared layout and Catalog containers. Category overflow was handled within its own scrolling row.

Details and commit links are recorded in DEBUG-LOG.md.


## 6. Known Limitations

- Authentication is simulated and does not provide server-side security
- Cart and login state reset after refreshing the page
- Theme preference is saved in localStorage when storage is available
- Checkout performs required-field validation and does not process payments
- Order confirmation is temporary and no order history is stored
- Search and category selection are mutually exclusive
- Shipping charges and promo codes are not included
- Product data and images depend on DummyJSON availability
- A complete Profile page is outside the delivered scope

## 7. What I Would Improve

For a future version, I would centralize repeated price calculations and shared styling earlier in development.

I would also record debugging notes as issues occur rather than collecting them near submission. This would make it easier to connect symptoms, fixes, and commits.

Further improvements could include cart persistence, order history, expanded validation, and automated tests for cart calculations and checkout behavior.

## 8. AI Usage

ChatGPT assisted with implementation guidance, debugging explanations, styling suggestions, and documentation drafts.

I requested manageable steps and explanations of each of them so that i would have a better understanding of the code 

Suggestions were adapted to the existing code and project scope, including using type aliases and keeping checkout as a local simulation.

I rejected visual suggestions that did not fit the design.

The final design uses mint and teal colors with an optional dark theme.

I remain responsible for reviewing the code, checking its behavior, and explaining the implementation.

## 9. Project Links

- [GitHub Repository](https://github.com/tiko345/10x-shop-Tinatin-Gafrindashvili)
- [Live Application](https://10x-shop-tinatin-gafrindashvili.vercel.app/)

Supporting documentation:

- [README.md](README.md)
- [PLAN.md](PLAN.md)
- [DEBUG-LOG.md](DEBUG-LOG.md)