/*
// require configuration
require.config({
    baseUrl: "app/src/",    // all scripts will be called from this path
    paths: {
        "data": "../../data" // except for local datas (for local testing)
        ,"test": "../test/"    // and tests
    }
});
// calling main function
require(
    [
        // libs first
        "http://code.jquery.com/jquery-2.1.4.min.js"
        ,"https://cdn.jsdelivr.net/lodash/3.10.1/lodash.js"
        ,"http://code.jquery.com/qunit/qunit-1.20.0.js"
        ,"http://d3js.org/d3.v3.min.js"
        ,"./res/js/sweetalert"
        // main
        ,"./app/main"
    ],function(jquery,_,qunit,swal,d3,fsa_editor){
        fsa_editor();
    }
);
*/

var app = require("./app/main.js");
app();
