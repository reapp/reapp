*reapp is just launching in alpha. These docs are far from complete and subject to change!*

### What is it?

Reapp isn't a framework, it's just a collection of packages that work
well together. On top of that, it's a CLI that bootstraps and runs your app.

We have another section explaining more of the high level thought
behind Reapp, you can [skip to it now](#why) if you'd like.

### Installation

Installation is done through npm, though you can pick and choose any pieces you'd like
and roll your own stack. To get the reapp CLI:

```
npm install -g reapp
```

Once that's done you can generate a new base reapp stack with:

```
reapp new [name]
```

Where [name] is the name you'd like to give your new stack.

#### What does this give you?

Reapp new is actually a simple wrapper that clones a bare repository that we've set up
to use the various reapp pieces optimally. We are working on having a few different
setups, from simple to advanced, that you can choose from when generating your app.

### CLI

The CLI has two main functions that it helps you with. The first is creating new apps.
For now, it simply makes a bare clone of a repo we keep updated with the current best-practice.
The goal is eventually to have a variety of baseline repo's to choose from.

It also lets you run your app, using [reapp-server](https://github.com/reapp/reapp-server),
a simple express server that works well with the default app structure.

CLI Usage:
```
Usage: reapp [options] [command]

Commands:

  new [name]  creates a directory with a new reapp-starter scaffold
  run         runs a reapp application with express/webpack-dev-server
  build       builds a reapp application to a bundle in ./build
  debug       use this to for opening issues!
  help [cmd]  display help for [cmd]
```

### Running & Building Reapp

The `run` command has a few options to help you out. You can do:

- `reapp run -d` (debug) to output information on how it's running your app
- `reapp run -e production` (env=production) to run your app in production mode, which is much faster
- `reapp run -t source-map` (tool=source-map) to have full sourcemaps rather than the "eval" style sourcemaps we default to

The `build` command is used once you're ready to deploy your app (to either the web or to cordova). For now,
we provide two types of builds:

- `reapp build` targets the web for mobile sites.
- `reapp build ios` targets cordova ios devices.

You also have the same flags available as the run commands, to adjust tools and envs.

When you run `reapp build` you'll notice a new `./build` folder where your assets have been copied to. We're working
on adding more documentation soon on how to get those assets into a Cordova/Phonegap app.

### Structure of your applications

You can see the exact app that's generated through the [reapp-starter repo](https://github.com/reapp/reapp-starter).
Only the `/app/app.js` entrypoint and `/assets/layout.html` is "necessary".
In the future, we could have a config file to make this completely custom.
For now, it's very simple:

```
/app
  /components
  /theme
  app.js
  routes.js
/assets
  layout.html
/config (optional)
```

`/app/app.js` is your entry point. Everything in the app folder should be pretty
self-explanatory. `/assets` contains static assets, with a `layout.html` that is used
to serve your app within. In general, you should't have to touch the layout, even for
adding styles.

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

To start, you'll want to open `./package.json`. Notice we have the following packages:
- [reapp-routes](https://github.com/reapp/reapp-routes) (Routes generator)
- [reapp-ui](https://github.com/reapp/reapp-ui) (UI Kit)
- [reapp](https://github.com/reapp/reapp-ui) (CLI)
- [reapp-platform](https://github.com/reapp/reapp-platform) (Base utils)
- [reapp-component](https://github.com/reapp/reapp-component) (DI and Factories)

You also have an entry point defined as `app/app.js`. This starts your app.
The most important part here is the routing. Lets start there.

#### [reapp-routes](https://github.com/reapp/reapp-routes) (Routes generator)

reapp-routes is a DRY nested route-to-directory mapping system. As long as
your routes map to your component file structure, you can save lots of time
and enforce consistency in your app, a win-win.

Notice how the import looks for `reapp-routes/react-router`.
The first import in app.js is your router. We love react-router, so we included
a reapp-routes generator for that by default, but you could write your own.

You'll notice that the pre-defined routes all perfectly map to the structure of
`./app/components`. To see more about how this works, check out reapp-routes.

This is the reapp-routes syntax. The key to note here is the `require` that
is passed to the routes function at the top level, which is how it dynamically
requires your components based on the route tree.

#### [reapp-ui](https://github.com/reapp/reapp-ui) (UI Kit)

The next theme we require is the `./app/theme.js` file. reapp-ui has it's own
documentation, but themes are the core of reapp-ui. They have three things they
need: constants, styles, and animations. You can just use the included iOS theme,
but we've included the `./app/theme` folder as an example of how you can easily
customize themes.

#### Other packages

- [reapp](https://github.com/reapp/reapp-ui) (CLI)
- [reapp-platform](https://github.com/reapp/reapp-platform) (Base utils)
- [reapp-component](https://github.com/reapp/reapp-component) (DI and Factories)

### Why

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

### Roadmap

Our initial goals are simple: focus on completeness, consistency, and performance.
Also, a theme for Android.

Down the road we'd like to achieve the following:

- **Isomorphic** - Render first on server, pass data over
to client to continue from there (easily achievable).
- **Responsive** - Support for tablet style interfaces
and JS-powered responsive styling.
- **Physics** - A spring based physics library
into the animation library with an easy syntax.
- **Interaction** - A simple, declarative interaction
library that can be composed well with reapp

### Development Environment

Sublime users, some helpful plugins for you to install:

- [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter3)
- [JSXHint](https://github.com/STRML/JSXHint/) has [Babel](https://babeljs.io/) support
- [babel-sublime](https://github.com/babel/babel-sublime)
