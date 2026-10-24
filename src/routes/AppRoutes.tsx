import { Routes, Route } from 'react-router';

import Catalog from "../pages/Catalog.tsx";
import Login from "../pages/login.tsx";
import Cart from "../pages/cart.tsx";
import Product from "../pages/product.tsx";
import Checkout from "../pages/checkout.tsx";
import NotFound from "../pages/notFound.tsx";
import Profile from "../pages/profile.tsx";
import Layout from '../components/layout/layout.tsx';

function AppRoutes() {
    return (
        <>
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Catalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
        </>
    );
}   
export default AppRoutes;