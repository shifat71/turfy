# Turfy System Architecture

This document describes the proposed system architecture for Turfy, a dedicated football turf booking web app for a single turf owner business in Bangladesh.

Turfy is not a generalized marketplace for many independent turf businesses. Each turf business receives its own separate web app deployment, Supabase project or isolated database configuration, branding, public pages, owner dashboard, and bKash merchant setup.

## 1. Architecture Goals

The system should support:

- Public turf discovery without customer login.
- Public viewing of available and booked slots.
- Customer login only when placing an order.
- Owner and staff dashboard for turf, slot, pricing, booking, payment, receipt, and analytics management.
- bKash payment integration for the single business's merchant account.
- Digital receipt generation after successful booking.
- Receipt verification by owner or staff.
- Persistent booking and customer order history.
- Slot-based and date-based dynamic pricing.
- Supabase as the database, authentication, authorization, and storage foundation.

## 2. Tenancy Model

Turfy uses a **single-tenant per business** model.

That means:

- One deployed web app belongs to one turf business.
- One owner business manages the turf data inside that app.
- The business may manage multiple turf fields, venues, or branches inside the same app.
- Customers only see and book turfs from that specific business.
- The bKash merchant account belongs to that specific business.
- Analytics are calculated for that specific business only.

This is different from a marketplace. There is no shared public marketplace where many unrelated turf owners list their businesses together.

## 3. High-Level Architecture

```text
                       +----------------------+
                       |      Customers       |
                       |  Public visitors     |
                       +----------+-----------+
                                  |
                                  v
+----------------------+   +------+----------------+   +----------------------+
| Owner / Business     |-->|      Web App          |-->|      Supabase        |
| Staff Dashboard      |   | Public + Dashboard    |   | Auth, DB, Storage    |
+----------------------+   +------+----------------+   +----------+-----------+
                                  |                               |
                                  v                               v
                       +----------+-----------+       +-----------+----------+
                       |   Backend/API Layer  |<----->| Supabase Edge funcs |
                       | Booking, payments,   |       | secure operations   |
                       | receipts, analytics  |       +---------------------+
                       +----------+-----------+
                                  |
                                  v
                       +----------+-----------+
                       |     bKash API        |
                       | Business merchant    |
                       +----------------------+
```

## 4. Main Actors

### Public Visitor

A public visitor can:

- Open the home page.
- View an available turf list from this business.
- Use the view more option to open the full turf listing page.
- Open turf details.
- View public slot availability.
- Start the booking flow.

Public visitors cannot place an order until they log in or create an account.

### Customer

A customer is an authenticated user who can:

- Place a booking order.
- Pay through bKash.
- Receive a receipt.
- View upcoming, past, cancelled, and refunded bookings.
- View payment and receipt history.

### Owner

The owner is the main business administrator. The owner can:

- Manage the business profile.
- Create and manage turf profiles.
- Upload turf photos.
- Configure facilities, location, rules, and opening hours.
- Manage slots and availability.
- Configure dynamic slot pricing.
- Connect the business bKash merchant account.
- View and manage bookings.
- Verify customer receipts.
- View business analytics.
- Manage staff access in a future phase.

### Staff

Staff accounts can be added for daily operations. Staff can:

- View bookings.
- Verify receipts.
- Manage slot availability if allowed.
- Assist customers at the turf location.

Staff permissions should be configurable so not every staff member has full owner access.

### Business Admin

A business admin role can be added later for internal management within the same business.

Possible capabilities:

- Manage staff accounts.
- Review turf fields or branches.
- Monitor transactions.
- Handle booking disputes.
- Configure business settings.
- View business-wide analytics.

## 5. Application Layers

### Frontend Web App

The frontend is responsible for:

- Public landing page and turf discovery for this business.
- Available turf list on the home page.
- Full turf listing page.
- Turf details and public slot calendar.
- Customer authentication during checkout.
- Booking checkout flow.
- Payment result screens.
- Customer dashboard.
- Owner and staff dashboard.
- Receipt display and verification UI.
- Analytics UI.

Recommended route groups:

- `/` - home page with landing content and available turf list
- `/turfs` - public turf listing for this business
- `/turfs/:turfId` - public turf details and slot availability
- `/checkout/:slotId` - authenticated customer booking checkout
- `/payment/status` - payment result page
- `/receipts/:receiptId` - receipt display
- `/customer/bookings` - customer booking history
- `/owner` - owner dashboard overview
- `/owner/turfs` - turf management
- `/owner/turfs/:turfId/slots` - slot management
- `/owner/pricing` - pricing rules
- `/owner/bookings` - booking management
- `/owner/receipts/verify` - receipt verification
- `/owner/payments` - bKash merchant settings
- `/owner/analytics` - business analytics
- `/owner/staff` - staff management in a future phase

