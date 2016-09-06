define([
  '$',
  '_',
  'backbone',
  'backboneLocalstorage',
  'note/js/noteModel'
], function ($, _, Backbone, Store, noteModel) {
  var noteCollection = Backbone.Collection.extend({
    model: noteModel,
    localStorage: new Backbone.LocalStorage('notes')
  });
  return noteCollection;
});