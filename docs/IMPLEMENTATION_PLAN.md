# Turfy Implementation Plan

This plan describes how to implement Turfy as a dedicated single-business football turf booking web app, with tests for each major feature.

## 1. Recommended Stack

Recommended application stack:

- **Frontend**: Next.js with TypeScript
- **Styling**: Tailwind CSS or a component system built on Tailwind
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Authorization**: Supabase Row Level Security
- **Storage**: Supabase Storage
- **Backend operations**: Next.js server routes and/or Supabase Edge Functions
- **Payments**: bKash payment API
- **Unit tests**: Vitest
- **Component tests**: React Testing Library
- **End-to-end tests**: Playwright
- **Database tests**: Supabase local development, SQL migration checks, and RLS policy tests

## 2. Delivery Strategy

Build the app in small, testable milestones:

1. Project setup and quality gates
2. Supabase schema, auth, and RLS
3. Public home page and turf discovery
4. Turf details and slot availability
5. Customer auth during checkout
6. Owner and staff dashboard foundation
7. Turf management
8. Slot management and dynamic pricing
9. Booking hold and double-booking protection
10. bKash payment integration
11. Receipt generation and verification
12. Customer booking history
13. Owner booking management
14. Business analytics
15. Notifications and operational hardening
16. Production deployment

Each milestone should ship with automated tests before moving to the next milestone.

## 3. Phase 1: Project Setup

### Implementation

- Initialize the web app.
- Configure TypeScript.
- Configure ESLint and formatting.
- Add environment variable validation.
- Add base folder structure.
- Add shared constants for roles, booking statuses, payment statuses, and receipt statuses.
- Add CI script placeholders for linting, type checking, unit tests, and E2E tests.

Suggested structure:

```text
src/
  app/
  components/
  features/
  lib/
  server/
  styles/
  types/
supabase/
  migrations/
  seed.sql
tests/
  e2e/
```

### Tests

Run:

```bash
npm run lint
npm run typecheck
npm run test
```

Test coverage:

- Environment validation fails when required variables are missing.
- Status constants match documented booking, payment, and receipt states.
- Project builds without TypeScript errors.

## 4. Phase 2: Supabase Schema, Auth, and RLS

### Implementation

- Create Supabase migrations for:
  - `profiles`
  - `business_profile`
  - `turfs`
  - `turf_images`
  - `slots`
  - `pricing_rules`
  - `bookings`
  - `payments`
  - `business_payment_account`
  - `receipts`
  - `receipt_verifications`
  - `reviews`
- Add enums or check constraints for roles and statuses.
- Add foreign keys and indexes.
- Enable RLS on sensitive tables.
- Add public read policies for published turfs, turf images, public slots, and business profile.
- Add customer policies for own bookings, payments, and receipts.
- Add owner/staff policies for business operations.
- Add seed data for local development.

### Tests

Run:

```bash
supabase db reset
npm run test:db
npm run typecheck
```

Test coverage:

- Migrations apply from a clean database.
- Seed data loads successfully.
- Anonymous users can read published turfs and public slots.
- Anonymous users cannot create bookings.
- Customers can read only their own bookings.
- Customers cannot update payment success.
- Owner can manage turf, slot, and pricing data.
- Staff can access only the operations allowed by policy.
- Business payment account secrets are not readable by frontend clients.

## 5. Phase 3: Public Home Page and Turf Discovery

### Implementation

- Build the home page as both landing page and turf discovery page.
- Show business branding, turf photos, location, area, city, facilities, opening hours, starting price, and availability summary.
- Show an available turf list directly on the home page.
- Add a clear view more option that opens the full turf listing page.
- Add quick actions to view slots and turf details.
- Keep browsing public without login.

### Tests

Run:

```bash
npm run test
npm run test:e2e
```

Test coverage:

- Home page renders business information.
- Available published turfs appear for anonymous visitors.
- Unpublished turfs do not appear.
- View more opens the full turf listing page.
- Visitor can open a turf details page without login.
- Page has no login requirement for browsing.

## 6. Phase 4: Turf Details and Slot Availability

### Implementation

- Build turf details page.
- Show photos, location, map data, rules, facilities, opening hours, and pricing summary.
- Show date-based slot calendar.
- Show available, booked, pending payment, and unavailable slots.
- Allow customer to select an available slot and continue to checkout.

### Tests

Run:

```bash
npm run test
npm run test:e2e
```

Test coverage:

- Turf details render from Supabase data.
- Available slots are selectable.
- Booked slots are visible but not selectable.
- Pending payment slots are visible but not selectable.
- Unavailable slots are visible but not selectable.
- Anonymous visitor can view slots.
- Anonymous visitor is redirected to login only after starting checkout.

