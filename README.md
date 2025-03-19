# Node-JS_Portf

1. ``API-Jewelry``
2. ``Twilio-Server``

## Twilio Server

### Overview

This project is a Twilio-based IVR (Interactive Voice Response) system that allows users to call a phone number, select a department (Sales or Support), and get redirected to the appropriate phone number. The backend is built with Express.js, and the application is containerized using Docker & Docker Compose.

### Features

* Receives incoming calls and presents an IVR menu.

* Supports digit-based selection (1 for Sales, 2 for Support).

* Fetches department phone numbers dynamically from an API.

* Redirects the call to the correct department.

* Provides an API to fetch Twilio call logs.

### Installation

#### Prerequisites

* Node.js 22
* Docker & Docker Compose
* Twilio Account & Credentials
* A backend API to provide forwarding numbers
* Environment Variables

Create a .env file and add the following values:

```env
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
BACK_URL=your_backend_api_url
AUTH_TOKEN=your_auth_token
```

#### Running Locally

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run start
```

### API Endpoints

1. IVR Selection (POST /handle-selection)

``Description``: Handles the user selection and redirects the call.

``Request Body``:

```json
{
  "Digits": "1" // or "2"
}

```

``Response``: Redirects the call to the fetched number.

2. Call Logs (GET /api/call-logs)

``Description``: Fetches Twilio call logs.

``Query Parameters``:

* limit (default: 20)
* page (default: 0)
* status (optional)
* to (optional)
* from (optional)
* startTime (optional)
* endTime (optional)

``Response``:

```json
{
  "success": true,
  "data": [...],
  "count": 10,
  "page": 0,
  "limit": 20
}
```
