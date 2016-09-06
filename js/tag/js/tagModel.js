define([
  '$',
  '_',
  'backbone',
  'backboneLocalstorage'
], function ($, _, Backbone, Store) {
  var tagModel = Backbone.Model.extend({
    defaults: {}
  });
  return tagModel;
});