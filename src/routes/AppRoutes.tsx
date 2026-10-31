import { Routes, Route } from 'react-router';
import Catalog from "../pages/Catalog.tsx";
import Login from "../pages/login.tsx";
import Cart from "../pages/cart.tsx";
import Product from "../pages/product.tsx";
import Checkout from "../pages/checkout.tsx";
import NotFound from "../pages/notFound.tsx";
import Profile from "../pages/profile.tsx";
import Layout from "../components/layout/Layout.tsx";
import ProtectedRoute from './ProtectedRoute.tsx';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Catalog />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/products/:id" element={<Product />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/checkout" element={<Checkout />} />
                    </Route>
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
export default AppRoutes;