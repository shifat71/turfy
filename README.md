# Turfy

Turfy is a web application idea for a single football turf business in Bangladesh. Today, many turf bookings are handled manually through phone calls, messages, and owner-maintained notebooks or spreadsheets. Turfy moves that workflow online for one turf owner business at a time, so customers can discover that business's turfs, book open slots, pay through bKash, and receive a verifiable booking receipt.

The app serves two primary user groups:

- **The turf owner/business team**, who manages turf information, pricing, availability, payments, bookings, receipts, and business analytics.
- **Customers**, who search for turfs, view real-time slot availability, book a slot, pay online, and keep a receipt for verification.

Turfy is not planned as a generalized marketplace for all turf businesses. Each turf owner business will get its own separate web app deployment, database configuration, branding, and bKash merchant setup.

## Documentation

- [System Architecture](docs/SYSTEM_ARCHITECTURE.md)
- [Implementation Plan](docs/IMPLEMENTATION_PLAN.md)

## Problem

Football turf hiring is growing in Bangladesh, but the booking experience is still mostly manual. Customers usually need to call the owner to ask:

- Which slots are available?
- What is the price for a specific time?
- Is the turf already booked?
- How should payment be made?
- How can the booking be confirmed?

The owner also faces operational problems:

- Bookings can overlap because availability is tracked manually.
- Pricing changes by time slot are hard to communicate.
- Payment confirmation depends on screenshots or manual checking.
- Receipts are difficult to verify later.
- Revenue, profit, peak hours, and customer history are not automatically tracked.

Turfy aims to solve these problems with a dedicated booking and payment web app for a single turf business.

## Goals

- Let customers book football turf slots without calling the owner.
- Show available and booked slots clearly.
- Support bKash payment for confirmed bookings.
- Allow the turf owner to connect and manage their own bKash merchant account.
- Generate a receipt after every successful booking.
- Let the owner or business staff verify receipts inside the app.
- Save all customer orders and booking history.
- Allow the owner to set different prices for different time slots.
- Provide business analytics for revenue, profit, bookings, popular slots, and performance.

## User Roles

### Customer

Customers use the app to find and book turf slots.

Key customer capabilities:

- Browse available turfs without logging in.
- View turf details such as location, photos, facilities, rules, and pricing without logging in.
- Check available and booked slots without logging in.
- Select a date and time slot.
- Create an account or log in only when placing an order.
- Book a turf directly through the app.
- Pay using bKash.
- Receive a digital receipt after successful payment.
- View previous bookings and receipts.
- Show the receipt to the owner for verification at the turf.

### Owner / Business Staff

The owner and authorized business staff use the dashboard to manage the turf business.

Key owner/staff capabilities:

- Create an owner or staff account and log in.
- Add one or more turf fields, venues, or branches for the same business.
- Update turf details, photos, facilities, rules, and location.
- Enable, disable, or edit turf availability.
- Set slot-based pricing.
- Change prices for peak hours, off-peak hours, weekends, or special dates.
- Connect a bKash merchant account for receiving customer payments.
- View all bookings and customer orders.
- Verify customer receipts.
- Cancel, approve, or manage bookings based on business rules.
- View analytics such as revenue, profit, booking count, popular slots, and occupancy rate.

## Core Features

### Turf Management

The owner can add and manage turf profiles from the owner dashboard. A turf profile may include:

- Turf name
- Address and map location
- Area or city
- Photos
- Turf size
- Available sports
- Facilities such as parking, washroom, changing room, lighting, drinking water, and seating
- Opening and closing hours
- Booking rules
- Cancellation policy
- Contact information

### Public Home Page and Turf Discovery

The home page should work as both a landing page and a turf discovery page. Visitors should immediately understand what Turfy does and be able to browse available turf options without logging in.

The home page should show:

- Available turfs from this business
- Turf name
- Location, area, and city
- Turf photos
- Starting price or price range
- Available sports
- Key facilities
- Opening and closing hours
- Current availability summary
- Rating or review summary if reviews are added later
- Quick action to view slots or open the turf details page
- View more option that opens the full turf listing page

The home page should not use a separate search section in the MVP. Discovery should feel direct: show the available turf list first, then let customers open details or view more turfs.

The home page can also include:

- Popular turf areas in Bangladesh
- Explanation of how booking and bKash payment works
- Call to action for customers to find and book a turf
- A unified "Log in" button in the header. Upon logging in, users are automatically directed to their respective views based on their role (e.g., Customer Dashboard or Owner Dashboard). The public page does not show direct "Dashboard" links for logged-out users.

### Slot Availability

Each turf has bookable slots. Customers can see which slots are available and which are already booked.

Slot information should include:

- Date
- Start time
- End time
- Price
- Availability status
- Booking status
- Payment status

Example slot statuses:

- **Available**: Customer can book this slot.
- **Pending payment**: Slot is temporarily held while payment is being completed.
- **Booked**: Slot is confirmed and unavailable to other customers.
- **Unavailable**: Owner or staff has manually blocked this slot.

### Dynamic Slot Pricing

The owner can set different prices for different slots. This is important because turf prices often vary by time.

Example pricing rules:

- Morning slots: lower price
- Evening slots: higher price
- Weekend slots: higher price
- Special event days: custom price
- Owner-defined or staff-defined manual price override for any specific slot

### Booking Flow

Customer booking flow:

1. Customer browses turfs publicly.
2. Customer opens a turf details page.
3. Customer checks available and booked slots.
4. Customer selects date and available time slot.
5. App shows price and booking summary.
6. Customer logs in or creates an account to continue with the order.
7. Customer confirms booking.
8. App redirects customer to bKash payment.
9. Payment is completed.
10. Booking is confirmed.
11. Customer receives a digital receipt.
12. Owner or staff can see the booking in the dashboard.

