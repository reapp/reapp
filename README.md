*reapp is just launching in alpha. These docs are far from complete and subject to change!*

### What is it?

Reapp isn't a framework, it's just a collection of packages that work
well together. On top of that, it's a CLI that does exactly three things:

- `reapp new`: Creates a new app for you
- `reapp run`: Runs a [reapp-structured](#structure) app
- `reapp build`: Builds a reapp-structured app into ./build

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
For now, it simple makes a bare clone of a repo we keep updated with the current best-practice.
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
  help [cmd]  display help for [cmd]

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

### Structure

You can see the exact app that's generated through the [reapp-starter repo](https://github.com/reapp/reapp-starter).
Only the `/app/app.js` entrypoint and `/assets` folder is "necessary".
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

### Packages

If you'd like to explore more deeply into how various pieces of reapp work together,
you'll want to check the documentation on the included modules.

Check out the [reapp project on Github](https://github.com/reapp) for more info. Here are some bigger packages,
in order:

- [reapp-ui](https://github.com/reapp/reapp-ui) (UI Kit)
- [reapp](https://github.com/reapp/reapp-ui) (CLI)
- [reapp-routes](https://github.com/reapp/reapp-routes) (Routes generator)
- [reapp-platform](https://github.com/reapp/reapp-platform) (Base utils)
- [reapp-component](https://github.com/reapp/reapp-component) (DI and Factories)

### Why

Reapp wasn't built purposefully to be a framework. Instead, it started
as a UI kit. From that kit, two apps were built. While this isn't a lot,
it was enough to see repitition between the two that could be extracted.

From those two apps, over a peried of months, we extracted a set of
packages, ensuring to keep each of them completely independent. It was
an experiment in seeing if a framework was necessary.

What we found was this: if you can subscribe so a certain file structure,
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

- SublimeLinter
- eshint
- JavaScript Next - ES6 Syntax