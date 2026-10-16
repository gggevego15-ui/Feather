# Feather Messenger

Feather is a custom-styled messenger frontend. The authentication screen supports:
- Email + password registration and login
- Email confirmation (depending on Supabase Auth settings)
- Google OAuth login
- Password reset by email
- Phone + SMS code login (requires an SMS provider configured in Supabase)

## Authentication setup (required for real accounts)

The UI is committed, but this repository does not yet have the owner's Supabase project credentials. Without them, authentication deliberately shows a setup message instead of pretending that sign-in worked.

1. Open https://supabase.com/dashboard and create/select your project.
2. In **Project Settings → API**, copy the **Project URL** and **Publishable key** (older projects may label the public client key as `anon`). These are browser client values; never put a service-role/secret key in frontend code.
3. In `index.html`, replace:
   - `PASTE_SUPABASE_PROJECT_URL` with your project URL, e.g. `https://your-project-id.supabase.co`
   - `PASTE_SUPABASE_PUBLISHABLE_KEY` with your publishable/anon key.
4. In **Authentication → URL Configuration**, set the Site URL to your published GitHub Pages URL and add that same URL to the Redirect URLs list.
5. In **Authentication → Providers**, enable Email. To use Google, configure the Google provider credentials in Supabase and enable it. For phone login, enable Phone and configure a supported SMS provider.
6. For email confirmation, configure the email templates and SMTP settings appropriate for your project. Test with a mailbox you control.

## Deploy

The repository contains a GitHub Actions workflow at `.github/workflows/pages.yml`. In GitHub repository **Settings → Pages**, select **GitHub Actions** as the deployment source. Check the **Actions** tab for the deployment result and open the published URL shown by the workflow.

## Security notes

- Never expose a Supabase service-role key or any private OAuth client secret in this frontend.
- Do not disable Row Level Security (RLS) to make a feature appear to work.
- The current milestone authenticates users. It does not yet implement chat storage, realtime messaging, or a protected user directory.
- Supabase phone authentication may require billing/configuration for the SMS provider.

## Next milestone

Create the secure database schema and RLS policies for user profiles, unique `@usernames`, conversations, and realtime messages.
