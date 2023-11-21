# Sneaker Tanuki
👟 Find your next favorite footwear with this sleek e-commerce marketplace

<a href="https://sneaker-tanuki.vercel.app/" target="_blank">live website</a> 👈 👨🏼‍💻

The repo is build with Next.js, React, Nodejs, Tailwind.

You will be able to:

- Login seamessly with Google, Github and Email all powered by 0Auth 
- Explore and filter your favorite brands of sneakers
- Add products to your cart, input your shipping address powered by Google and proceed to the checkout

Website front-end is hosted on Vercel and small backend is powered by MongoDB

In the repo you will find an .env example file, please get in contact if you need help setting up them, it can be difficult at times to navigate all the different API keys and secrets

## Structure of the Repo

For siplicity purposes, we are interacting with dummy JSON data that can be found in `/public/data`

Since the repo is using Next,js 13 with the `App` directory the project uses Server Actions over regular API calls and minimises the use of Client components when possible

- with different layout the `App` directory has been divided between `(auth)` and `(root)` to divide 0Auth logic and the main web-app
- `api` folder is only used for 0Auth
- api-calls with server actions are organised under `lib/actions` containing separate actions files for each model
- database models are organised under `lib/models`
- on top of tailwind, some additional custom css has been added to `globals.css`

For state management and persistent storage of data when refreshing the app we are using context with a custom localStorage solution

All the different reacts components can be found organized under the `/components` folder

A very simple test has been included using JEST under `__test__` to make sure that the different dependencies are runnign without conflicts

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
