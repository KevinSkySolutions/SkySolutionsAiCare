Sky Solutions - AiCare - Monitoring Portal

**Note:** Node v6+ is required for this project.

[yarn](https://code.facebook.com/posts/1840075619545360) is being used to to manage dependencies. To begin using yarn, install globally with `npm install -g yarn`.

For running the mockserver and the application , do below in separate terminal. 

Below will run the mock server on port 8080.
```
git clone <repo.git>
cd <one level in>
cd mockserver
npm install
npm run json:server
```

Below will run the application server on port 8080.
```
`npm install -g yarn`
git clone <repo.git>
cd <one level in>
yarn
```


To build the dev environment with hot reloading of JS and CSS, type:

`npm run browser`

By default, the site is available at http://localhost:8080

Few of the packages in this project:

- React
- Redux (state management)
- React Router (routing)
- React-Redux (connectiong React, Redux)
- webpack (bundling assets and preprcessing)
- Stylelint and eslint (modified AirBnB)
- Babel (latest JS)
- RxJs (for async tasks)

#### No Gulp or Grunt
This project uses npm scripts to run the few tasks needed to build and serve the app. The scripts are located in `package.json`. If you need to add some task to these scripts, look for documentation on either the CLI or Node API for the tool you are considering.