### Backend/API Layer

The backend layer handles operations that must not run directly from the browser.

Responsibilities:

- Create booking holds.
- Prevent double booking.
- Start bKash payment.
- Receive and verify bKash payment callbacks.
- Confirm bookings after successful payment.
- Expire unpaid bookings.
- Generate receipt records.
- Verify receipt codes or QR codes.
- Calculate analytics safely.
- Protect sensitive bKash merchant credentials.

This layer can be implemented using:

- Supabase Edge Functions for payment callbacks and protected workflows.
- Server routes if the frontend framework supports a backend runtime.
- Scheduled jobs for expiring pending payments and slots.

### Supabase

Supabase is the core platform for:

- PostgreSQL database.
- Supabase Auth.
- Row Level Security policies.
- Storage for turf photos.
- Optional Edge Functions.
- Realtime updates for booking and slot status if needed.

### bKash Payment Gateway

bKash is used for customer payment collection.

The payment integration should support:

- Single business merchant account connection.
- Payment initiation.
- Payment execution or confirmation.
- Transaction status verification.
- Callback or webhook handling.
- Payment failure handling.
- Refund handling in a future phase.

Sensitive merchant credentials should never be exposed to the frontend.

## 6. Core Domains

### Business Profile

The business profile stores identity and branding for the single turf business.

Business profile data:

- Business name
- Logo
- Contact phone
- Contact email
- Address
- Social links
- Default city or service area
- bKash merchant account reference
- Business rules and policies

### Turf Discovery

Public pages should read published turf data from Supabase.

Discovery data:

- Turf name
- Location, area, city, and map coordinates
- Photos
- Starting price or price range
- Facilities
- Available sports
- Opening and closing hours
- Availability summary

Public users can view this data without authentication.

### Turf Management

The owner manages turf records from the dashboard.

Owner-managed turf data:

- Basic information
- Address and map location
- Photos
- Facilities
- Rules
- Opening hours
- Cancellation policy
- Visibility or publish status

Because this is a single-business app, every turf belongs to the same business.

### Slot and Availability Management

Slots represent bookable time periods for a turf.

Slot data:

- Turf ID
- Date
- Start time
- End time
- Base price
- Final price
- Availability status
- Booking status

Slot statuses:

- `available`
- `pending_payment`
- `booked`
- `unavailable`

To avoid double booking, the system should enforce a unique booking constraint for a turf, date, start time, and end time when the slot is confirmed or pending payment.

### Dynamic Pricing

Pricing can come from:

- Default turf price.
- Time-based pricing rules.
- Weekend pricing.
- Special date pricing.
- Manual slot override.

Suggested pricing priority:

1. Manual slot price override.
2. Special date pricing rule.
3. Weekend pricing rule.
4. Time-of-day pricing rule.
5. Default turf price.

### Booking

A booking connects a customer to a turf slot.

Booking lifecycle:

```text
available slot
   |
   v
pending_payment booking
   |
   +--> payment successful --> confirmed booking --> receipt generated
   |
   +--> payment failed/expired --> expired booking --> slot released
```

Booking statuses:

- `pending_payment`
- `confirmed`
- `cancelled`
- `completed`
- `expired`
- `refunded`

### Payment

Payment records store bKash transaction details and payment state.

Payment statuses:

- `initiated`
- `successful`
- `failed`
- `expired`
- `refunded`

The payment record should include:

- Booking ID
- Customer ID
- Amount
- Currency
- bKash payment ID
- bKash transaction ID
- Payment status
- Raw gateway reference data if needed

### Receipt

Receipts prove that a booking and payment are valid.

Receipt data:

- Receipt ID
- Booking ID
- Customer ID
- Turf ID
- Paid amount
- Payment method
- bKash transaction ID
- Verification code
- QR code payload
- Receipt status
- Issue time

Receipt statuses:

- `valid`
- `verified`
- `cancelled`
- `expired`
- `refunded`

### Receipt Verification

Owner or staff can verify receipts by scanning a QR code or entering a verification code.

Verification flow:

1. Owner or staff opens receipt verification page.
2. Owner or staff scans QR code or enters receipt code.
3. System checks receipt existence.
4. System checks booking and payment status.
5. System returns valid, invalid, cancelled, expired, or refunded result.
6. System stores a verification log.

### Analytics

Business analytics should be calculated from bookings, payments, slots, and receipts.

Analytics examples:

- Total revenue.
- Estimated profit.
- Booking count.
- Revenue by day, week, and month.
- Revenue by turf.
- Revenue by slot type.
- Popular slots.
- Peak booking hours.
- Occupancy rate.
- Average booking value.
- Cancelled bookings.
- Payment success rate.

## 7. Suggested Database Tables

### `profiles`

Stores app-level user profile data linked to Supabase Auth.

