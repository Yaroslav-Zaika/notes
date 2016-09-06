define([
  '$',
  '_',
  'backbone',
  'backboneLocalstorage'
], function ($, _, Backbone, Store) {
  var categoriesModel = Backbone.Model.extend({
    defaults: {}
  });
  return categoriesModel;
});