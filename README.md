# ReactJS-Firebase (Messaging System) -- Note this is still Under Development

This is a starter template for react app developer

**Languages, libraries, and frameworks:** JavaScript (works for ES6 too), TailwindCSS and ReactJS
**Database:** Cloud Firestore (Google)

## Prerequsition

-[Node.js](https://nodejs.org/en/download/)
-npm [Node pacakage manager](https://www.npmjs.com/)
-[Create Firebase app](https://www.youtube.com/watch?v=6juww5Lmvgo)

## Demo

The app will start from the SignIn screen and once the user create new account or signIn then it show the messaging system.

![]()

## Usage

1. Clone this repo

   ```bash
   git clone https://github.com/Salweyar/Messaging-system.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```
   
3. Create .env file in project root directory and Add the code (get the data from firebase console)

   ```bash
   REACT_APP_API_KEY=
   REACT_APP_AUTH_DOMAIN=
   REACT_APP_PROJECT_ID=
   REACT_APP_STORAGE_BUCKET=
   REACT_APP_MESSAGING_SENDER_ID=
   REACT_APP_APP_ID=
   REACT_APP_MEASUREMENT_ID=
   REACT_APP_CONFIRMATION_EMAIL_REDIRECT=http://localhost:3000 (Make sure you change this link to you domain when deploying you app to production)
   ```
4. start the development server

   ```bash
   npm start
   ```
      

