define([
  '$'
], function ($) {
  var toggleWidget = function (e, self) {
    if (e.target.id === 'buttonColor') {
      if ($('.color').is(':visible')) {
        $('.color').hide();
		$('.clearfix').css('height', 0);
      } else {
		$('.clearfix').css('height', 'auto');
        $('.color').siblings('.none').hide();
        $('.color').show();
      }
    } else if (e.target.id === 'buttonCategories') {
      if ($('.listCategories').is(':visible')) {
        $('.listCategories').hide();
		$('.clearfix').css('height', 0);
      } else {
        if (!$('.listCategories').children().length) {
          self.categories('.listCategories');
        }
		$('.clearfix').css('height', 'auto');
        $('.listCategories').siblings('.none').hide();
        $('.listCategories').show();
      }
    } else if (e.target.id === 'buttonTag') {
      if ($('.listTag').is(':visible')) {
        $('.listTag').hide();
		$('.clearfix').css('height', 0);
      } else {
        if (!$('.listTag').children().length) {
          self.tag('.listTag');
        }
		$('.clearfix').css('height', 'auto');
        $('.listTag').siblings('.none').hide();
        $('.listTag').show();
      }
    }
  }
  return toggleWidget;
});