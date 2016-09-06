define([
  '$',
  '_',
  'backbone',
  'widgets/js/toggle',
  'widgets/js/arrayPush',
  'text!note/templates/note.html',
  'text!note/templates/updateNote.html',
  'text!command/templates/tagNote.html',
  'text!command/templates/categoryNote.html',
  'text!command/templates/inputCheckboxTag.html',
  'text!command/templates/inputCheckboxCategory.html',
  'text!command/templates/errorCategoryList.html',
  'text!command/templates/patentCheckboxCategoty.html'
], function ($, _, Backbone, toggleWidget, arrayPushWidget, templateNote, templateUpdateNote, templateTagNote, templateCategoryNote, templateInputCheckboxTag, templateInputCheckboxCategory, templateErrorCategoryList, templatePatentCheckboxCategoty) {
  var noteView = Backbone.View.extend({
    className: 'note',
    events: {
      'click button#updateNote': 'updateNote',
      'click button#changesNote': 'changesNote',
      'click button#deleteNote': 'deleteNote',
      'click button#buttonColor': 'toggleWidget',
      'click button#buttonCategories': 'toggleWidget',
      'click button#buttonTag': 'toggleWidget'
    },
    initialize: function (options) {
      this.noteId = options.noteId;
      this.collectionCategories = options.collectionCategories;
      this.collectionTag = options.collectionTag;
      this.collection = options.collection;
      this.render();
      if (this.collection.length) {
        this.note();
      } else {
        this.collection.fetch();
        this.note();
      }
      this.listenTo(this.model, "change", this.note);
      this.listenTo(this.collectionCategories, 'reset', this.categories);
      this.listenTo(this.collectionTag, 'reset', this.tag);
    },
    render: function () {
      $('.notesContent').html(this.$el);
    },
    note: function (model) {
      var exist = true;
      if (model) {
        this.model = model;
      } else {
        this.model = this.collection.get(this.noteId);
        if (!this.model) {
          exist = false;
          Backbone.history.navigate('', {
            trigger: true
          });
        }
      }
      if (exist) {
        var note = this.model.toJSON();
        var noteTemplate = _.template(templateNote);
        this.$el.append(noteTemplate(note));
        var categoryNoteTemplate = _.template(templateCategoryNote);
        var tagNoteTemplate = _.template(templateTagNote);
        _.each(note.categoriesNote, function (item) {
          $('.categorieGroups').append(categoryNoteTemplate(item));
        });
        _.each(note.tagsNote, function (item) {
          $('.groupTags').append(tagNoteTemplate(item));
        });
        $('div#' + note.id).addClass(note.color);
      }
    },
    updateNote: function () {
      var value = this.collection.get(this.noteId).toJSON();
      var updateNoteTemplate = _.template(templateUpdateNote);
      this.$el.html(updateNoteTemplate(value));
    },
    toggleWidget: function (e) {
      var self = this
      toggleWidget(e, self);
    },
    categories: function () {
      this.categoriesFlag = true;
      $('.listCategories').empty();
      if (this.collectionCategories.length) {
        _.each(this.collectionCategories.toJSON(), function (item) {
          this.category(item);
        }, this);
      } else {
        $('.listCategories').append(templateErrorCategoryList);
      }
    },
    category: function (model) {
      var inputCheckboxCategoryTemplate = _.template(templateInputCheckboxCategory);
      var patentCheckboxCategoryTemplate = _.template(templatePatentCheckboxCategoty);
      var value = this.collection.get(this.noteId).toJSON();
      if (model.parent === 0) {
        $('.listCategories').append(inputCheckboxCategoryTemplate(model));
      } else if (model.parent) {
        var divParent = $('div#' + model.parent).length;
        if (!divParent) {
          $('div#' + model.parent).append(patentCheckboxCategoryTemplate(model));
        }
        $('div#' + model.parent).append(inputCheckboxCategoryTemplate(model));
      }
      _.each(value.categoriesNote, function (item) {
        $("input#" + item.id).prop("checked", true);
      });
    },
    tag: function () {
      if (this.collection.get(this.noteId)) {
        this.tagsFlag = true;
        var inputCheckboxTagTemplate = _.template(templateInputCheckboxTag);
        var responseTag = this.collectionTag.toJSON();
        var value = this.collection.get(this.noteId).toJSON();
        $('.listTag').empty();
        _.each(responseTag, function (item) {
          $('.listTag').append(inputCheckboxTagTemplate(item));
        });
        _.each(value.tagsNote, function (item) {
          $("input#" + item.id).prop("checked", true);
        });
      }
    },
    changesNote: function (e) {
      e.preventDefault();
      var data = {};
      var model = this.model.toJSON();
      data.id = model.id;
      data.titleNote = $('#titleNote').val().trim().replace(/\</g, "&lt;");
      data.textNote = $('#textNote').val().trim().replace(/\</g, "&lt;");
      if (this.categoriesFlag) {
        this.categoriesFlag = false;
        var category = $("input[name=categories]:checked");
        var categories = [];
        arrayPushWidget('category', category, categories);
        data.categoriesNote = categories;
      } else {
        data.categoriesNote = model.categoriesNote
      }
      if (this.tagsFlag) {
        this.tagsFlag = false;
        var tag = $("input[name=tag]:checked");
        var tags = [];
        arrayPushWidget('tag', tag, tags);
        data.tagsNote = tags;
      } else {
        data.tagsNote = model.tagsNote;
      }
      data.color = $('input[name=color]:checked', '#formUpdateNote').val() || model.color;
      data.changes = 'changes' + parseInt(Math.random().toString().slice(5));
      $('#formUpdateNote').remove();
      this.model.save(data);
    },
    deleteNote: function (e) {
      e.preventDefault();
      this.model.destroy();
      Backbone.history.navigate('', {
        trigger: true
      });
    }
  });
  return noteView;
});