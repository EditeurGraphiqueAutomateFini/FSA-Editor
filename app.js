/**
*   requiring stylesheets
*   those will be added as a tag in "head" by webpack
*/
// requiring main stylesheet
require("./styles.less");
// requiring sweetalert stylesheet
require("./res/css/sweetalert.css");

// requiring app
var app = require("./app/main.js");

// exporting app as a global function
module.exports = app;
