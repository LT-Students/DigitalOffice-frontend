module.exports = function (handlebars) {
  handlebars.registerHelper('toLower', function (string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  });
};
