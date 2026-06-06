# Traffic Intelligence & Deployment Support System

Mobile app + supervisor dashboard built on the requested stack:

- **Language:** JavaScript (ES6+)
- **Platform:** React Native via **Expo** (SDK 51)
- **Backend:** **Firebase** (Auth, Cloud Firestore, Storage)

Navigation is handled with React Navigation; charts use `react-native-chart-kit`,
the hotspot map uses `react-native-maps` (native), and forms use `expo-image-picker`.

## Screen → file mapping

| # | Mockup screen | File |
|---|---------------|------|
| 01 | Landing / onboarding | `src/screens/LandingScreen.js` |
| 02 | Login / Create Account | `src/screens/LoginScreen.js` |
| 03 | Officer home dashboard | `src/screens/HomeScreen.js` |
| 04 | Report New Accident – Step 1 | `src/screens/ReportStep1Screen.js` |
| 05 | Report New Accident – Step 2 | `src/screens/ReportStep2Screen.js` |
| 06 | Report Submitted | `src/screens/ReportSubmittedScreen.js` |
| 07 | Supervisor – Overview | `src/screens/DashboardOverviewScreen.js` |
| 08 | Supervisor – Analytics | `src/screens/AnalyticsScreen.js` |
| 09 | Supervisor – Deployment Recommendations | `src/screens/DeploymentScreen.js` |

Screens 07–09 are composed inside `src/screens/SupervisorDashboard.js`, which shows a
sidebar on tablet/web widths (≥900px) and a tab strip on phones — matching the
"WEB DASHBOARD – SUPERVISOR" layout from the mockup.

## Getting started

```bash
npm install
npx expo start          # then press i / a, or scan the QR code
npx expo start --web    # supervisor dashboard works best here
```

## Firebase setup

1. Create a project at <https://console.firebase.google.com>.
2. Enable **Authentication → Email/Password**, **Cloud Firestore**, and **Storage**.
3. Copy your web config into `firebaseConfig.js` (replace the `YOUR_*` placeholders).
4. (Optional) For the native hotspot map, add a Google Maps API key in `app.json`
   under `android.config.googleMaps.apiKey` and the iOS equivalent.

### Suggested Firestore data model

Collection `accidents`:

```
reportId: "ACC-2025-000128"
accidentType: "Collision"
severity: "minor" | "serious" | "fatal"
location: { name, lat, lng }
occurredAt: Timestamp
vehiclesInvolved: number
roadCondition: string
weatherCondition: string
description: string
photos: [downloadURL]
reportedBy / reportedByUid
createdAt: Timestamp
```

### Suggested security rules (starting point)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /accidents/{id} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if false; // reports are immutable from the app
    }
  }
}
```

## Notes & assumptions

- The login screen adds email/password fields (the mockup shows only the two buttons);
  Firebase email/password auth needs them. Toggle to "Create Account" registers a new officer.
- Dashboard charts and the recommendations list are wired to `src/data/mockData.js`.
  Swap these for aggregated Firestore queries (or a Cloud Function) when your data is live.
- `react-native-maps` is native-only; on web the hotspot map falls back to a schematic view,
  so the dashboard still renders in the browser.
- Replace the placeholder weight/risk computations with your AI model's output where noted.
