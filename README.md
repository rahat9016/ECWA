# 🛒 SaaS eCommerce Platform

A scalable multi-tenant eCommerce SaaS application. This platform enables businesses to create and manage their own online stores within a shared infrastructure.

---

## 🚀 Features

### ✅ Multi-Tenant Support
- Store-level data isolation (row-level or schema-based).
- Each vendor gets their own dashboard and storefront.

### ✅ Product Management
- CRUD for products, categories, brands, tags.
- Support for product variants (size, color).
- Image upload via Cloudinary or local storage.

### ✅ Order & Checkout
- Shopping cart with persistent session.
- Order placement, history, and tracking.
- Coupon, discount, and tax support.

### ✅ Payment Integration
- Integrated with Stripe/PayPal.
- Secure transaction handling.

### ✅ User Management
- Vendor and customer registration/login.
- Role-based access: Super Admin, Vendor, Customer.
- JWT Authentication via DRF Simple JWT.

### ✅ Admin Panel
- Django admin extended for superuser control.
- Vendor-specific dashboards for store performance.

### ✅ Analytics & Reports
- Sales statistics and order analytics per store.
- Exportable reports (CSV, PDF support optional).