### bKash Payment Integration

Turfy should support bKash payments so customers can pay directly when booking a turf.

Payment requirements:

- The owner can connect the business bKash merchant account.
- Customers pay through bKash during booking.
- Booking is confirmed only after successful payment.
- Payment transaction ID is saved.
- Failed or expired payments should release the slot.
- Refund and cancellation behavior should follow the business policy.

### Receipt Generation and Verification

After a successful booking, the app generates a receipt for the customer.

Receipt should include:

- Receipt ID
- Booking ID
- Customer name
- Turf name
- Turf location
- Date
- Start time and end time
- Paid amount
- Payment method
- bKash transaction ID
- Booking status
- QR code or verification code
- Issue time

Owner/staff receipt verification:

- Owner or staff opens the dashboard or verification page.
- Owner or staff scans the QR code or enters the receipt code.
- App checks whether the receipt is valid.
- App shows booking details and payment status.
- App marks the receipt as verified if needed.

### Customer Order History

All customer bookings should be saved. Customers and the turf business should both have access to the relevant booking history.

Customer history:

- Upcoming bookings
- Past bookings
- Cancelled bookings
- Receipts
- Payment status

Business history:

- All orders for each turf
- Customer details
- Slot details
- Payment records
- Receipt verification history
- Cancelled or refunded bookings

### Business Analytics

The owner dashboard should provide useful business analytics.

Possible analytics:

- Total revenue
- Estimated profit
- Number of bookings
- Bookings by day, week, and month
- Most popular slots
- Least booked slots
- Peak booking hours
- Occupancy rate
- Average booking value
- Revenue by turf
- Revenue by slot type
- Cancelled bookings
- Payment success rate

## Suggested Pages

### Public Pages

- Home page with landing content, turf locations, and featured turf information
- Turf listing page
- Turf details page
- Public slot availability view
- Login page
- Registration page

### Customer Pages

- Customer dashboard
- Booking checkout page
- Payment status page
- Receipt page
- Booking history page
- Profile settings page

### Owner Pages

- Owner dashboard
- Turf management page
- Add/edit turf page
- Slot and availability management page
- Pricing management page
- Booking management page
- Receipt verification page
- Payment account settings page
- Analytics page

### Business Admin Pages

An internal business admin or staff role can be added later to manage business-level operations.

Possible business admin capabilities:

- Manage users
- Manage staff accounts
- Review listed turf fields
- Monitor transactions
- Handle booking disputes
- Configure business settings
- View business-wide analytics

## Suggested Data Model

Turfy will use **Supabase** for the database and authentication layer. Supabase can provide PostgreSQL storage, authentication, row-level security policies, file storage for turf images, and server-side functions for protected operations.

The app may need entities like:

- **User**: customer, owner, staff, or business admin account
- **BusinessProfile**: information for the single turf business
- **Turf**: turf details and facilities
- **TurfImage**: photos for each turf
- **Slot**: generated or manually managed bookable time slots
- **PricingRule**: slot-based or date-based pricing configuration
- **Booking**: customer booking record
- **Payment**: bKash transaction and payment status
- **Receipt**: generated proof of booking and payment
- **ReceiptVerification**: owner/staff verification logs
- **Review**: optional customer feedback for turfs

## Technical Foundation

Recommended technical foundation:

- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth for customers, owner, staff, and business admins
- **Authorization**: Supabase Row Level Security policies
- **File storage**: Supabase Storage for turf photos and related media
- **Payment integration**: bKash payment API
- **Receipt verification**: QR code or verification code backed by stored receipt records

Public access rules:

- Anyone can view published turfs.
- Anyone can view public slot availability.
- Customers must log in before placing an order.
- Customers can only view and manage their own bookings.
- Owner and staff accounts can manage turfs, slots, bookings, payments, receipts, and analytics for this business only.
- Business admins can access business-level data based on internal permissions.

## Booking Statuses

Suggested booking statuses:

- `pending_payment`
- `confirmed`
- `cancelled`
- `completed`
- `expired`
- `refunded`

## Payment Statuses

Suggested payment statuses:

- `initiated`
- `successful`
- `failed`
- `expired`
- `refunded`

## Receipt Statuses

Suggested receipt statuses:

- `valid`
- `verified`
- `cancelled`
- `expired`
- `refunded`

## MVP Scope

The first version should focus on the essential booking and business-management workflow.

Recommended MVP features:

- Public turf browsing without login
- Public slot availability without login
- Customer registration and login during order checkout
- Owner/staff registration and login
- Owner dashboard
- Add and update turf information
- Slot availability view
- Slot-based pricing
- Customer booking flow
- bKash payment integration
- Receipt generation
- Receipt verification
- Booking history for customers
- Booking list for the owner and staff
- Basic business analytics

## Future Enhancements

- Turf reviews and ratings
- Map-based turf discovery
- Promo codes and discounts
- Team booking profiles
- Split payment between players
- Staff role permissions
- Multi-branch support for the same turf business
- Refund automation
- SMS and email notifications
- WhatsApp booking confirmation
- Mobile app
- Multi-language support for Bangla and English

## Success Metrics

Turfy can measure success using:

- Number of registered customers
- Number of listed turf fields or branches
- Total successful bookings
- Payment success rate
- Repeat customer rate
- Owner revenue growth
- Slot occupancy rate
- Reduction in manual calls and booking conflicts

## Vision

Turfy should become a reliable dedicated booking system for a single football turf business in Bangladesh. The long-term goal is to make turf discovery, booking, payment, and verification simple for customers while giving the owner better control over operations, revenue, and analytics.
