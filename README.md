# Hoomle Webapp

## Architecture

This project uses the original [Flux](facebook.github.io/flux/) architecture utilizing a unidirectional data flow.

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /config/                    # Configuration files for Webpack, Jest etc.
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /actions/               # Action creators that allow to trigger a dispatch to stores
│   ├── /assets/                # Static files which are copied to ./build on compile
│   ├── /components/            # React components
│   ├── /constants/             # Enumerations used in action creators and stores
│   ├── /core/                  # Core components (Flux dispatcher, base classes, utilities)
│   ├── /stores/                # Stores contain the application state and logic
│   ├── /styles/                # Styles
│   ├── /app.js                 # The application's main file (entry point)
├── /test/                      # Unit, integration and load tests
│   ├── /e2e/                   # End-to-end tests
│   ├── /benchmark/             # Load and stress testing
│   └── /unit/                  # Unit tests
│── gulpfile.js                 # Configuration file for automated builds
└── package.json                # The list of 3rd party libraries and utilities
```

### Getting Started

Just [clone](https://github.com/hoomle/hoomle-webapp) the repo and start hacking:

```shell
$ git clone https://github.com/hoomle/hoomle-webapp hoomle-webapp
$ cd hoomle-webapp
$ npm install -g gulp           # Install Gulp task runner globally
$ npm install                   # Install Node.js components listed in ./package.json
```

### How to Build

```shell
$ gulp build                    # or, `gulp build --release`
```

By default, it builds in debug mode. If you need to build in release mode, add
`--release` flag.

### How to Run

```shell
$ gulp                          # or, `gulp --release`
```

This will start a lightweight development server with LiveReload and
synchronized browsing across multiple devices and browsers.

### How to Deploy

```shell
$ gulp deploy                   # or, `gulp deploy --production`
```

You can deploy to different destinations by adding a corresponding flag.
For example `--production` or `--staging` etc. See the 'deploy' task in
`gulpfile.js`.

### How to Update

You can always fetch and merge the recent changes from this repo back into
your own project:

```shell
$ git checkout master
$ git fetch origin
$ git merge origin/master
$ npm install
```

### How to Test

Run unit tests powered by [Jest](https://facebook.github.io/jest/) with the following
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
```
