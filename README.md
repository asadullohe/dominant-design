# Dominant Design — landing page

Landing site for Dominant Design, an architecture and design studio in the Fergana region.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl (uz / ru / en) · deployed on Netlify.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the proxy redirects to a locale (`/uz` by default).

Checks before committing:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Where things live

| What | Where |
| --- | --- |
| UI text (buttons, headings, form) | `messages/{uz,ru,en}.json` |
| Projects, services, team, stats, contacts, drawing sheets | `src/content/*.ts` (typed, one value per locale) |
| Project renders | `public/projects/<slug>/1.jpg … n.jpg` (`1.jpg` is the cover) |
| Team portraits (3:4) | `public/team/` |
| Watermarked drawing sheets | `public/drawings/` |
| Sections | `src/components/sections/` |
| Lead endpoint | `src/app/api/lead/route.ts` |

### Adding a project

1. Export renders in one orientation, about 2000 px on the long side, and save them as
   `public/projects/<slug>/1.jpg`, `2.jpg`, …
2. Add an entry to `src/content/projects.ts` with `imageCount`, `size` and a title in all three languages.

### Adding a team member

Save a 3:4 portrait to `public/team/` and add an entry to `src/content/team.ts`.

## Telegram bot (contact form)

The form posts to `/api/lead`, which sends the lead to the **fixed chat(s)** set in `TELEGRAM_CHAT_ID`
(comma-separated for several, e.g. `-1001111111111,-1002222222222`).
The bot token never reaches the browser, and adding the bot to another group cannot redirect leads.

1. In Telegram, open **@BotFather** → `/newbot` → copy the token.
2. Add the bot to the office group (or press **Start** in a private chat with it).
3. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id`
   (group ids look like `-100…`). If the list is empty, post `/start@<bot_username>` in the group and reload.
4. In **@BotFather** → `/setjoingroups` → **Disable**, so nobody can add the bot to other groups.
5. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in Netlify (see below) and redeploy.

To move leads to another chat later, change only `TELEGRAM_CHAT_ID` and redeploy.
With several chats, a lead counts as delivered when at least one chat receives it; failed chats
are logged as `[lead] delivered, but one chat failed` in the Netlify function logs.

Spam protection: a hidden honeypot field and a per-IP limit of 3 requests per minute
(kept in memory per serverless instance).

## Deploy (Netlify)

1. Connect the repository in Netlify. `netlify.toml` already sets the build command, publish directory and Node 22.
2. **Site configuration → Environment variables**: add the variables from `.env.example`.
3. After connecting the custom domain, set `SITE_URL` (for example `https://dominantdesign.uz`) and redeploy,
   so canonical links, the sitemap and Open Graph use it.
