# Stock Picker

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faryanvichare%2Fstocks)

Demo web app using Next.js, React Server Components, and Streaming "server-rendered" stock price data from Polygon.io API. Original inspiration from @rauchg's tweet - https://x.com/rauchg/status/1809389050568298625

This project uses the brand new shadcn/ui charts library - https://ui.shadcn.com/charts.

<img width="1718" alt="Screenshot 2024-07-06 at 3 23 43 AM" src="https://github.com/aryanvichare/stocks/assets/34843135/e106c427-90eb-4826-9fda-36b99d667175">

<img width="1050" alt="Screenshot 2024-07-06 at 3 24 26 AM" src="https://github.com/aryanvichare/stocks/assets/34843135/627391ef-5c54-4e54-9b3a-1371be31e690">

# Features

- Built with Next.js App Router, Typescript, TailwindCSS, and Shadcn/UI (and latest charting components)
- Uses React Server Components and Streaming "server-rendered" stock price data from Polygon.io API

# Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/aryanvichare/stocks.git
   ```

2. Move to the cloned directory

   ```bash
   cd stocks
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy the .env.example to your .env.local

   ```bash
   cp .env.example .env.local
   ```

5. Get your API Key from [Polygon.io](https://polygon.io/) and paste it into your .env.local

6. Run the development server:

   ```bash
   npm run dev
   ```
