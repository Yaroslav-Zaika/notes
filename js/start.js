var modulesPath = '../node_modules/';
requirejs.config({
  paths: {
    // Libs

    '$': modulesPath + 'jquery/dist/jquery.min',
    '_': modulesPath + 'underscore/underscore-min',
    'backbone': modulesPath + 'backbone/backbone-min',
    'text': modulesPath + 'requirejs-text/text',
    'bootstrap': modulesPath + 'bootstrap/dist/js/bootstrap',
    'backboneLocalstorage': modulesPath + 'backbone.localstorage/backbone.localStorage'

  },
  shim: {
    '_': {
      exports: '_'
    },
    '$': {
      exports: '$'
    },
    'backbone': {
      deps: [
        '_',
        '$'
       ],
      exports: 'Backbone'
    },
    'bootstrap': {
      deps: ['$']
    },
    backboneLocalstorage: {
      deps: ['backbone'],
      exports: 'Store'
    }
  }
});

requirejs(['app']);
