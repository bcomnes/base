---
---

requirejs.config({
  baseUrl: '{{ site.baseurl }}/public/js',
  paths: {
    prefixfree: '//cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min',
    leaflet: '//cdn.leafletjs.com/leaflet-0.7.3/leaflet',
    fragmention: '//cdn.rawgit.com/chapmanu/fragmentions/master/fragmention.min'
  },
  shim: {
    'prefixfree': {
      exports: 'prefree'
    },
    'leaflet': {
      exports: 'L'
    },
    'fragmention': {
      exports: 'frag'
    }
  }
});

define(['require', 'prefixfree','fragmention'], function(require, prefree) {

  function enhanceEach (selector, dependencies, callback) {
    var elements = all(selector);
      if (elements.length > 0) {
        require(dependencies, function () {
          var args = Array.prototype.slice.call(arguments);
          each(elements, function (element) {
            var innerArgs = args.slice();
            innerArgs.unshift(element);
            callback.apply(callback, innerArgs);
          });
        });
      }
    };

})
