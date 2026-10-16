# Feather Messenger

Telegram-inspired messenger frontend. Authentication UI supports Firebase Email/Password, Google sign-in, and phone number + SMS verification.

## Included
- Responsive dark/glass sign-in and registration screen.
- Email/password account creation and login.
- Google OAuth popup through Firebase Authentication.
- Phone sign-in using SMS verification and reCAPTCHA.
- Basic user profile creation in Firestore.
- GitHub Pages deployment workflow.

## Firebase is required for real accounts
The GitHub repository cannot create a Firebase project or enable authentication providers on your behalf. Until Firebase is configured, the interface explains that real authentication is not connected. Firebase web config is public by design; never put service-account private keys in frontend files.

1. Create a project at https://console.firebase.google.com/ and add a Web app.
2. Copy its config and replace the `PASTE_...` placeholders in `index.html`.
3. In Firebase Authentication → Sign-in method, enable Email/Password and Google; enable Phone if SMS login is desired.
4. In Authentication → Settings → Authorized domains, add your GitHub Pages domain.
5. Create a Firestore database. Before production, configure strict security rules so users can only access their own profile and authorized chat documents. Do not use open rules.

## GitHub Pages
In repository Settings → Pages, select **GitHub Actions** as the build/deployment source. The workflow publishes the repository root.

## Next
Implement unique @usernames, user search, chat creation, realtime messages, unread counters, and delivery/read status in Firestore. These need database security rules and a defined chat schema before release.
