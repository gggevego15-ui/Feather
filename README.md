# Feather Messenger — Android APK + Windows EXE

Feather is being built as a **native-installable app**, not as a website project. GitHub stores the source and GitHub Actions builds the Android APK and Windows EXE.

## App builds

Open the repository's **Actions → Build Feather apps** workflow. Every relevant push to `main` starts builds, and you can also start it manually with **Run workflow**.

When both jobs finish:
1. Open the successful workflow run.
2. Scroll to **Artifacts**.
3. Download `Feather-Android-APK` to get the Android debug APK.
4. Download `Feather-Windows` to get the Windows installer and portable EXE.

The artifacts are temporary (kept for 14 days); download them from the workflow run. These are CI builds, not signed store releases.

## Stack

- **Android:** Capacitor 8; the workflow generates the Android project and builds `app-debug.apk`.
- **Windows:** Electron 44; the workflow builds an installer and a portable `.exe`.
- **Backend:** Supabase Auth + Postgres.
- **Profiles:** unique case-insensitive `@username`, display name, and profile editing.

## Supabase

The app uses the existing Supabase project `Sinchat` (project ref `hdueaohjhlqhxlpehnqt`) and only its public publishable key in the client. Never add a Supabase service-role/secret key to the repository.

For email confirmations and password recovery, Supabase redirects to:
`https://gggevego15-ui.github.io/Feather/`

Configure this URL in **Supabase → Authentication → URL Configuration** as Site URL and add it to Redirect URLs. Email/password is the main sign-in path. Google OAuth and SMS login need their providers configured separately.

## Profiles and username rules

- Username is 3–24 characters: lowercase English letters, digits, and underscores.
- Usernames are unique regardless of letter case.
- Supabase creates a profile automatically when an auth user is created.
- Profile row-level security is enabled; users can edit only their own profile.

## Current scope

The current build contains registration/login and editable profiles. Private conversations, user search UI, realtime messaging, and a signed Android release are later milestones. A debug APK can be installed for testing after downloading the workflow artifact.
