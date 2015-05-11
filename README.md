### What is it?

Reapp is everything you need to build amazing apps with React: a collection of
packages that work together, our UI kit, and a CLI that scaffolds your app and includes
a server and build system.

[![Join the chat at https://gitter.im/reapp/reapp](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/reapp/reapp?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### Installation

Installation is done through npm:

```
npm install -g reapp
```

Generate a new base reapp stack with:

```
reapp new [name]
```

And finally in your app directory, run it on [localhost:3010](http://localhost:3010):

```
reapp run
```

### CLI

The CLI has three main functions: creating new apps, running them, and building them for release.

Note that when you run your app, it will run in development mode by default which is much slower
but easier to debug. Run it in production mode to get a feel for real-world performance.

CLI Usage:
```
Usage: reapp [command]

  new [name]  creates a directory with a new reapp-starter scaffold
  run         runs a reapp application with express/webpack-dev-server
  build       builds a reapp application to a bundle in ./build
  debug       use this for opening issues!
```

The build and run commands take a variety of options to help ease your development, such as:

```
Usage: reapp-run [options]

  -d, --debug          output extra information for debugging
  -p, --port [number]  specify a port [number]
  -h, --host [host]    specify hostname
  -b, --bind [address] specify bind address if different from host
  -e, --env [env]      specify an environment
  -t, --tool [tool]    specify a webpack devtool
```

```
Usage: reapp-build [options]

  -d, --debug  output extra information for debugging
  --no-assets  only build the js
  --no-js      only build the assets
```

### Running & Building

Use `reapp run` to serve your app locally, by default at [localhost:3010](http://localhost:3010).
The `run` command has a few options to help you out:

- `reapp run -d` (debug) to output information on how it's running your app
- `reapp run -e production` (env=production) to run your app in production mode, which is much faster
- `reapp run -t source-map` (tool=source-map) to have full sourcemaps rather than the "eval" style sourcemaps we default to

You also have the same flags available to build commands.

The `build` command is used once you're ready to deploy your app (to either the web or to cordova). For now,
we provide two types of builds:

- `reapp build` by default sets the platform to **web**, for mobile sites.
- `reapp build ios` targets Cordova ios devices.

When you run `reapp build` you'll notice a new `./build` folder where your assets have been copied to.
For example, a `reapp build ios` will build to `./build/ios`. `reapp build` goes to `./build/web`.

It will also copy your assets for you. Here's an example of running `reapp build ios`:

```
./assets/shared/* => ./build/ios
./assets/ios/* => ./build/ios
./assets/ios/index.html => (Webpack inserts CSS/JS references) => ./build/ios/index.html
```

This allows a lot of flexibility. You can share assets between builds, or have
exclusive ones for a platform. Leave an asset in the base `./assets` folder
and it won't be copied at all, but you can still `require()` it within your app.

A good case for shared assets is your Cordova config.xml. Leave it in `./assets/shared`
and it'll output for all your builds.

[See more on custom builds](#custom-builds).

### Structure of your applications

You can see the exact app that's generated through the [reapp-starter repo](https://github.com/reapp/reapp-starter).

```
/app
  /components
  /theme
  app.js
/assets
  /web
    index.html
  /ios
    index.html
  /shared
/config (optional)
```

By default `/app/app.js` is your entry point. Everything in the app folder should be pretty
self-explanatory. `/assets` contains static assets as explained in the [Running & Building](#running-and-building)
section. In general, you'll place your assets into `shared` or the specific platform
subdirectory.

The `/theme` folder is [reapp-ui](https://github.com/reapp/reapp-ui) specific. You can
find docs for it in the repo, but it also should be pretty easy to understand.

If you place a `build.webpack.js` or `run.webpack.js` in your `/config` dir, the reapp CLI
will use these configs when you run `reapp build` or `reapp run`.
To see some example configs, check out the files in the `./config` folder of the
[reapp-pack repo](https://github.com/reapp/reapp-pack).

### Your First App

There are a number of pieces we've included in a reapp. Let's explore a few
of them in order of when you'll encounter them in your codebase. Think of this
as a tour of a reapp app, giving an introduction to packages as we encounter them.

You can check out the [reapp project on Github](https://github.com/reapp) for more info.

You also have an entry point defined as `app/app.js`. This starts your app.
The most important part here is the routing. Lets start there.

#### ./app/app.js

Load all your stuff. From theme to store to actions. Then, you run your routes,
which are done using reapp-routes. This simplifies routing down to the bare minimum.
Note that your routes will automatically look into `./components` to find files,
based on the name you give them.

An example:
```js
routes(require,
  route('home', '/', route('sub')))

  // ./components/Home.jsx
  // ./components/home/Sub.jsx
```

This is the reapp-routes syntax. The key to note here is the `require` that
is passed to the routes function at the top level, which is how it dynamically
requires your components based on the route tree.

#### ./app/theme ([reapp-ui](https://github.com/reapp/reapp-ui) UI Kit)

The next theme we require is the `./app/theme/index.js`. Themes are loaded by calling
`Reapp.theme()` and passing in an object with styles, constants and animations.
You can just use the included iOS theme, but we've included the `./app/theme` folder
as an example of how you can easily customize themes.

For more documentation on themes, [read here](http://reapp.io/docs-themes.html).

#### ./app/components/Home.jsx

This is the first React component in your structure, as defined in your routes.
Notice when we export it, we wrap it with `Reapp`. This helper function will provide
the `this.context` variables that you've set up when you loaded your theme, actions,
and store (if you decide to use all of those). It will also pass props to your Home route,
`this.props.child` and `this.props.viewListProps`. You can see that they correspond
to any children routes, and to properties needed to be on a `<ViewList>` that will handle
those routes.

#### More reading

- [reapp-ui](https://github.com/reapp/reapp-ui)
- [reapp-platform](https://github.com/reapp/reapp-platform)
- [reapp-component](https://github.com/reapp/reapp-component)

### Custom builds

Reapp-pack takes in an object that lets you configure your builds. It provides you with
[default config files](https://github.com/reapp/reapp-pack/tree/master/config), but you
can override them if you need custom Webpack loaders.

The build system generates your Webpack config using [reapp-pack](https://github.com/reapp/reapp-pack).

- `reapp run` looks for: `./config/run.config.js`
- `reapp build` looks for: `./config/build.config.js`
- `reapp build [platform]` looks for: `./config/build.[platform].config.js`

Place a config in your `./config/[run/build].[platform].config.js` to override the default.

Here's an example config:

```js
module.exports = {
  entry: './app/app.js',
  devtool: 'none',
  target: 'web',
  env: 'production',
  linkModules: true,
  debug: true,
  separateStylesheet: true,
  minify: true
};
```

You can also provide the following options that are passed to Webpack:

```
  loaders: array
  modulesDirectories: array
  prefetch: array
```

### Why Reapp?

Reapp wasn't built purposefully to be a framework. Instead, it started
as a UI kit. From that kit, two apps were built. While this isn't a lot,
it was enough to see repetition between the two that could be extracted.

From those two apps, over a period of months, we extracted a set of
packages, ensuring to keep each of them completely independent. It was
an experiment in seeing if a framework was necessary.

What we found was this: if you can subscribe to a certain file structure,
you can avoid the framework. With that file structure, we can provide
helpers via a CLI. Bootstrap your app in one command and you have a mature
build system built in, without having to do anything.

Really, Reapp is simple. You could even just use the UI kit and roll your own
app. We just went through that headache, and decided to make it easier to
avoid it if you like how we make apps.

### Example Apps

We have two example apps you can check the source to:

 - [Kitchen Sink](https://github.com/reapp/kitchen-sink) ([demo](http://kitchen.reapp.io))
 - [Hacker News Reader](https://github.com/reapp/hacker-news-app) ([demo](http://hn.reapp.io))

### Development Environment

Sublime users, [here's a guide](https://medium.com/@dan_abramov/lint-like-it-s-2015-6987d44c5b48)
for getting syntax highlighting, snippets and linting that works with babel.

### Other reapp packages
- [reapp-kit](https://github.com/reapp/reapp-kit) (Combines Reapp packages together)
- [reapp-routes](https://github.com/reapp/reapp-routes) (Routes generator)
- [reapp-ui](https://github.com/reapp/reapp-ui) (UI Kit)
- [reapp](https://github.com/reapp/reapp-ui) (CLI)
- [reapp-platform](https://github.com/reapp/reapp-platform) (Base utils)
- [reapp-component](https://github.com/reapp/reapp-component) (DI and Factories)
