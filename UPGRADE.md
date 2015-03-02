**If you haven't customized your app much, it may be easier to just create a new reapp
folder and copy in your changes**



### 0.7

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