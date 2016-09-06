define([
  '$',
  '_',
  'backbone',
  'home/js/homeView',
  'note/js/noteCollection',
  'note/js/noteView',
  'note/js/noteModel',
  'categories/js/categoriesCollection',
  'categories/js/categoriesView',
  'categories/js/categoriesModel',
  'tag/js/tagCollection',
  'tag/js/tagView'
], function ($, _, Backbone, homeView, noteCollection, noteView, noteModel, categoriesCollection, categoriesView, categoriesModel, tagCollection, tagView) {
  var collectionNote = new noteCollection();
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'note/:id': 'note'
    },
    home: function () {
      var collectionCategories = new categoriesCollection();
      var collectionTag = new tagCollection();
      var viewHome = new homeView({
        fetched: this.fetched,
        collection: collectionNote,
        collectionCategories: collectionCategories,
        collectionTag: collectionTag
      });
      this.reset(viewHome);
      if (!this.fetched) {
        this.fetched = false;
        collectionNote.fetch({
          reset: true
        });
      } else {
        this.fetched = true;
      }

      var modelCategories = new categoriesModel();
      var viewCategories = new categoriesView({
        collection: collectionCategories,
        model: modelCategories
      });

      var viewTag = new tagView({
        collection: collectionTag
      });

      collectionTag.fetch();
      collectionCategories.fetch();
    },
    note: function (noteId) {
      this.fetched = true;
      var collectionTag = new tagCollection();
      var collectionCategories = new categoriesCollection();

      var viewNote = new noteView({
        noteId: noteId,
        collection: collectionNote,
        collectionCategories: collectionCategories,
        collectionTag: collectionTag
      });

      var viewTag = new tagView({
        collection: collectionTag
      });
      collectionTag.fetch({
        reset: true
      });

      var viewCategories = new categoriesView({
        collection: collectionCategories
      });
      collectionCategories.fetch();
    },
    reset: function (view) {
      if (this.currentView) {
        this.currentView.remove();
      }
      this.currentView = view;
    }
  });
  return Router;
});