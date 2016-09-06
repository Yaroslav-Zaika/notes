define([
  '$',
  '_',
  'backbone',
  'backboneLocalstorage',
  'tag/js/tagModel'
], function ($, _, Backbone, Store, tagModel) {
  var tagCollection = Backbone.Collection.extend({
    model: tagModel,
    localStorage: new Backbone.LocalStorage("tags")
  });
  return tagCollection;
});