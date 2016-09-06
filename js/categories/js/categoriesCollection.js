define([
  '$',
  '_',
  'backbone',
  'backboneLocalstorage',
  'categories/js/categoriesModel'
], function ($, _, Backbone, Store, categoriesModel) {
  var categoriesCollection = Backbone.Collection.extend({
    model: categoriesModel,
    localStorage: new Backbone.LocalStorage("categories")
  });
  return categoriesCollection;
});