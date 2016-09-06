define([
  '$',
  '_'
], function ($, _) {
  var arrayPushWidget = function (name, arr1, arr2) {
    _.each(arr1, function (item) {
      if (name === 'category') {
        arr2.push({
          id: item.id,
          category: item.value.replace(/\</g, "&lt;")
        });
      } else if (name === 'tag') {
        arr2.push({
          id: item.id,
          tag: item.value.replace(/\</g, "&lt;")
        });
      }
    });
  }
  return arrayPushWidget;
});