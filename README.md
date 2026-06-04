# DUBIDA - Web & Mobile Data Reporting System

This project consists of a mobile application for data reporting and a web application for data analysis, both powered by Firebase.

## Architecture Overview

- **/mobile**: React Native application for users to report data.
- **/web**: React application for administrators/analysts to view and analyze data.
- **/firebase**: Firebase configuration, security rules, and functions.
- **/shared**: Shared logic, constants, and type definitions (useful for keeping data models consistent).

## Tech Stack

- **Mobile**: React Native
- **Web**: React.js, Chart.js/Recharts (for analysis)
- **Backend/Database**: Firebase (Firestore, Authentication)

## Getting Started

1. Set up a project in the [Firebase Console](https://console.firebase.google.com/).
2. Add your Firebase config to `mobile/src/firebaseConfig.js` and `web/src/firebaseConfig.js`.
3. Deploy Firestore rules from the `/firebase` directory.
