# Feather Messenger — Android APK + Windows EXE

**This project is an installable app, not a website.** GitHub stores the source and GitHub Actions builds the Android APK and Windows EXE.

## Download the app builds

Open **Actions → Build Feather apps**: https://github.com/gggevego15-ui/Feather/actions/workflows/build-apps.yml

When the workflow finishes successfully:
1. Open the latest run.
2. Find the **Artifacts** section.
3. Download `Feather-Android-APK` for Android.
4. Download `Feather-Windows` for the Windows installer and portable EXE.

Artifacts are kept for 14 days. These are testing builds; the Android APK is a debug build, not a Play Store-signed release.

## Build setup

- **Android:** Capacitor 8; GitHub Actions generates the Android project and builds `app-debug.apk`.
- **Windows:** Electron 44; GitHub Actions creates an installer and a portable `.exe`.
- **Backend:** Supabase Auth + Postgres.
- **Profiles:** unique case-insensitive `@username`, display name, profile editing, and username search.
- **Private chats:** one-to-one messages stored in Supabase, protected by row-level security, with live updates through Supabase Realtime.
- **Themes:** Aurora, Ocean, and Paper; the selection is saved on the device.
- **Buttons and animations:** the build script scans image assets in the repository and generates an asset manifest. Matching button/GIF/APNG assets are applied when available; the chat UI also includes hover, pop-in, and send-button animations.

## Required Supabase redirect setting

The app returns from email confirmation, password recovery, and supported OAuth flows through the app deep link `feather://auth`.

In **Supabase → Authentication → URL Configuration → Redirect URLs**, add this exact entry:

`feather://auth`

This is a one-time service setting; no code editing is required. The client uses only the public publishable key. Never put a Supabase service-role/secret key into this repository.

## Profile and username rules

- Username: 3–24 characters, lowercase English letters, digits, and underscores.
- Usernames are unique regardless of letter case.
- Supabase creates a profile automatically when an account is created.
- Row Level Security is enabled; users can edit only their own profile.

## Current scope

The app includes email/password registration and login, editable profiles, search by `@username`, one-to-one chats, message history, realtime incoming messages, three themes, and Android/Windows build workflows. The Android APK produced by CI is a debug APK; signed release builds and app-store publishing remain separate release tasks.
