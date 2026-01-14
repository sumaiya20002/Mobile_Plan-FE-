import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MyProfile from "./MyProfile";
import Support from "./Support";




/* ===== AUTH ===== */
import Login from "./Login";
import Signup from "./SignUp";


import ForgotPassword from "./ForgotPassword";
import OtpVerify from "./OtpVerify";
import ResetPassword from "./ResetPassword";

/* ===== SECURITY & LAYOUT ===== */
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "./DashboardLayout";
import DashboardHome from "./DashboardHome";

/* ===== PLANS & OFFERS ===== */
import Plan from "./Plan";
import Offer from "./Offer";
import OfferList from "./OfferList";
import OfferSuccess from "./OfferSuccess";

/* ===== CART & CHECKOUT (NEW) ===== */
import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderSuccess from "./OrderSuccess";
import OrderHistory from "./OrderHistory";

/* ===== SUBSCRIPTIONS ===== */
import SubscriptionDetails from "./SubscriptionDetails";
import SubscriptionSuccess from "./SubscriptionSuccess";
import MySubscriptions from "./MySubscriptions";
import CancelSuccess from "./CancelSuccess";
import ReactivateSuccess from "./ReactivateSuccess";
import PaymentSuccess from "./PaymentSuccess";
import History from "./History";
import OrderTracking from './OrderTracking';
import AiChat from "./AiChat";


function App() {
  return (
    <BrowserRouter>
      <Routes>


       <Route path="/support" element={<Support />} />


        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Login />} />
      
         <Route path="/signup" element={<Signup />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ===== PROTECTED ===== */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>

            {/* DASHBOARD */}
            <Route path="/dashboard" element={<DashboardHome />} />

            <Route path="/profile" element={<MyProfile />} />

            {/* PLANS */}
            <Route path="/plan" element={<Plan />} />

            {/* OFFERS */}
            <Route path="/offers" element={<OfferList />} />
            <Route path="/offers/:planId" element={<Offer />} />
            <Route path="/offer-success" element={<OfferSuccess />} />

            {/* CART & CHECKOUT */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/order-history" element={<OrderHistory />} />

            {/* SUBSCRIPTIONS */}
            <Route path="/subscription" element={<MySubscriptions />} />
            <Route path="/subscription/:id" element={<SubscriptionDetails />} />
            <Route path="/subscription-success" element={<SubscriptionSuccess />} />

            {/* STATUS */}
            <Route path="/cancel-success" element={<CancelSuccess />} />
            <Route path="/reactivate-success" element={<ReactivateSuccess />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/history" element={<History />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/ai-chat" element={<AiChat />} />




          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
