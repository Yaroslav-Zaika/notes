define([
  '$',
  '_',
  'backbone',
  'widgets/js/toggle',
  'widgets/js/arrayPush',
  'text!home/templates/listNotes.html',
  'text!home/templates/addNote.html',
  'text!command/templates/inputCheckboxCategory.html',
  'text!command/templates/inputCheckboxTag.html',
  'text!command/templates/categoryNote.html',
  'text!command/templates/tagNote.html',
  'text!command/templates/errorCategoryList.html',
  'text!command/templates/patentCheckboxCategoty.html'
], function ($, _, Backbone, toggleWidget, arrayPushWidget, templateListNotes, templateAddNote, templateInputCheckboxCategory, templateInputCheckboxTag, templateCategoryNote, templateTagNote, templateErrorCategoryList, templatePatentCheckboxCategoty) {
  var homeView = Backbone.View.extend({
    className: 'home',
    events: {
      'submit': 'addNote',
      'click button#buttonColor': 'toggleWidget',
      'click button#buttonCategories': 'toggleWidget',
      'click button#buttonTag': 'toggleWidget'
    },
    initialize: function (options) {
      this.collectionCategories = options.collectionCategories;
      this.collectionTag = options.collectionTag;
      this.render();
      if (options.fetched) {
        this.notes();
      } else {
        this.listenTo(this.collection, 'reset', this.notes);
      }
      this.listenTo(this.collection, 'add', this.note);
      this.listenTo(this.collectionCategories, 'reset', this.categories);
      this.listenTo(this.collectionTag, 'reset', this.tag);
    },
    render: function () {
      var addNoteTemplate = _.template(templateAddNote);
      this.$el.html(addNoteTemplate);
      $('.notesContent').html(this.$el);
    },
    note: function (model) {
      var note = model.toJSON();
      var listNotesTemplate = _.template(templateListNotes);
      $('.blockListNote').append(listNotesTemplate(note));
      var categoryNoteTemplate = _.template(templateCategoryNote);
      var tagNoteTemplate = _.template(templateTagNote);
      _.each(note.categoriesNote, function (item) {
        $('div#' + note.id).children('.categorieGroups').append(categoryNoteTemplate(item));
      });
      _.each(note.tagsNote, function (item) {
        $('div#' + note.id).children('.groupTags').append(tagNoteTemplate(item));
      });
      $('div#' + note.id).addClass(note.color);
    },
    notes: function () {
      this.collection.each(function (item) {
        this.note(item);
      }, this);
    },
    addNote: function (e) {
      e.preventDefault();
      $('.listGroup').children().hide();
      $('.list').show();
      var data = {};
      var titleNote =  $('#titleNote').val().replace(/\</g, "&lt;");
      var textNote = $('#textNote').val().replace(/\</g, "&lt;");
      var category = $("input[name=categories]:checked");
      var tag = $("input[name=tag]:checked");
      var categories = [];
      var tags = [];
      if (category.length) {
        arrayPushWidget('category', category, categories);
        data.categoriesNote = categories;
      } else {
        data.categoriesNote = categories;
      }
      if (tag.length) {
        arrayPushWidget('tag', tag, tags);
        data.tagsNote = tags;
      } else {
        data.tagsNote = tags;
      }
      data.color = $('input[name=color]:checked', '#formAddNote').val() || 'silver';
      data.titleNote = titleNote;
      data.textNote = textNote;
      this.collection.create({
        'id': 'note' + parseInt(Math.random().toString().slice(2)),
        'color': data.color,
        'categoriesNote': data.categoriesNote,
        'tagsNote': data.tagsNote,
        'titleNote': data.titleNote,
        'textNote': data.textNote
      });
      $('#formAddNote')[0].reset();
    },
    toggleWidget: function (e) {
      var self = this
      toggleWidget(e, self);
    },
    categories: function () {
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
      if (model.parent === 0) {
        $('.listCategories').append(inputCheckboxCategoryTemplate(model));
      } else if (model.parent) {
        var divParent = $('div#' + model.parent).length;
        if (!divParent) {
          $('div#' + model.parent).append(patentCheckboxCategoryTemplate(model));
        }
        $('div#' + model.parent).append(inputCheckboxCategoryTemplate(model));
      }
    },
    tag: function () {
      var inputCheckboxTagTemplate = _.template(templateInputCheckboxTag);
      $('.listTag').empty();
      _.each(this.collectionTag.toJSON(), function (item) {
        $('.listTag').append(inputCheckboxTagTemplate(item));
      });
    }
  });
  return homeView;
});