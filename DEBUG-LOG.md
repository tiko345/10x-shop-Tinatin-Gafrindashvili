# 10X Shop — Debug Log

Developer: Tinatin Gafrindashvili

This document records some issues encountered and resolved during development. Some errors were fixed before committing, so the linked commits contain the corrected implementation rather than a committed broken version.

## 1. Missing Catalog Loading Feedback

### Symptom

The Catalog did not display a loading indicator while fetching products. On the initial request, the product area remained blank until the request finished.

### Reproduction

1. Open the Catalog
2. Use network throttling to slow down requests
3. Reload the page or change a category
4. Observe that no loading feedback appears while the request is pending

These steps describe the behavior before the fix.

### Tool and Evidence

Reviewing `Catalog.tsx` showed that the component maintained a `loading` state, but its JSX did not display a loading indicator. Browser testing with a slower connection made the missing feedback easier to observe.

### Root Cause

The request handler updated `loading`, but the rendered interface did not use that state to show progress.

### Fix

Added a conditional loading indicator with a spinner and “Loading products...” text.

The indicator uses `role="status"` for accessibility and appears while `loading` is true. It disappears when the request finishes.

Fix commit: [ef27f38 — Show catalog loading feedback](https://github.com/tiko345/10x-shop-Tinatin-Gafrindashvili/commit/ef27f3845c068fd3793cb78cd5a565482953fffd)

### What I Learned

Tracking a request in state is only part of handling loading. The interface must also use that state to give the user visible feedback.

## 2. Horizontal Scrolling on the Catalog Page

### Symptom

The Catalog layout extended beyond the available page width, producing unwanted horizontal scrolling.

### Reproduction

1. Open the Catalog with its search, sorting, and category controls
2. Reduce the browser width
3. Observe that the page can scroll horizontally

These steps describe the layout during development before the fix.

### Tool and Evidence

Browser viewing and resizing revealed the overflow. Reviewing the JSX and Tailwind classes showed that the shared main container and Catalog wrappers needed explicit width and minimum-width constraints.

### Root Cause

The layout did not sufficiently constrain the width of its content. The category row could contribute to a content width larger than the available space instead of remaining within a constrained scrolling area.

### Fix

Added `min-w-0 w-full` to the shared Layout's main element.

Added `w-full min-w-0` to the Catalog section and minimum-width constraints to relevant wrappers. The category row used `overflow-x-auto` so its contents could scroll within their own area.

The unwanted page-level horizontal scrolling was resolved.

Fix commit: [909a23b — Catalog controls and layout width fixes](https://github.com/tiko345/10x-shop-Tinatin-Gafrindashvili/commit/909a23b7592239b1cb25baa0b6102c155111c22e)

### What I Learned

Responsive layouts require attention to parent containers as well as individual controls. `min-w-0` allows content to shrink where its automatic minimum width would otherwise cause overflow. A scrolling category row should not make the entire page wider.

## 3. Product Link and Route Mismatch

### Symptom

Product links used `/products/:id`, but the router defined `/product/:id`. A URL using the plural path therefore matched the NotFound route instead of the Product page.

### Reproduction

1. Run the version with the route defined as `/product/:id`
2. Open `/products/5` or follow a product card link using that path
3. Observe that the Product page does not open

### Tool and Evidence

Comparing the product link destination with `AppRoutes.tsx` revealed the mismatch. The Git diff confirms that the route changed from `/product/:id` to `/products/:id`.

### Root Cause

The link and route used different path names: `products` and `product`. React Router treats these as different paths.

### Fix

Changed the route definition to:

`<Route path="/products/:id" element={<Product />} />`

This made the route match the product links.

Fix commit: [909a23b — Correct the product route](https://github.com/tiko345/10x-shop-Tinatin-Gafrindashvili/commit/909a23b7592239b1cb25baa0b6102c155111c22e)

### What I Learned

Link destinations and route definitions must use consistent paths. A small naming difference can send users to NotFound even when the intended component exists.