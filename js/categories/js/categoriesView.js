define([
  '$',
  '_',
  'backbone',
  'text!categories/templates/categories.html',
  'text!categories/templates/dropDownList.html',
  'text!categories/templates/optionCategory.html',
  'text!categories/templates/ulParent.html',
  'text!categories/templates/liCategory.html',
  'bootstrap'
], function ($, _, Backbone, templateCategories, templateDropDownList, templateOptionCategory, templateUlParent, templateLiCategory) {
  var categoriesView = Backbone.View.extend({
    className: 'categories',
    events: {
      'click #addCategory': 'addCategory',
      'click #formCategory': 'formCategory'
    },
    initialize: function () {
      this.render();
      this.listenTo(this.collection, 'add', this.categories);
    },
    render: function () {
      var categoriesTemplate = _.template(templateCategories);
      this.$el.html(categoriesTemplate);
      $('.categories').html(this.$el);
    },
    categories: function (models) {
      var model = models.toJSON();
      var ul = _.template(templateUlParent);
      var li = _.template(templateLiCategory);
      if (model.parent === 0) {
        $('ul.ulGroupCategories').append(li(model));
      } else if (model.parent) {
        var ulParent = $('ul#' + model.parent).length;
        if (!ulParent) {
          $('li#' + model.parent).append(ul(model));
        }
        $('ul#' + model.parent).append(li(model));
      }
    },
    formCategory: function (e) {
      e.preventDefault();
      var dropDownListTemplate = _.template(templateDropDownList);
      $('.formCategory').html(dropDownListTemplate);
      var optionCategoryTemplate = _.template(templateOptionCategory);
      _.each(this.collection.toJSON(), function (item) {
        $('#selectCategory').append(optionCategoryTemplate(item));
      });
    },
    addCategory: function (e) {
      e.preventDefault();
      var data = {};
      if ($('.nameCategory').val()) {
        $('#modal-1').modal('hide');
        data.parent = $("#selectCategory option:selected").attr('id') || 0;
        data.category = $('.nameCategory').val().trim().replace(/\</g, "&lt;");
        this.collection.create({
          'id': 'cat' + parseInt(Math.random().toString().slice(2)),
          'parent': data.parent,
          'category': data.category
        });
        $('.nameCategory').val('');
        this.collection.fetch({ reset: true });
      } else {
        $('input.nameCategory ').focus();
      }
    }
  });
  return categoriesView;
});