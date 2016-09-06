define([
  '$',
  '_',
  'backbone',
  'text!tag/templates/listTag.html',
  'text!tag/templates/tag.html',
  'bootstrap'
], function ($, _, Backbone, templateListTag, templateTag) {
  var tagView = Backbone.View.extend({
    className: 'tags',
    events: {
      'click #addTag': 'addTag'
    },
    initialize: function () {
      this.render();
      this.listenTo(this.collection, 'reset', this.tag);
      this.libTags();
    },
    render: function () {
      var listTagTemplate = _.template(templateListTag);
      this.$el.html(listTagTemplate);
      $('.tags').html(this.$el);
    },
    tag: function (collcetion) {
      var tags = collcetion.toJSON();
      var tagTemplate = _.template(templateTag);
      $('.tagList').empty();
      _.each(tags, function (item) {
        $('.tagList').append(tagTemplate(item));
      });
    },
    addTag: function (e) {
      e.preventDefault();
      var data = {};
      if ($('.nameTag').val()) {
        $('#modal-2').modal('hide');
        data.id = 'tag' + parseInt(Math.random().toString().slice(2))
        data.tag = $('.nameTag').val().trim().replace(/\</g, "&lt;");
        this.collection.create({
          'id': data.id,
          'tag': data.tag
        });
        $('.nameTag').val('');
        this.collection.fetch({
          reset: true
        });
      } else {
        $('.nameTag').focus();
      }
    },
    libTags: function () {
      if (this.collection.length < 3) {
        this.collection.create({
          'id': 'tag1',
          'tag': "Важно"
        });
        this.collection.create({
          'id': 'tag2',
          'tag': "Очень важно"
        });
        this.collection.fetch({
          reset: true
        });
      }
    }
  });
  return tagView;
});