## 7. Phase 5: Customer Auth During Checkout

### Implementation

- Add customer registration and login.
- Preserve selected slot through login.
- After successful login, return customer to checkout.
- Create or update customer profile after auth.

### Tests

Run:

```bash
npm run test
npm run test:e2e
```

Test coverage:

- Anonymous customer can browse turfs.
- Anonymous customer selecting checkout is sent to login/register.
- Selected slot remains selected after login.
- Authenticated customer can continue checkout.
- Customer profile is created when needed.
- Customer cannot access owner routes.

## 8. Phase 6: Owner and Staff Dashboard Foundation

### Implementation

- Add owner dashboard shell.
- Add staff dashboard permissions model.
- Add protected dashboard routes.
- Add navigation for turf management, slots, pricing, bookings, receipts, payments, and analytics.
- Add business profile display.

### Tests

Run:

```bash
npm run test
npm run test:e2e
```

Test coverage:

- Owner can access owner dashboard.
- Staff can access permitted dashboard pages.
- Customer cannot access owner or staff dashboard.
- Anonymous user cannot access dashboard.
- Navigation renders based on role.

## 9. Phase 7: Turf Management

### Implementation

- Build create, edit, publish, unpublish, and delete/disable turf flows.
- Add image upload through Supabase Storage.
- Add facility management.
- Add address, area, city, and map coordinate fields.
- Add opening and closing hours.

### Tests

Run:

```bash
npm run test
npm run test:e2e
npm run test:db
```

Test coverage:

- Owner can create a turf.
- Owner can edit turf details.
- Owner can publish and unpublish a turf.
- Unpublished turf is hidden from public pages.
- Public user can read published turf only.
- Image upload stores file path correctly.
- Invalid turf form data shows validation errors.

## 10. Phase 8: Slot Management and Dynamic Pricing

### Implementation

- Add slot generation by date range and opening hours.
- Add manual slot blocking.
- Add pricing rules:
  - Time of day
  - Weekend
  - Specific date
  - Manual override
- Implement final price calculation with documented priority.
- Show final price in public availability and checkout.

### Tests

Run:

```bash
npm run test
npm run test:db
npm run test:e2e
```

Test coverage:

- Slot generation creates correct time ranges.
- Owner can block and unblock slots.
- Manual override beats all other pricing rules.
- Specific date price beats weekend and time-of-day pricing.
- Weekend price beats time-of-day pricing.
- Default turf price is used when no pricing rule applies.
- Public slot price matches final calculated price.
- Invalid overlapping slot generation is rejected.

## 11. Phase 9: Booking Hold and Double-Booking Protection

### Implementation

- Add checkout booking hold endpoint.
- Create `pending_payment` booking.
- Mark selected slot as `pending_payment`.
- Add `expires_at` for unpaid bookings.
- Add transaction-based booking creation.
- Add database constraint or locking strategy to prevent duplicate pending/confirmed bookings.
- Add scheduled cleanup for expired bookings.

### Tests

Run:

```bash
npm run test
npm run test:db
npm run test:e2e
```

Test coverage:

- Authenticated customer can create a pending booking.
- Slot becomes pending payment after checkout starts.
- Second customer cannot book the same pending slot.
- Second customer cannot book the same confirmed slot.
- Expired pending booking releases the slot.
- Booking hold fails cleanly when slot is unavailable.
- Database constraint prevents duplicate booking even under concurrent requests.

## 12. Phase 10: bKash Payment Integration

### Implementation

- Add business bKash merchant settings.
- Store merchant metadata safely.
- Keep bKash secrets only in trusted backend environment.
- Add payment initiation endpoint.
- Add bKash callback/webhook handler.
- Verify payment status server-side.
- Mark payment successful only after verified bKash response.
- Mark booking confirmed after successful payment.
- Release slot on failed or expired payment.

### Tests

Run:

```bash
npm run test
npm run test:integration
npm run test:e2e
```

Test coverage:

- Payment initiation creates a payment record.
- bKash credentials are never sent to the browser.
- Successful mocked bKash callback marks payment successful.
- Successful payment confirms booking.
- Failed mocked bKash callback marks payment failed.
- Failed payment releases slot.
- Browser-side success response cannot confirm a booking without backend verification.
- Duplicate callback does not create duplicate confirmation.

## 13. Phase 11: Receipt Generation and Verification

### Implementation

