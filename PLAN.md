10X Shop — Project Plan

Project: 10X Shop
Developer: Tinatin Gafrindashvili
Project Type: Individual Front-End Graduation Project
Development Period: October 21 – November 6, 2026
Submission Deadline: November 6, 2026, 23:59 (Georgia time)

1. Project Goal
The goal of this project is to develop a responsive e-commerce Single Page Application using React, TypeScript, Tailwind CSS, and the DummyJSON API.
Users will be able to browse products, view product details, manage a shopping cart, log in through simulated authentication, and complete a simulated checkout process.
The project will demonstrate React component architecture, TypeScript type safety, state management, API integration, responsive design, and Git version control.

2. Technology Stack
React 19 — User interface and component development
TypeScript — Static typing and type safety
Vite — Development environment and build tool
Tailwind CSS v4 — Responsive styling
React Router — Client-side navigation
React Context API — Authentication and cart state management
DummyJSON API — Product data
Git and GitHub — Version control
Vercel or Netlify — Deployment


3. Project Scope
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


4. Weekly Development Plan

Week 1 
Foundations, Authentication, and Catalog
- initialize the React and TypeScript project.
- configure Tailwind CSS v4.
- create the initial folder structure.
- configure Git and GitHub.
- write PLAN.md.
- define necessary TypeScript types.
- set up React Router and shared layout.
- implement Login and AuthContext.
- protect Checkout from unauthenticated users.
- fetch and display products from DummyJSON.
