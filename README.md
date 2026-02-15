# BashBoss Client

Frontend for BashBoss, an event and venue management platform. Users can discover events, view them on a map, book tickets, pay via Stripe, chat with attendees, and manage their bookings.

## Tech Stack

- React 18 + TypeScript
- Vite
- Redux Toolkit with Redux Persist
- React Router v6
- Axios
- Stripe (payments)
- Firebase (real-time chat)
- Mapbox / TomTom (maps and geocoding)
- Google OAuth + Duo 2FA (authentication)
- Google reCAPTCHA

## Features

- Browse and filter events by category, location, and date
- View nearby events on an interactive map using geolocation
- Book event tickets with Stripe checkout
- View, cancel, and share bookings
- Leave reviews on events
- Real-time chat with event attendees
- User profile management
- Password reset via OTP
- Google OAuth and standard login with Duo two-factor authentication
- Session-based auth with 1-hour timeout

## Project Structure

```
src/
  components/    UI and feature components
  pages/         Route-level page components
  hooks/         Custom hooks (API calls, auth)
  store/         Redux slices and store config
  assets/        Static assets
  IEvent.ts      Event type definition
  IVenue.ts      Venue type definition
  dummyData.ts   Sample data
```

## Routes

| Path                | Page                      | Auth Required |
| ------------------- | ------------------------- | ------------- |
| `/`                 | Home                      | No            |
| `/browse-events`    | Browse Events             | No            |
| `/events-near-me`   | Events Near Me (map)      | No            |
| `/event/:eventId`   | Event Details             | No            |
| `/login`            | Login                     | No            |
| `/sign-up`          | Register                  | No            |
| `/password-reset`   | Password Reset            | No            |
| `/user`             | User Profile / Dashboard  | Yes           |
| `/checkout`         | Stripe Checkout           | Yes           |
| `/manage-event`     | Manage Booking            | Yes           |
| `/register-success` | Registration Confirmation | No            |
| `/payment-success`  | Payment Confirmation      | No            |

## Setup

### Prerequisites

- Node.js
- npm

### Install

```sh
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_GOOGLE_CLIENT_ID=
VITE_BASE_API=
VITE_BASE_VAB_API=
VITE_MAIL_API=
VITE_MAPBOX_API_KEY=
VITE_STRIPE_PK=
VITE_STRIPE_SK=
VITE_RECAPTCHA_SITE_KEY=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_MAIN_CLIENT=
```

- `VITE_BASE_API` - Main auth/user API
- `VITE_BASE_VAB_API` - Venue and activities booking API
- `VITE_MAIL_API` - Email service API

### Run

```sh
npm run dev
```

### Build

```sh
npm run build
```

### Preview

```sh
npm run preview
```
