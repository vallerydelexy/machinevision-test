
# Rizki Aprita

test for frontend position at Machine Vision
>this readme document assumes you are developer.

## Tech stack
|function| name | why|
|---|---|---|
|build tools|vite|because its easy-to-use environment that doesn't require long builds to get started with a project|
|backend|https://dummyapi.io/| mentioned on the pdf|
|frontend library|react| because i like react more than vue |
|css framework|tailwind|because its quicker to write and maintain than traditional css (in my opinion)|
|state management|recoil|to send and receive data across multiple component of the app, also Recoil doesnt unnecessary re-renders the app, which happens while using the Context API or Redux|
|routing|Generouted for React Router| because i like filesystem-based routing, like the one in nextjs, it makes so much sense|

## Prerequisites
- `node` should be installed (recommended version `18.13.0` or higher.)
- `npm` and `pnpm` should be installed.
- `git` should be installed (recommended v2.4.11 or higher)

## Getting Started
### 1. clone this repo
```bash
clone this-repo
```
### 2. create an create an `.env` file
```bash
cd folder
touch .env
```


### 3. put your `app-id` as environment variable
```bash
VITE_APP_ID=<some-random-character>
```
>you can generate your own `app-id` from [here](https://dummyapi.io/account)

### 4. install the modules
```bash
pnpm install
```

## Available scripts
`pnpm dev`

Runs the app in development mode.
Open https://localhost:3000 to view it in the browser.

`pnpm build`

Builds the app for production to the dist folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.