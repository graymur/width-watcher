##Width watcher

Small script that allows to create width breakpoints and add listeners to them.

```js
var watcher = WidthWatcher();
watcher.add(320, 480, [767, 768]);

var listener = function (mq) {
   console.log(mq.media);
};

watcher.addListener(listener);
watcher.removeListener(listener);
```

If you need to support IE9, you need to use matchMedia() polyfill.