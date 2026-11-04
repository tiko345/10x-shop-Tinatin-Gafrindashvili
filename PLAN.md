10X Shop — Project Plan

Project: 10X Shop
Developer: Tinatin Gafrindashvili
Project Type: Individual Front-End Graduation Project
Development Period: October 21 – November 6, 2026
Submission Deadline: November 6, 2026, 23:59 (Georgia time)

## 1. Project Goal
The goal of this project is to develop a responsive e-commerce Single Page Application using React, TypeScript, Tailwind CSS, and the DummyJSON API.
Users will be able to browse products, view product details, manage a shopping cart, log in through simulated authentication, and complete a simulated checkout process.
The project will demonstrate React component architecture, TypeScript type safety, state management, API integration, responsive design, and Git version control.

## 2. Technology Stack
React 19 — User interface and component development
TypeScript — Static typing and type safety
Vite — Development environment and build tool
Tailwind CSS v4 — Responsive styling
React Router — Client-side navigation
React Context API — Authentication and cart state management
DummyJSON API — Product data
Git and GitHub — Version control
Vercel or Netlify — Deployment


## 3. Project Scope
CORE — Required Features

Authentication
- controlled Login form with validation
- simulated login/logout using React Context
- protected Checkout route
- redirect guests to Login and return them to Checkout after login

Product Catalog
- fetch products from DummyJSON
- display products using reusable components
- handle loading, error, and empty states
- responsive product grid

Product Details
- display product information and images
- allow users to add products to the cart

Shopping Cart
- add and remove products
- increase and decrease quantities
- calculate item totals and overall cart total

Checkout
- controlled shipping form
- form validation
- display order summary
- simulate order placement
- show confirmation and clear the cart


## 4. Weekly Development Plan

### Week 1 — Foundations, Authentication, and Catalog

- [x] Initialize the React and TypeScript project
- [x] Configure Tailwind CSS v4
- [x] Create the initial folder structure
- [x] Configure Git and GitHub
- [x] Write PLAN.md
- [x] Define initial TypeScript types
- [x] Set up React Router and shared layout
- [x] Implement Login and AuthContext
- [x] Fetch and display products from DummyJSON
- [ ] Protect Checkout from unauthenticated users — carried forward to Week 2

### Week 2 — Product Details, Cart, Checkout, and Final Submission

Complete the project by November 6, 2026
Prioritize CORE requirements before adding optional features

#### Product Details and Cart

- [x] Display product information, stock, and images
- [x] Implement image and quantity selection
- [x] Create CartContext with immutable state updates
- [x] Connect Add to Cart using the selected quantity
- [x] Implement cart quantity controls and product removal
- [x] Display line totals, overall total, and an empty-cart state
- [x] Display subtotal alongside total
- [x] Connect the Header badge to the total cart quantity
- [x] Connect the Proceed to checkout link

#### Checkout and Authentication

- [x] Complete Checkout route protection
- [x] Return users to Checkout after login
- [x] Handle opening Checkout with an empty cart
- [x] Implement controlled Full name, Email, Address, and City fields
- [x] Validate required Checkout fields
- [x] Display the order summary and total
- [x] Simulate order placement
- [x] Display confirmation and clear the cart

#### Testing and Quality

- [x] Test the complete shopping journey
- [x] Verify stock limits, duplicate products, and cart calculations
- [x] Check loading, error, empty, and invalid-route states
- [x] Check mobile and desktop layouts
- [x] Verify form labels, image alt text, and visible keyboard focus
- [x] Run TypeScript checks and the production build

#### Documentation and Deployment

- [ ] Complete README.md
- [ ] Complete REPORT.md and document AI usage
- [ ] Update PLAN.md with final progress
- [x] Deploy to Vercel or Netlify
- [ ] Verify navigation and direct route access on the live site
- [ ] Prepare the final GitHub repository and deployment links
