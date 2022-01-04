# Kylin crowdloan

1. Ensure that you have a recent LTS version of Node.js, for development purposes [Node >=10.13.0](https://nodejs.org/en/) is recommended.
2. Ensure that you have a recent version of Yarn, for development purposes [Yarn >=1.10.1](https://yarnpkg.com/docs/install) is required.

To install dependencies run:

```
yarn
```

## For development


start a dev server run:

```
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## For production

If you going to start a crowdloan on polkadot mainnet, make sure to modifile the `.env.production.local` file, 
Edit the 'REACT_APP_RPC_URL=ws://13.231.213.98:9944' to 'REACT_APP_RPC_URL=wss://rpc.polkadot.io',
also change the parachainId `REACT_APP_PARACHAIN_ID=Your_id` 

```
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
