define([
  '$',
  '_',
  'backbone',
  'backboneLocalstorage'
], function ($, _, Backbone, Store) {
  var noteModel = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage('notes')
  });
  return noteModel;
});