Fields:

- `id`
- `auth_user_id`
- `role`
- `full_name`
- `phone`
- `created_at`
- `updated_at`

Roles:

- `customer`
- `owner`
- `staff`
- `business_admin`

### `business_profile`

Stores business details for the single turf business.

Fields:

- `id`
- `business_name`
- `business_phone`
- `business_email`
- `address`
- `city`
- `logo_storage_path`
- `primary_color`
- `secondary_color`
- `created_at`
- `updated_at`

### `turfs`

Stores turf information for this business.

Fields:

- `id`
- `business_profile_id`
- `name`
- `description`
- `address`
- `area`
- `city`
- `latitude`
- `longitude`
- `turf_size`
- `available_sports`
- `facilities`
- `opening_time`
- `closing_time`
- `default_price`
- `booking_rules`
- `cancellation_policy`
- `is_published`
- `created_at`
- `updated_at`

### `turf_images`

Stores photos for turfs.

Fields:

- `id`
- `turf_id`
- `storage_path`
- `alt_text`
- `sort_order`
- `created_at`

### `slots`

Stores bookable turf slots.

Fields:

- `id`
- `turf_id`
- `slot_date`
- `start_time`
- `end_time`
- `base_price`
- `final_price`
- `status`
- `created_at`
- `updated_at`

### `pricing_rules`

Stores dynamic pricing rules.

Fields:

- `id`
- `turf_id`
- `rule_name`
- `rule_type`
- `day_of_week`
- `specific_date`
- `start_time`
- `end_time`
- `price`
- `priority`
- `is_active`
- `created_at`
- `updated_at`

Rule types:

- `time_of_day`
- `weekend`
- `specific_date`
- `manual_override`

### `bookings`

Stores customer booking orders.

Fields:

- `id`
- `customer_id`
- `turf_id`
- `slot_id`
- `booking_date`
- `start_time`
- `end_time`
- `amount`
- `status`
- `expires_at`
- `created_at`
- `updated_at`

### `payments`

Stores bKash payment records.

Fields:

- `id`
- `booking_id`
- `customer_id`
- `amount`
- `currency`
- `payment_method`
- `gateway_payment_id`
- `gateway_transaction_id`
- `status`
- `gateway_response`
- `created_at`
- `updated_at`

### `business_payment_account`

Stores bKash merchant account connection metadata for this business.

Fields:

- `id`
- `business_profile_id`
- `provider`
- `merchant_number`
- `account_status`
- `credentials_reference`
- `created_at`
- `updated_at`

Merchant secrets should be stored securely and should not be readable by frontend clients.

### `receipts`

Stores generated booking receipts.

Fields:

- `id`
- `booking_id`
- `payment_id`
- `customer_id`
- `turf_id`
- `receipt_number`
- `verification_code`
- `qr_payload`
- `status`
- `issued_at`
- `verified_at`
- `created_at`

### `receipt_verifications`

Stores receipt verification history.

Fields:

- `id`
- `receipt_id`
- `verified_by`
- `verification_result`
- `verified_at`
- `metadata`

### `reviews`

Optional future table for turf reviews.

Fields:

- `id`
- `customer_id`
- `turf_id`
- `booking_id`
- `rating`
- `comment`
- `created_at`

## 8. Row Level Security Model

Supabase RLS should be enabled for all sensitive tables.

### Public Read Access

Allow anonymous users to read:

- Published turfs.
- Public turf images.
- Public slot availability for published turfs.
- Public business profile data.

### Customer Access

Authenticated customers can:

- Create bookings for themselves.
- Read their own bookings.
- Read their own payments.
- Read their own receipts.
- Update limited profile information.

Customers cannot:

- Manage turf data.
- Read other customers' bookings.
- Read business payment account details.
- Modify booking payment status directly.

### Owner, Staff, and Business Admin Access

Authenticated owner, staff, and business admin users can access business operations based on their role.

Owner can:

- Manage business settings.
- Create and update turfs.
- Manage slots.
- Manage pricing rules.
- Read all bookings.
- Read payment records.
- Verify receipts.
- Read analytics.
- Manage staff permissions in a future phase.

Staff can:

- Read assigned operational data.
- Verify receipts.
- Manage bookings or slots if permitted.

Business admins can:

- Access broader business settings and reports if the role is enabled.

No business user should be able to modify payment success directly without verified gateway confirmation.

## 9. Key Workflows

### Public Turf Discovery

```text
Visitor opens home page
   |
   v
Frontend loads published turfs from Supabase
   |
   v
Visitor clicks view more or opens a listed turf
   |
   v
Visitor opens turf details
   |
   v
Frontend loads public slot availability
```

### Customer Booking and Payment

