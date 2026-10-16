# Feather Messenger

Feather is a custom-styled messenger frontend. The authentication screen supports:
- Email + password registration and login
- Email confirmation (depending on Supabase Auth settings)
- Google OAuth login
- Password reset by email
- Phone + SMS code login (requires an SMS provider configured in Supabase)

## Authentication setup (required for real accounts)

The frontend is now connected to the existing Supabase project `Sinchat` (`hdueaohjhlqhxlpehnqt`). The browser uses only the public publishable key; never add a service-role/secret key to this repository. The Supabase project was resumed from an inactive state and may need a short time to become ready.

1. Open https://supabase.com/dashboard and create/select your project.
2. In **Project Settings → API**, copy the **Project URL** and **Publishable key** (older projects may label the public client key as `anon`). These are browser client values; never put a service-role/secret key in frontend code.
3. The project URL and public publishable key are already configured in `index.html`; do not replace them with a service-role/secret key.
4. In **Authentication → URL Configuration**, set the Site URL to `https://gggevego15-ui.github.io/Feather/` and add `https://gggevego15-ui.github.io/Feather/**` to the Redirect URLs list.
5. In **Authentication → Providers**, enable Email. To use Google, configure the Google provider credentials in Supabase and enable it. For phone login, enable Phone and configure a supported SMS provider.
6. For email confirmation, configure the email templates and SMTP settings appropriate for your project. Test with a mailbox you control.

## Deploy

The repository contains a GitHub Actions workflow at `.github/workflows/pages.yml`. In GitHub repository **Settings → Pages**, select **GitHub Actions** as the deployment source if it is not already enabled. The expected project site URL is `https://gggevego15-ui.github.io/Feather/`. Then check the **Actions** tab for the deployment result and open the published URL shown by the workflow. The app includes a web manifest, an SVG icon, and a lightweight service worker for installability/offline shell caching. On desktop/mobile browsers, use the browser's **Install app** / **Add to Home Screen** option when available.

## Security notes

- Never expose a Supabase service-role key or any private OAuth client secret in this frontend.
- Do not disable Row Level Security (RLS) to make a feature appear to work.
- The current milestone authenticates users. It does not yet implement chat storage, realtime messaging, or a protected user directory.
- Google login works only after enabling/configuring Google OAuth in Supabase. SMS login needs an enabled Phone provider and a configured SMS service. These optional providers are not automatically enabled.
- Supabase phone authentication may require billing/configuration for the SMS provider.

## Next milestone

Create the secure database schema and RLS policies for user profiles, unique `@usernames`, conversations, and realtime messages.
