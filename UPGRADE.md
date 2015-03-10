## 0.8

Reapp 0.8 doesn't require any change in your app structure. It does change how builds
work though. First, asset copying order is different.

Now, when you run `reapp build ios`:

```
./assets/shared/* => ./build/ios
./assets/ios/* => ./build/ios
./assets/ios/index.html => (Webpack inserts CSS/JS references) => ./build/ios/index.html
```

This lets you keep, for example, a cordova config.xml inside your `./assets/shared` and
have it copied to your build dir automatically.

The second change is where it build to. Before, no matter the platform `reapp build` or
`reapp build [platform]` all build to the same directory `./assets/public`. This was
poor design. Now, we build to the subdirectory of your app, so:

```
reapp build => ./build/web
reapp build ios => ./build/ios
```

This enables parallel builds! So if you want to build your ios and web apps at the same
time you can. We need to test it but the change in structure enables this, in practice.

## 0.7

#### In general, if you haven't customized your app much, it may be better to create a new reapp folder and copy in your changes

For CLI 0.7 we've added iOS builds and layouts. If you want to read on multiple builds,check out  [multiple build files](https://github.com/reapp/reapp#custom-builds).

#### new assets folder
Your assets folder structure has changed for the better. The new structure:

```
/assets
  /ios
  /web
  /shared
  ...
```

`reapp build` now can take a platform, like so: `reapp build [platform]`.

When your run `reapp build` it defaults the platform to `web`. Running a build will
copy your assets to `./build/public` in a specific order. By example:

`reapp build`
  - Copies index.html from assets/**web**
  - Copies assets/shared to build/public
  - Copies assets/**web** to build/public

`reapp build ios`
  - Copies index.html from assets/**ios**
  - Copies assets/shared to build/public
  - Copies assets/**ios** to build/public

**The only big change you need is to move your layout.html to assets/web/index.html. But we've
made some improvements to the layouts, so we recommend creating a new reapp project and
copying over the /assets folder.**