```text
Customer selects available slot
   |
   v
Customer logs in or registers
   |
   v
Backend creates pending booking and holds slot
   |
   v
Backend initiates bKash payment for the business merchant account
   |
   v
Customer completes bKash payment
   |
   v
bKash confirms payment to backend
   |
   v
Backend verifies payment status
   |
   v
Booking becomes confirmed
   |
   v
Receipt is generated
```

### Failed or Expired Payment

```text
Pending booking created
   |
   v
Payment fails or expires
   |
   v
Booking marked failed/expired
   |
   v
Slot becomes available again
```

### Receipt Verification

```text
Owner or staff opens verification page
   |
   v
Owner or staff scans QR code or enters verification code
   |
   v
Backend checks receipt, booking, and payment
   |
   v
System returns verification result
   |
   v
Verification log is saved
```

## 10. API and Function Boundaries

Public frontend calls can read:

- Published turf list.
- Turf details.
- Public slot availability.
- Public images.
- Public business profile.

Authenticated frontend calls can:

- Read current user profile.
- Create checkout request.
- View customer booking history.
- View owner or staff dashboard data when authorized.

Protected backend functions should handle:

- Booking hold creation.
- bKash payment initiation.
- bKash callback verification.
- Booking confirmation.
- Payment expiration.
- Receipt generation.
- Receipt verification.
- Analytics aggregation.

## 11. Concurrency and Double Booking Protection

The system must prevent two customers from booking the same slot.

Recommended protections:

- Use database transactions for booking creation.
- Use a unique constraint or exclusion rule to prevent overlapping confirmed or pending slots.
- Mark the slot as `pending_payment` immediately when checkout starts.
- Set an `expires_at` timestamp on pending bookings.
- Run a scheduled cleanup to expire unpaid bookings and release slots.
- Confirm booking only after verified bKash payment success.

## 12. Security Considerations

Important security rules:

- Do not expose bKash merchant credentials to the frontend.
- Do not trust payment success from the browser.
- Verify bKash payment status on the backend before confirming a booking.
- Use Supabase RLS for customer, owner, staff, and business admin data boundaries.
- Store receipt verification codes securely.
- Keep audit logs for receipt verification and payment callbacks.
- Use server-side checks for owner and staff access to bookings, receipts, and analytics.

## 13. Analytics Architecture

For the MVP, analytics can be calculated directly from PostgreSQL queries and views.

Recommended analytics sources:

- `bookings`
- `payments`
- `slots`
- `turfs`
- `receipts`

Possible database views:

- `business_revenue_summary`
- `business_booking_summary`
- `business_slot_occupancy`
- `business_payment_success_rate`
- `business_popular_slots`

As usage grows, analytics can be moved to cached tables or scheduled jobs.

## 14. Storage Architecture

Supabase Storage can hold:

- Turf photos.
- Optional business documents.
- Optional generated receipt assets.

Recommended buckets:

- `turf-images`
- `business-documents`
- `receipt-assets`

Public access should be allowed only for safe turf marketing images. Sensitive business documents and receipts should require authenticated access.

## 15. Notification Architecture

Notifications can be added after the MVP.

Useful notifications:

- Booking confirmation.
- Payment success.
- Payment failure.
- Booking cancellation.
- Receipt issued.
- Owner or staff booking alert.

Possible channels:

- Email.
- SMS.
- WhatsApp.
- In-app notifications.

## 16. Deployment Architecture

Recommended deployment structure per turf business:

- One frontend web app deployment.
- One Supabase project or isolated Supabase schema/database configuration.
- One configured business profile and brand setup.
- One bKash merchant account integration.
- Supabase Edge Functions or framework backend routes for bKash integration.
- Environment variables for Supabase and bKash configuration.

Required environment variables may include:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BKASH_BASE_URL`
- `BKASH_APP_KEY`
- `BKASH_APP_SECRET`
- `BKASH_USERNAME`
- `BKASH_PASSWORD`
- `BKASH_CALLBACK_URL`

Service role keys and bKash secrets must only be available in trusted backend environments.

## 17. MVP Architecture Scope

The MVP should include:

- Public home page with turf discovery.
- Public turf listing for the business.
- Public turf details and slot availability.
- Supabase Auth for customer, owner, and staff login.
- Owner dashboard.
- Turf management.
- Slot management.
- Dynamic pricing.
- Customer checkout.
- bKash payment integration.
- Booking confirmation.
- Receipt generation.
- Receipt verification.
- Customer booking history.
- Owner and staff booking list.
- Basic business analytics.

## 18. Future Architecture Extensions

Future versions can add:

- Reviews and ratings.
- Map-based turf discovery.
- Promo codes.
- Split payment between players.
- Staff role permissions.
- Multi-branch support for the same business.
- Automated refunds.
- Mobile app.
- Multi-language support for Bangla and English.
- Advanced analytics and reporting.
- Business dispute management.
