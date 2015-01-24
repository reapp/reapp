*reapp is just launching in alpha. These docs are far from complete and subject to change!*

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

reapp new is actually a simple wrapper that clones a bare repository that we've set up
to use the various reapp pieces optimally. We are working on having a few different
setups, from simple to advanced, that you can choose from when generating your app.

### CLI

The CLI has two main functions that it helps you with. The first is creating new apps.
For now, it simple makes a bare clone of a repo we keep updated with the current best-practice.
The goal is eventually to have a variety of baseline repo's to choose from.

It also lets you run your app, using [reapp-server](https://github.com/reapp/reapp-server),
a simple express server that works well with the default app structure.

### App Structure

You can see the exact app that's generated through the [reapp-starter repo](https://github.com/reapp/reapp-starter).
It's very simple for now:

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

`./app/app.js` is your entry point. Everything in the app folder should be pretty
self-explanatory. `./assets` contains static assets, with a `layout.html` that is used
to serve your app within. In general, you should't have to touch the layout, even for
adding styles.

If you place a build.webpack.js or run.webpack.js in your config folder, the reapp CLI
will use these configs instead of the pre-made ones. To see more on the default configs,
check out the files in `./config` the [reapp-pack repo](https://github.com/reapp/reapp-pack).

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

### Platform


### Routes


### UI


### Development Environment

Sublime users, some helpful plugins for you to install:

- SublimeLinter
- eshint
- JavaScript Next - ES6 Syntax

#### MIT License