- Generate receipt after confirmed payment.
- Add receipt number and verification code.
- Add QR code payload.
- Build customer receipt page.
- Build owner/staff receipt verification page.
- Store verification logs.

### Tests

Run:

```bash
npm run test
npm run test:e2e
npm run test:db
```

Test coverage:

- Receipt is generated only after successful payment.
- Receipt contains booking, turf, customer, payment, amount, and transaction data.
- Customer can view their own receipt.
- Customer cannot view another customer's private receipt unless receipt policy allows public code access.
- Owner or staff can verify a valid receipt.
- Invalid receipt code returns invalid result.
- Cancelled, expired, or refunded receipt shows correct status.
- Verification log is saved.

## 14. Phase 12: Customer Booking History

### Implementation

- Build customer booking dashboard.
- Show upcoming, past, cancelled, expired, and refunded bookings.
- Link each confirmed booking to receipt.
- Show payment status.

### Tests

Run:

```bash
npm run test
npm run test:e2e
npm run test:db
```

Test coverage:

- Customer sees their own bookings.
- Customer does not see other customers' bookings.
- Booking filters work by status.
- Receipt link appears for confirmed bookings.
- Payment status is displayed correctly.

## 15. Phase 13: Owner Booking Management

### Implementation

- Build owner/staff booking list.
- Add filtering by date, turf, slot, customer, payment status, and booking status.
- Add booking detail view.
- Add cancellation handling based on business policy.
- Add manual booking notes if needed.

### Tests

Run:

```bash
npm run test
npm run test:e2e
npm run test:db
```

Test coverage:

- Owner can see all business bookings.
- Staff can see bookings if permitted.
- Customer cannot access owner booking list.
- Filters return correct booking records.
- Cancellation updates booking status correctly.
- Cancelled booking affects slot availability according to business rules.

## 16. Phase 14: Business Analytics

### Implementation

- Add SQL views or server queries for:
  - Revenue summary
  - Booking summary
  - Slot occupancy
  - Payment success rate
  - Popular slots
  - Revenue by turf
- Build analytics dashboard.
- Add date range filters.

### Tests

Run:

```bash
npm run test
npm run test:db
npm run test:e2e
```

Test coverage:

- Revenue excludes failed, expired, and refunded payments.
- Booking count matches confirmed bookings.
- Occupancy rate is calculated correctly.
- Popular slots are ordered correctly.
- Date filters produce correct results.
- Owner can view analytics.
- Customer cannot view analytics.

## 17. Phase 15: Notifications and Operational Hardening

### Implementation

- Add email, SMS, WhatsApp, or in-app notification integration if selected.
- Notify customer after booking confirmation.
- Notify owner/staff after new booking.
- Add audit logs for payment callbacks and receipt verification.
- Add error monitoring.
- Add loading, empty, and error states.

### Tests

Run:

```bash
npm run test
npm run test:integration
npm run test:e2e
```

Test coverage:

- Booking confirmation notification is queued or sent.
- Owner/staff booking alert is queued or sent.
- Notification failure does not break confirmed booking.
- Payment callback logs are stored.
- Receipt verification logs are stored.
- UI shows clear empty and error states.

## 18. Phase 16: Production Deployment

### Implementation

- Configure production Supabase project.
- Apply production migrations.
- Configure production environment variables.
- Configure bKash production credentials.
- Configure domain and SSL.
- Seed business profile.
- Seed first owner account.
- Add backup and restore process.
- Add deployment checklist.

### Tests

Run:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:integration
npm run test:e2e
npm run build
```

Production smoke tests:

- Public home page loads.
- Published turf appears.
- Public slot availability loads.
- Customer can register/login.
- Owner can login.
- Owner can create or edit a turf.
- Customer can start booking.
- Payment sandbox or production verification works.
- Receipt is generated after successful payment.
- Owner/staff can verify receipt.
- Customer cannot access owner dashboard.

## 19. Testing Commands

Suggested package scripts:

```json
{
  "scripts": {
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:db": "vitest run tests/db",
    "test:integration": "vitest run tests/integration",
    "test:e2e": "playwright test",
    "build": "next build"
  }
}
```

## 20. Minimum Release Criteria

Do not release the MVP until:

- Public browsing works without login.
- Checkout requires login.
- Owner/staff routes are protected.
- RLS policies are tested.
- Double booking is blocked at the database or transaction level.
- bKash payment success is verified server-side.
- Receipt generation works only after successful payment.
- Receipt verification works for owner/staff.
- Customer booking history is private.
- Owner analytics excludes failed and expired payments.
- Full lint, typecheck, unit, integration, database, E2E, and production build checks pass.
