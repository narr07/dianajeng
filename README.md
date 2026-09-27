# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Shared wishes database (Supabase)

The `wishes` table is shared by two sites: this international site and the
Indonesian site. Both read and show **all** wishes, in real time.

To connect another Vercel project, add the Supabase integration to it and pick
the same Supabase project. The site only needs the public URL and anon key.

Rules both sites follow when writing a wish:

| column       | value                                                         |
| ------------ | ------------------------------------------------------------- |
| `name`       | 1–60 characters                                               |
| `message`    | 1–500 characters                                              |
| `attendance` | `yes` (attending), `maybe`, or `no` (can't attend), never free text |
| `site`       | `en` for this site, `id` for the Indonesian site             |
| `likes`      | only ever incremented; guests can't change other columns     |

Each site turns `attendance` into its own label, e.g. `yes` → "Attending" here and
"Hadir" on the Indonesian site.

- New database: run `supabase_schema.sql`.
- Existing database created before sharing: run `supabase_migration_shared_wishes.sql` once.
